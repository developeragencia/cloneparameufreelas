import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatCurrency, formatDate } from '@/lib/utils'

interface Props { searchParams: { page?: string; q?: string; status?: string } }

export default async function AdminProjetosPage({ searchParams }: Props) {
  const page = Number(searchParams.page) || 1
  const perPage = 20
  const q = searchParams.q || ''
  const status = searchParams.status || ''

  const where: any = {
    ...(q && { title: { contains: q } }),
    ...(status && { status }),
  }

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      include: { client: { select: { name: true } }, category: true },
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.project.count({ where }),
  ])

  const pages = Math.ceil(total / perPage)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Projetos ({total})</h1>

      <div className="bg-white rounded-xl shadow-sm p-4 flex gap-3">
        <form className="flex gap-3 flex-1">
          <input name="q" defaultValue={q} placeholder="Buscar por título..." className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]" />
          <select name="status" defaultValue={status} className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]">
            <option value="">Todos</option>
            <option value="OPEN">Abertos</option>
            <option value="IN_PROGRESS">Em Progresso</option>
            <option value="COMPLETED">Concluídos</option>
            <option value="CANCELLED">Cancelados</option>
          </select>
          <button type="submit" className="bg-[#00aeef] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0099d4] transition-colors">Buscar</button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="px-4 py-3 text-gray-500 font-medium">Projeto</th>
                <th className="px-4 py-3 text-gray-500 font-medium">Cliente</th>
                <th className="px-4 py-3 text-gray-500 font-medium">Categoria</th>
                <th className="px-4 py-3 text-gray-500 font-medium">Orçamento</th>
                <th className="px-4 py-3 text-gray-500 font-medium">Status</th>
                <th className="px-4 py-3 text-gray-500 font-medium">Propostas</th>
                <th className="px-4 py-3 text-gray-500 font-medium">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link href={`/projetos/${project.slug}`} target="_blank" className="font-medium text-[#00aeef] hover:underline line-clamp-1">{project.title}</Link>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{project.client.name}</td>
                  <td className="px-4 py-3 text-gray-500">{project.category?.name ?? '-'}</td>
                  <td className="px-4 py-3 text-gray-600">{formatCurrency(Number(project.budgetMin))}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      project.status === 'OPEN' ? 'bg-green-100 text-green-700' :
                      project.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' :
                      project.status === 'COMPLETED' ? 'bg-gray-100 text-gray-600' : 'bg-red-100 text-red-700'
                    }`}>
                      {project.status === 'OPEN' ? 'Aberto' : project.status === 'IN_PROGRESS' ? 'Em Progresso' : project.status === 'COMPLETED' ? 'Concluído' : 'Cancelado'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{project.proposalCount}</td>
                  <td className="px-4 py-3 text-gray-400">{formatDate(project.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {pages > 1 && (
          <div className="px-4 py-3 border-t flex items-center justify-between">
            <p className="text-sm text-gray-500">Página {page} de {pages}</p>
            <div className="flex gap-2">
              {page > 1 && <a href={`?page=${page - 1}&q=${q}&status=${status}`} className="text-sm text-[#00aeef] hover:underline">Anterior</a>}
              {page < pages && <a href={`?page=${page + 1}&q=${q}&status=${status}`} className="text-sm text-[#00aeef] hover:underline">Próximo</a>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
