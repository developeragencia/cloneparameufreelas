import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role, city, state } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Campos obrigatórios não preenchidos' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Este email já está cadastrado' }, { status: 409 })
    }

    const hashed = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: role === 'FREELANCER' ? 'FREELANCER' : 'CLIENT',
        city: city || null,
        state: state || null,
        ...(role === 'FREELANCER'
          ? { freelancerProfile: { create: {} } }
          : { clientProfile: { create: {} } }),
      },
    })

    return NextResponse.json({ success: true, userId: user.id }, { status: 201 })
  } catch (err: any) {
    console.error('[REGISTER]', err)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
