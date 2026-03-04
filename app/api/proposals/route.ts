import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const projectId = searchParams.get('projectId')

    const where: any = {}
    if (session.user.role === 'FREELANCER') {
      where.freelancerId = session.user.id
    } else if (session.user.role === 'CLIENT') {
      where.project = { clientId: session.user.id }
      if (projectId) where.projectId = projectId
    }

    const proposals = await prisma.proposal.findMany({
      where,
      include: {
        freelancer: { select: { id: true, name: true, image: true, rating: true, reviewCount: true } },
        project: { select: { id: true, title: true, slug: true, status: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(proposals)
  } catch (err) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'FREELANCER') {
      return NextResponse.json({ error: 'Apenas freelancers podem enviar propostas' }, { status: 401 })
    }

    const { projectId, coverLetter, budget, deliveryDays } = await req.json()

    if (!projectId || !coverLetter || !budget || !deliveryDays) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes' }, { status: 400 })
    }

    const project = await prisma.project.findUnique({ where: { id: projectId } })
    if (!project || project.status !== 'OPEN') {
      return NextResponse.json({ error: 'Projeto não encontrado ou não está aberto' }, { status: 404 })
    }

    const existing = await prisma.proposal.findFirst({
      where: { projectId, freelancerId: session.user.id },
    })
    if (existing) {
      return NextResponse.json({ error: 'Você já enviou uma proposta para este projeto' }, { status: 409 })
    }

    const proposal = await prisma.proposal.create({
      data: {
        projectId,
        freelancerId: session.user.id,
        coverLetter,
        budget: Number(budget),
        deliveryDays: Number(deliveryDays),
      },
    })

    await prisma.project.update({
      where: { id: projectId },
      data: { proposalCount: { increment: 1 } },
    })

    await prisma.notification.create({
      data: {
        userId: project.clientId,
        type: 'PROPOSAL_RECEIVED',
        title: 'Nova proposta recebida',
        message: `Você recebeu uma nova proposta para o projeto "${project.title}"`,
        data: JSON.stringify({ link: `/dashboard/cliente/projetos/${projectId}/propostas` }),
      },
    })

    return NextResponse.json(proposal, { status: 201 })
  } catch (err: any) {
    console.error('[POST /api/proposals]', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
