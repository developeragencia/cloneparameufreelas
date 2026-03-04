import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        freelancerProfile: { include: { skills: { include: { skill: true } }, portfolio: true } },
        clientProfile: true,
      },
    })

    return NextResponse.json(user)
  } catch (err) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

    const body = await req.json()
    const { name, bio, city, state, phone, image, freelancerProfile, clientProfile } = body

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: name || undefined,
        bio: bio !== undefined ? bio : undefined,
        city: city !== undefined ? city : undefined,
        state: state !== undefined ? state : undefined,
        phone: phone !== undefined ? phone : undefined,
        image: image !== undefined ? image : undefined,
      },
    })

    if (freelancerProfile && session.user.role === 'FREELANCER') {
      await prisma.freelancerProfile.updateMany({
        where: { userId: session.user.id },
        data: {
          headline: freelancerProfile.headline,
          hourlyRate: freelancerProfile.hourlyRate ? Number(freelancerProfile.hourlyRate) : undefined,
          availability: freelancerProfile.availability,
          portfolio: freelancerProfile.portfolio,
          experience: freelancerProfile.experience,
          education: freelancerProfile.education,
        },
      })
    }

    if (clientProfile && session.user.role === 'CLIENT') {
      await prisma.clientProfile.updateMany({
        where: { userId: session.user.id },
        data: {
          companyName: clientProfile.companyName,
          website: clientProfile.website,
          companySize: clientProfile.companySize,
        },
      })
    }

    return NextResponse.json({ success: true, user })
  } catch (err) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
