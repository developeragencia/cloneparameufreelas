import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Search, Star, MapPin, Filter } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Encontrar Freelancers' }

interface PageProps {
  searchParams: { q?: string; categoria?: string; page?: string }
}

export default async function FreelancersPage({ searchParams }: PageProps) {
  const q = searchParams.q || ''
  const categoria = searchParams.categoria || ''
  const page = Number(searchParams.page) || 1
  const perPage = 12

  const categories = await prisma.category.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } })

  const where: any = {
    role: 'FREELANCER',
    isActive: true,
    ...(q && {
      OR: [
        { name: { contains: q } },
        { bio: { contains: q } },
        { freelancerProfile: { headline: { contains: q } } },
      ],
    }),
    ...(categoria && { freelancerProfile: { skills: { some: { skill: { category: { slug: categoria } } } } } }),
  }

  const [freelancers, total] = await Promise.all([
    prisma.user.findMany({
      where,
      include: { freelancerProfile: { include: { skills: { include: { skill: true }, take: 5 } } } },
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: { rating: 'desc' },
    }),
    prisma.user.count({ where }),
  ])

  const totalPages = Math.ceil(total / perPage)

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#1a1a2e] text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6 text-center">Encontrar Freelancers</h1>
          <form className="max-w-2xl mx-auto flex gap-2">
            <input
              name="q"
              defaultValue={q}
              placeholder="Buscar por habilidade, nome..."
              className="flex-1 px-4 py-3 text-gray-800 rounded-l-lg outline-none text-base"
            />
            <button type="submit" className="bg-[#00aeef] hover:bg-[#0099d4] px-6 py-3 rounded-r-lg text-white font-semibold flex items-center gap-2 transition-colors">
              <Search className="w-4 h-4" /> Buscar
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-5 sticky top-20">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Filter className="w-4 h-4" /> Filtros</h3>
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 text-sm">Categoria</h4>
                <div className="space-y-2">
                  <Link href="/freelancers" className={`block text-sm py-1 px-2 rounded hover:bg-gray-100 transition-colors ${!categoria ? 'text-[#00aeef] font-medium' : 'text-gray-600'}`}>
                    Todas as categorias
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/freelancers?categoria=${cat.slug}${q ? `&q=${q}` : ''}`}
                      className={`block text-sm py-1 px-2 rounded hover:bg-gray-100 transition-colors ${categoria === cat.slug ? 'text-[#00aeef] font-medium bg-blue-50' : 'text-gray-600'}`}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Freelancers Grid */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600 text-sm">
                <strong>{total}</strong> freelancers encontrados
                {q && <span> para <strong>"{q}"</strong></span>}
              </p>
            </div>

            {freelancers.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500 text-lg mb-2">Nenhum freelancer encontrado</p>
                <p className="text-gray-400 text-sm">Tente outros termos de busca</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {freelancers.map((freelancer) => (
                  <Link
                    key={freelancer.id}
                    href={`/freelancers/${freelancer.freelancerProfile?.slug || freelancer.id}`}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-5 block card-hover"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-14 h-14 rounded-full bg-[#00aeef] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                        {freelancer.image ? (
                          <img src={freelancer.image} alt={freelancer.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          freelancer.name.charAt(0).toUpperCase()
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-800 truncate">{freelancer.name}</h3>
                        <p className="text-sm text-gray-500 truncate">{freelancer.freelancerProfile?.headline || 'Freelancer'}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs font-medium text-gray-700">{freelancer.rating.toFixed(1)}</span>
                          <span className="text-xs text-gray-400">({freelancer.reviewCount})</span>
                        </div>
                      </div>
                    </div>

                    {freelancer.city && (
                      <p className="text-xs text-gray-400 flex items-center gap-1 mb-2">
                        <MapPin className="w-3 h-3" /> {freelancer.city}, {freelancer.state}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-1 mb-3">
                      {freelancer.freelancerProfile?.skills.slice(0, 3).map((fs) => (
                        <span key={fs.id} className="text-xs bg-blue-50 text-[#00aeef] px-2 py-0.5 rounded-full">
                          {fs.skill.name}
                        </span>
                      ))}
                    </div>

                    {freelancer.freelancerProfile?.hourlyRate && (
                      <p className="text-sm font-semibold text-gray-700">
                        R$ {Number(freelancer.freelancerProfile.hourlyRate).toFixed(0)}/h
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`/freelancers?page=${p}${q ? `&q=${q}` : ''}${categoria ? `&categoria=${categoria}` : ''}`}
                    className={`w-9 h-9 flex items-center justify-center rounded text-sm font-medium transition-colors ${p === page ? 'bg-[#00aeef] text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border'}`}
                  >
                    {p}
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
