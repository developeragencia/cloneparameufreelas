import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Users, FolderOpen, CreditCard, AlertTriangle, TrendingUp, UserCheck } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export default async function AdminDashboardPage() {
  const [
    totalUsers, totalFreelancers, totalClients,
    totalProjects, openProjects, completedProjects,
    totalPayments, pendingDisputes, recentUsers,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: 'FREELANCER' } }),
    prisma.user.count({ where: { role: 'CLIENT' } }),
    prisma.project.count(),
    prisma.project.count({ where: { status: 'OPEN' } }),
    prisma.project.count({ where: { status: 'COMPLETED' } }),
    prisma.payment.aggregate({ _sum: { amount: true } }),
    prisma.dispute.count({ where: { status: 'OPEN' } }),
    prisma.user.findMany({ orderBy: { createdAt: 'desc' }, take: 5, select: { id: true, name: true, email: true, role: true, createdAt: true } }),
  ])

  const stats = [
    { label: 'Total de Usuários', value: totalUsers, sub: `${totalFreelancers} freelancers · ${totalClients} clientes`, icon: Users, color: 'bg-blue-50 text-blue-600', href: '/admin/usuarios' },
    { label: 'Projetos', value: totalProjects, sub: `${openProjects} abertos · ${completedProjects} concluídos`, icon: FolderOpen, color: 'bg-green-50 text-green-600', href: '/admin/projetos' },
    { label: 'Receita Total', value: formatCurrency(Number(totalPayments._sum.amount ?? 0)), sub: 'em pagamentos processados', icon: CreditCard, color: 'bg-purple-50 text-purple-600', href: '/admin/pagamentos' },
    { label: 'Disputas Abertas', value: pendingDisputes, sub: 'aguardando resolução', icon: AlertTriangle, color: 'bg-red-50 text-red-600', href: '/admin/disputas' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Administrativo</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.label} href={stat.href} className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2.5 rounded-xl ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm font-medium text-gray-600 mt-0.5">{stat.label}</p>
              <p className="text-xs text-gray-400 mt-1">{stat.sub}</p>
            </Link>
          )
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-800">Usuários Recentes</h2>
          <Link href="/admin/usuarios" className="text-sm text-[#00aeef] hover:underline">Ver todos</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3 text-gray-500 font-medium">Nome</th>
                <th className="pb-3 text-gray-500 font-medium">Email</th>
                <th className="pb-3 text-gray-500 font-medium">Tipo</th>
                <th className="pb-3 text-gray-500 font-medium">Cadastro</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-3 font-medium text-gray-800">{user.name}</td>
                  <td className="py-3 text-gray-500">{user.email}</td>
                  <td className="py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      user.role === 'ADMIN' ? 'bg-red-100 text-red-700' :
                      user.role === 'CLIENT' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {user.role === 'ADMIN' ? 'Admin' : user.role === 'CLIENT' ? 'Cliente' : 'Freelancer'}
                    </span>
                  </td>
                  <td className="py-3 text-gray-400">{new Date(user.createdAt).toLocaleDateString('pt-BR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
