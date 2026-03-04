import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Search, Clock, DollarSign, MapPin, Filter } from 'lucide-react'
import { formatCurrency, formatRelativeTime, getStatusLabel, getStatusColor } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Encontrar Trabalho - Projetos' }

interface PageProps {
  searchParams: { q?: string; categoria?: string; page?: string }
}

export default async function ProjetosPage({ searchParams }: PageProps) {
  const q = searchParams.q || ''
  const categoria = searchParams.categoria || ''
  const page = Number(searchParams.page) || 1
  const perPage = 10

  const categories = await prisma.category.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } })

  const where: any = {
    status: 'OPEN',
    ...(q && { OR: [{ title: { contains: q } }, { description: { contains: q } }] }),
    ...(categoria && { category: { slug: categoria } }),
  }

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      include: { client: { select: { name: true, image: true, rating: true } }, category: true, skills: { include: { skill: true }, take: 5 } },
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
    }),
    prisma.project.count({ where }),
  ])

  const totalPages = Math.ceil(total / perPage)

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-[#1a1a2e] text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6 text-center">Encontrar Trabalho</h1>
          <form className="max-w-2xl mx-auto flex gap-2">
            <input
              name="q"
              defaultValue={q}
              placeholder="Buscar projetos por título ou descrição..."
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
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-5 sticky top-20">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Filter className="w-4 h-4" /> Filtros</h3>
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 text-sm">Categoria</h4>
                <div className="space-y-2">
                  <Link href="/projetos" className={`block text-sm py-1 px-2 rounded hover:bg-gray-100 ${!categoria ? 'text-[#00aeef] font-medium' : 'text-gray-600'}`}>
                    Todas
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/projetos?categoria=${cat.slug}${q ? `&q=${q}` : ''}`}
                      className={`block text-sm py-1 px-2 rounded hover:bg-gray-100 ${categoria === cat.slug ? 'text-[#00aeef] font-medium bg-blue-50' : 'text-gray-600'}`}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Projects List */}
          <main className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-gray-600 text-sm"><strong>{total}</strong> projetos disponíveis</p>
            </div>

            {projects.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500 text-lg mb-2">Nenhum projeto encontrado</p>
                <p className="text-gray-400 text-sm">Tente outros termos de busca</p>
              </div>
            ) : (
              projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projetos/${project.slug}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 block card-hover border border-transparent hover:border-[#00aeef]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {project.isFeatured && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-medium">Destaque</span>
                        )}
                        {project.isUrgent && (
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full font-medium">Urgente</span>
                        )}
                        {project.category && (
                          <span className="bg-blue-50 text-[#00aeef] text-xs px-2 py-0.5 rounded-full">{project.category.name}</span>
                        )}
                      </div>
                      <h3 className="font-bold text-gray-800 text-lg mb-2 hover:text-[#00aeef] transition-colors">{project.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">{project.description.slice(0, 200)}...</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.skills.map((ps) => (
                          <span key={ps.id} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{ps.skill.name}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {formatRelativeTime(project.createdAt)}</span>
                        <span>{project.proposalCount} proposta{project.proposalCount !== 1 ? 's' : ''}</span>
                        {project.remote && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Remoto</span>}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-1 text-green-600 font-bold text-lg">
                        <DollarSign className="w-4 h-4" />
                        <span>
                          {formatCurrency(Number(project.budgetMin))}
                          {Number(project.budgetMin) !== Number(project.budgetMax) && ` - ${formatCurrency(Number(project.budgetMax))}`}
                        </span>
                      </div>
                      <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {getStatusLabel(project.status)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`/projetos?page=${p}${q ? `&q=${q}` : ''}${categoria ? `&categoria=${categoria}` : ''}`}
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
