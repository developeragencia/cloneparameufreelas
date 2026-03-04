import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const conversationWith = searchParams.get('with')

    if (conversationWith) {
      const messages = await prisma.message.findMany({
        where: {
          OR: [
            { senderId: session.user.id, receiverId: conversationWith },
            { senderId: conversationWith, receiverId: session.user.id },
          ],
        },
        include: { sender: { select: { id: true, name: true, image: true } } },
        orderBy: { createdAt: 'asc' },
      })
      await prisma.message.updateMany({
        where: { senderId: conversationWith, receiverId: session.user.id, isRead: false },
        data: { isRead: true },
      })
      return NextResponse.json(messages)
    }

    const conversations = await prisma.message.findMany({
      where: { OR: [{ senderId: session.user.id }, { receiverId: session.user.id }] },
      include: {
        sender: { select: { id: true, name: true, image: true } },
        receiver: { select: { id: true, name: true, image: true } },
      },
      orderBy: { createdAt: 'desc' },
      distinct: ['senderId', 'receiverId'],
    })

    return NextResponse.json(conversations)
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

    const message = await prisma.message.create({
      data: {
        senderId: session.user.id,
        receiverId,
        content: content.trim(),
        projectId: projectId || null,
      },
      include: { sender: { select: { id: true, name: true, image: true } } },
    })

    await prisma.notification.create({
      data: {
        userId: receiverId,
        type: 'NEW_MESSAGE',
        title: 'Nova mensagem',
        message: `Você recebeu uma mensagem de ${session.user.name}`,
        link: `/dashboard/mensagens?with=${session.user.id}`,
      },
    })

    return NextResponse.json(message, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
