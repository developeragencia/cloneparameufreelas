import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { FolderOpen, FileText, CreditCard, Plus, TrendingUp } from 'lucide-react'
import { formatCurrency, formatRelativeTime } from '@/lib/utils'

export default async function ClientDashboardPage() {
  const session = await getServerSession(authOptions)!

  const [projects, recentProposals, payments] = await Promise.all([
    prisma.project.findMany({
      where: { clientId: session!.user.id },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.proposal.findMany({
      where: { project: { clientId: session!.user.id } },
      include: { freelancer: { select: { name: true, image: true, rating: true } }, project: { select: { title: true, slug: true } } },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.payment.aggregate({
      where: { payerId: session!.user.id },
      _sum: { amount: true },
      _count: true,
    }),
  ])

  const openProjects = projects.filter((p) => p.status === 'OPEN').length
  const totalProposalsReceived = await prisma.proposal.count({ where: { project: { clientId: session!.user.id } } })

  const stats = [
    { label: 'Projetos Publicados', value: projects.length, icon: FolderOpen, color: 'bg-blue-50 text-blue-600', href: '/dashboard/cliente/projetos' },
    { label: 'Projetos Abertos', value: openProjects, icon: TrendingUp, color: 'bg-green-50 text-green-600', href: '/dashboard/cliente/projetos' },
    { label: 'Propostas Recebidas', value: totalProposalsReceived, icon: FileText, color: 'bg-purple-50 text-purple-600', href: '/dashboard/cliente/propostas' },
    { label: 'Total Gasto', value: formatCurrency(Number(payments._sum.amount ?? 0)), icon: CreditCard, color: 'bg-orange-50 text-orange-600', href: '/dashboard/cliente/pagamentos' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Olá, {session?.user.name?.split(' ')[0]}!</h1>
          <p className="text-gray-500 text-sm">Bem-vindo ao seu painel de cliente</p>
        </div>
        <Link href="/publicar-projeto" className="flex items-center gap-2 bg-[#00aeef] hover:bg-[#0099d4] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
          <Plus className="w-4 h-4" /> Publicar Projeto
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.label} href={stat.href} className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800">Seus Projetos</h2>
            <Link href="/dashboard/cliente/projetos" className="text-sm text-[#00aeef] hover:underline">Ver todos</Link>
          </div>
          {projects.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 text-sm mb-3">Você ainda não publicou projetos</p>
              <Link href="/publicar-projeto" className="text-sm text-[#00aeef] font-medium hover:underline">Publicar primeiro projeto</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="min-w-0">
                    <Link href={`/dashboard/cliente/projetos/${project.id}`} className="text-sm font-medium text-gray-800 hover:text-[#00aeef] truncate block">
                      {project.title}
                    </Link>
                    <p className="text-xs text-gray-400">{formatRelativeTime(project.createdAt)} · {project.proposalCount} proposta{project.proposalCount !== 1 ? 's' : ''}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ml-2 ${
                    project.status === 'OPEN' ? 'bg-green-100 text-green-700' :
                    project.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' :
                    project.status === 'COMPLETED' ? 'bg-gray-100 text-gray-600' : 'bg-red-100 text-red-700'
                  }`}>
                    {project.status === 'OPEN' ? 'Aberto' : project.status === 'IN_PROGRESS' ? 'Em Progresso' : project.status === 'COMPLETED' ? 'Concluído' : project.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Proposals */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800">Propostas Recentes</h2>
            <Link href="/dashboard/cliente/propostas" className="text-sm text-[#00aeef] hover:underline">Ver todas</Link>
          </div>
          {recentProposals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 text-sm">Nenhuma proposta recebida ainda</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentProposals.map((proposal) => (
                <div key={proposal.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-[#00aeef] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {proposal.freelancer.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{proposal.freelancer.name}</p>
                    <p className="text-xs text-gray-400 truncate">{proposal.project.title}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-gray-800">{formatCurrency(Number(proposal.budget))}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      proposal.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                      proposal.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {proposal.status === 'PENDING' ? 'Pendente' : proposal.status === 'ACCEPTED' ? 'Aceita' : 'Recusada'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
