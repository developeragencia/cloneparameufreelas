import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const [
      totalUsers,
      totalFreelancers,
      totalClients,
      totalProjects,
      openProjects,
      totalProposals,
      totalPayments,
      pendingDisputes,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: 'FREELANCER' } }),
      prisma.user.count({ where: { role: 'CLIENT' } }),
      prisma.project.count(),
      prisma.project.count({ where: { status: 'OPEN' } }),
      prisma.proposal.count(),
      prisma.payment.aggregate({ _sum: { amount: true } }),
      prisma.dispute.count({ where: { status: 'OPEN' } }),
    ])

    return NextResponse.json({
      totalUsers,
      totalFreelancers,
      totalClients,
      totalProjects,
      openProjects,
      totalProposals,
      totalRevenue: totalPayments._sum.amount ?? 0,
      pendingDisputes,
    })
  } catch (err) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
