import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { FileText, DollarSign, Star, Briefcase, TrendingUp } from 'lucide-react'
import { formatCurrency, formatRelativeTime } from '@/lib/utils'

export default async function FreelancerDashboardPage() {
  const session = await getServerSession(authOptions)!

  const [proposals, payments, profile] = await Promise.all([
    prisma.proposal.findMany({
      where: { freelancerId: session!.user.id },
      include: { project: { select: { title: true, slug: true, status: true, client: { select: { name: true } } } } },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.payment.aggregate({
      where: { status: 'RELEASED', project: { selectedFreelancerId: session!.user.id } },
      _sum: { freelancerAmount: true },
      _count: true,
    }),
    prisma.user.findUnique({
      where: { id: session!.user.id },
      select: { rating: true, reviewCount: true, freelancerProfile: true },
    }),
  ])

  const pendingProposals = await prisma.proposal.count({ where: { freelancerId: session!.user.id, status: 'PENDING' } })
  const acceptedProposals = await prisma.proposal.count({ where: { freelancerId: session!.user.id, status: 'ACCEPTED' } })
  const openProjects = await prisma.project.count({ where: { status: 'OPEN' } })

  const stats = [
    { label: 'Propostas Enviadas', value: proposals.length, icon: FileText, color: 'bg-blue-50 text-blue-600', href: '/dashboard/freelancer/propostas' },
    { label: 'Propostas Pendentes', value: pendingProposals, icon: TrendingUp, color: 'bg-yellow-50 text-yellow-600', href: '/dashboard/freelancer/propostas' },
    { label: 'Projetos Aceitos', value: acceptedProposals, icon: Briefcase, color: 'bg-green-50 text-green-600', href: '/dashboard/freelancer/propostas' },
    { label: 'Total Ganho', value: formatCurrency(Number(payments._sum.freelancerAmount ?? 0)), icon: DollarSign, color: 'bg-purple-50 text-purple-600', href: '/dashboard/freelancer/pagamentos' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Olá, {session?.user.name?.split(' ')[0]}!</h1>
          <p className="text-gray-500 text-sm">Bem-vindo ao seu painel de freelancer</p>
        </div>
        <Link href="/projetos" className="flex items-center gap-2 bg-[#00aeef] hover:bg-[#0099d4] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
          <Briefcase className="w-4 h-4" /> Encontrar Projetos
        </Link>
      </div>

      {/* Rating */}
      <div className="bg-gradient-to-r from-[#00aeef] to-[#0077a8] text-white rounded-xl p-5 flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">Sua avaliação na plataforma</p>
          <div className="flex items-center gap-2 mt-1">
            <Star className="w-6 h-6 fill-yellow-300 text-yellow-300" />
            <span className="text-3xl font-bold">{Number(profile?.rating ?? 0).toFixed(1)}</span>
            <span className="text-sm opacity-70">({profile?.reviewCount ?? 0} avaliações)</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm opacity-80">Projetos disponíveis</p>
          <p className="text-3xl font-bold">{openProjects}</p>
        </div>
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

      {/* Recent Proposals */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-800">Minhas Propostas Recentes</h2>
          <Link href="/dashboard/freelancer/propostas" className="text-sm text-[#00aeef] hover:underline">Ver todas</Link>
        </div>
        {proposals.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400 text-sm mb-3">Você ainda não enviou propostas</p>
            <Link href="/projetos" className="text-sm text-[#00aeef] font-medium hover:underline">Encontrar projetos para propor</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {proposals.map((proposal) => (
              <div key={proposal.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="min-w-0">
                  <Link href={`/projetos/${proposal.project.slug}`} className="text-sm font-medium text-gray-800 hover:text-[#00aeef] truncate block">
                    {proposal.project.title}
                  </Link>
                  <p className="text-xs text-gray-400">Cliente: {proposal.project.client.name} · {formatRelativeTime(proposal.createdAt)}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                  <span className="text-sm font-bold text-gray-800">{formatCurrency(Number(proposal.budget))}</span>
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
  )
}
