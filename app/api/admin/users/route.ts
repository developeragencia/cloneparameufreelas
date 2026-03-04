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

    const { searchParams } = new URL(req.url)
    const page = Number(searchParams.get('page')) || 1
    const perPage = 20
    const q = searchParams.get('q') || ''
    const role = searchParams.get('role') || ''

    const where: any = {
      ...(q && { OR: [{ name: { contains: q } }, { email: { contains: q } }] }),
      ...(role && { role }),
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true, name: true, email: true, role: true,
          isActive: true, isVerified: true, rating: true,
          reviewCount: true, createdAt: true, city: true, state: true,
        },
        skip: (page - 1) * perPage,
        take: perPage,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ])

    return NextResponse.json({ users, total, pages: Math.ceil(total / perPage) })
  } catch (err) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { userId, isActive, isVerified, isFeatured } = await req.json()
    if (!userId) return NextResponse.json({ error: 'userId obrigatório' }, { status: 400 })

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        isActive: isActive !== undefined ? isActive : undefined,
        isVerified: isVerified !== undefined ? isVerified : undefined,
        isFeatured: isFeatured !== undefined ? isFeatured : undefined,
      },
    })

    return NextResponse.json(user)
  } catch (err) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
