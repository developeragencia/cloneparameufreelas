import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const { status, resolution } = await req.json()
  const dispute = await prisma.dispute.update({
    where: { id: params.id },
    data: {
      status,
      resolution,
      resolvedAt: status === 'RESOLVED_CLIENT' || status === 'RESOLVED_FREELANCER' || status === 'CLOSED' ? new Date() : undefined,
    },
  })
  return NextResponse.json(dispute)
}
