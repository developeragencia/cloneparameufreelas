import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

    const { status } = await req.json()
    const proposal = await prisma.proposal.findUnique({
      where: { id: params.id },
      include: { project: true, freelancer: true },
    })

    if (!proposal) return NextResponse.json({ error: 'Proposta não encontrada' }, { status: 404 })

    if (session.user.role === 'CLIENT' && proposal.project.clientId !== session.user.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
    }

    const updated = await prisma.proposal.update({
      where: { id: params.id },
      data: { status },
    })

    if (status === 'ACCEPTED') {
      await prisma.project.update({
        where: { id: proposal.projectId },
        data: { status: 'IN_PROGRESS', selectedFreelancerId: proposal.freelancerId },
      })
      await prisma.notification.create({
        data: {
          userId: proposal.freelancerId,
          type: 'PROPOSAL_ACCEPTED',
          title: 'Proposta aceita!',
          message: `Sua proposta para "${proposal.project.title}" foi aceita!`,
          link: `/dashboard/freelancer/propostas`,
        },
      })
    } else if (status === 'REJECTED') {
      await prisma.notification.create({
        data: {
          userId: proposal.freelancerId,
          type: 'PROPOSAL_REJECTED',
          title: 'Proposta recusada',
          message: `Sua proposta para "${proposal.project.title}" foi recusada.`,
          link: `/projetos`,
        },
      })
    }

    return NextResponse.json(updated)
  } catch (err) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
