import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Clock, Users, DollarSign } from 'lucide-react'
import { formatCurrency, formatRelativeTime } from '@/lib/utils'

export default async function ClientProjetosPage() {
  const session = await getServerSession(authOptions)
  const projects = await prisma.project.findMany({
    where: { clientId: session!.user.id },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Meus Projetos</h1>
        <Link href="/publicar-projeto" className="flex items-center gap-2 bg-[#00aeef] hover:bg-[#0099d4] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
          <Plus className="w-4 h-4" /> Novo Projeto
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <DollarSign className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Nenhum projeto publicado</h3>
          <p className="text-gray-400 text-sm mb-6">Publique seu primeiro projeto e receba propostas de freelancers qualificados</p>
          <Link href="/publicar-projeto" className="inline-flex items-center gap-2 bg-[#00aeef] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0099d4] transition-colors">
            <Plus className="w-4 h-4" /> Publicar Projeto
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {project.category && <span className="text-xs bg-blue-50 text-[#00aeef] px-2 py-0.5 rounded-full">{project.category.name}</span>}
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      project.status === 'OPEN' ? 'bg-green-100 text-green-700' :
                      project.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' :
                      project.status === 'COMPLETED' ? 'bg-gray-100 text-gray-600' : 'bg-red-100 text-red-700'
                    }`}>
                      {project.status === 'OPEN' ? 'Aberto' : project.status === 'IN_PROGRESS' ? 'Em Progresso' : project.status === 'COMPLETED' ? 'Concluído' : project.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">{project.title}</h3>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{project.description.slice(0, 150)}...</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {formatRelativeTime(project.createdAt)}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {project.proposalCount} proposta{project.proposalCount !== 1 ? 's' : ''}</span>
                    <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> {formatCurrency(Number(project.budgetMin))}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <Link href={`/dashboard/cliente/projetos/${project.id}`} className="text-sm text-[#00aeef] hover:underline font-medium">Ver propostas</Link>
                  <Link href={`/projetos/${project.slug}`} className="text-sm text-gray-500 hover:underline">Ver página pública</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
