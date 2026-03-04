import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/utils'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = Number(searchParams.get('page')) || 1
    const perPage = Number(searchParams.get('perPage')) || 10
    const q = searchParams.get('q') || ''
    const categoria = searchParams.get('categoria') || ''
    const status = searchParams.get('status') || 'OPEN'

    const where: any = {
      status,
      ...(q && { OR: [{ title: { contains: q } }, { description: { contains: q } }] }),
      ...(categoria && { category: { slug: categoria } }),
    }

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        include: { client: { select: { name: true, image: true, rating: true } }, category: true, skills: { include: { skill: true } } },
        skip: (page - 1) * perPage,
        take: perPage,
        orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
      }),
      prisma.project.count({ where }),
    ])

    return NextResponse.json({ projects, total, pages: Math.ceil(total / perPage) })
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

    const body = await req.json()
    const { title, description, categoryId, budgetMin, budgetMax, deadline, skillIds, remote, location, isUrgent } = body

    if (!title || !description || !budgetMin) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes' }, { status: 400 })
    }

    const baseSlug = slugify(title)
    let slug = baseSlug
    let counter = 1
    while (await prisma.project.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter++}`
    }

    const project = await prisma.project.create({
      data: {
        clientId: session.user.id,
        title,
        slug,
        description,
        categoryId: categoryId || null,
        budgetMin: Number(budgetMin),
        budgetMax: Number(budgetMax || budgetMin),
        deadline: deadline ? new Date(deadline) : null,
        remote: remote ?? true,
        location: location || null,
        isUrgent: isUrgent ?? false,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        skills: skillIds?.length
          ? { create: skillIds.map((skillId: string) => ({ skillId })) }
          : undefined,
      },
      include: { category: true, skills: { include: { skill: true } } },
    })

    await prisma.clientProfile.updateMany({
      where: { userId: session.user.id },
      data: { projectsPosted: { increment: 1 } },
    })

    return NextResponse.json(project, { status: 201 })
  } catch (err: any) {
    console.error('[POST /api/projects]', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
