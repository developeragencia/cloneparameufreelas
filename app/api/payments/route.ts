import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

    const where: any = {}
    if (session.user.role === 'CLIENT') where.payerId = session.user.id
    if (session.user.role === 'FREELANCER') where.project = { selectedFreelancerId: session.user.id }

    const payments = await prisma.payment.findMany({
      where,
      include: {
        project: { select: { id: true, title: true, slug: true, selectedFreelancerId: true } },
        payer: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(payments)
  } catch (err) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'CLIENT') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { projectId, amount, description } = await req.json()

    if (!projectId || !amount) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes' }, { status: 400 })
    }

    const platformFeePercent = Number(process.env.PLATFORM_FEE_PERCENT || 10)
    const platformFee = (Number(amount) * platformFeePercent) / 100
    const freelancerAmount = Number(amount) - platformFee

    const payment = await prisma.payment.create({
      data: {
        projectId,
        payerId: session.user.id,
        amount: Number(amount),
        platformFee,
        freelancerAmount,
        description: description || '',
        status: 'PENDING',
      },
    })

    const proj = await prisma.project.findUnique({ where: { id: projectId }, select: { selectedFreelancerId: true, title: true } })
    if (proj?.selectedFreelancerId) {
      await prisma.notification.create({
        data: {
          userId: proj.selectedFreelancerId,
          type: 'PAYMENT_RECEIVED',
          title: 'Pagamento iniciado',
          message: `Um pagamento de R$ ${Number(amount).toFixed(2)} foi iniciado pelo cliente.`,
          link: `/dashboard/freelancer/pagamentos`,
        },
      })
    }

    return NextResponse.json(payment, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
