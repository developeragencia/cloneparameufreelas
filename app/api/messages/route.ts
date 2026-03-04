import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const withUser = searchParams.get('with')

    if (withUser) {
      const convo = await prisma.conversation.findFirst({
        where: {
          OR: [
            { clientId: session.user.id, freelancerId: withUser },
            { clientId: withUser, freelancerId: session.user.id },
          ],
        },
        orderBy: { lastMessageAt: 'desc' },
      })
      if (!convo) return NextResponse.json([])

      const messages = await prisma.message.findMany({
        where: { conversationId: convo.id },
        include: { sender: { select: { id: true, name: true, image: true} } },
        orderBy: { createdAt: 'asc' },
      })
      await prisma.message.updateMany({
        where: { conversationId: convo.id, senderId: withUser, isRead: false },
        data: { isRead: true },
      })
      return NextResponse.json(messages)
    }

    const convos = await prisma.conversation.findMany({
      where: { OR: [{ clientId: session.user.id }, { freelancerId: session.user.id }] },
      orderBy: { lastMessageAt: 'desc' },
    })

    const lastMessages = await Promise.all(
      convos.map(async (c) => {
        const last = await prisma.message.findFirst({
          where: { conversationId: c.id },
          include: { sender: { select: { id: true, name: true, image: true } } },
          orderBy: { createdAt: 'desc' },
        })
        if (!last) return null
        const sender = last.sender
        const receiverId = sender.id === c.clientId ? c.freelancerId : c.clientId
        const receiver =
          await prisma.user.findUnique({ where: { id: receiverId }, select: { id: true, name: true, image: true } })
        return {
          id: last.id,
          sender,
          receiver: receiver!,
          content: last.content,
          createdAt: last.createdAt as any,
          senderId: sender.id,
          receiverId: receiver?.id,
        }
      })
    )

    return NextResponse.json(lastMessages.filter(Boolean))
  } catch (err) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

    const { receiverId, content, projectId } = await req.json()
    if (!receiverId || !content?.trim()) {
      return NextResponse.json({ error: 'Destinatário e conteúdo são obrigatórios' }, { status: 400 })
    }

    let convo = await prisma.conversation.findFirst({
      where: {
        OR: [
          { clientId: session.user.id, freelancerId: receiverId, ...(projectId ? { projectId } : {}) },
          { clientId: receiverId, freelancerId: session.user.id, ...(projectId ? { projectId } : {}) },
        ],
      },
      orderBy: { lastMessageAt: 'desc' },
    })
    if (!convo) {
      if (!projectId) {
        return NextResponse.json({ error: 'projectId obrigatório para iniciar nova conversa' }, { status: 400 })
      }
      convo = await prisma.conversation.create({
        data: {
          projectId,
          clientId: session.user.role === 'CLIENT' ? session.user.id : receiverId,
          freelancerId: session.user.role === 'FREELANCER' ? session.user.id : receiverId,
        },
      })
    }

    const message = await prisma.message.create({
      data: {
        conversationId: convo.id,
        senderId: session.user.id,
        content: content.trim(),
      },
      include: { sender: { select: { id: true, name: true, image: true } } },
    })

    await prisma.conversation.update({ where: { id: convo.id }, data: { lastMessageAt: new Date() } })

    await prisma.notification.create({
      data: {
        userId: receiverId,
        type: 'NEW_MESSAGE',
        title: 'Nova mensagem',
        message: `Você recebeu uma mensagem de ${session.user.name}`,
        data: JSON.stringify({ link: `/dashboard/mensagens?with=${session.user.id}` }),
      },
    })

    return NextResponse.json(message, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
