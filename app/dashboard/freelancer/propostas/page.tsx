import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatCurrency, formatRelativeTime } from '@/lib/utils'

export default async function FreelancerPropostasPage() {
  const session = await getServerSession(authOptions)
  const proposals = await prisma.proposal.findMany({
    where: { freelancerId: session!.user.id },
    include: { project: { include: { client: { select: { name: true } }, category: true } } },
    orderBy: { createdAt: 'desc' },
  })

  const tabs = [
    { label: 'Todas', filter: null, count: proposals.length },
    { label: 'Pendentes', filter: 'PENDING', count: proposals.filter(p => p.status === 'PENDING').length },
    { label: 'Aceitas', filter: 'ACCEPTED', count: proposals.filter(p => p.status === 'ACCEPTED').length },
    { label: 'Recusadas', filter: 'REJECTED', count: proposals.filter(p => p.status === 'REJECTED').length },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Minhas Propostas</h1>

      {proposals.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <p className="text-gray-400 text-sm mb-4">Você ainda não enviou propostas</p>
          <Link href="/projetos" className="inline-block bg-[#00aeef] text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#0099d4] transition-colors">
            Encontrar Projetos
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {proposals.map((proposal) => (
            <div key={proposal.id} className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {proposal.project.category && (
                      <span className="text-xs bg-blue-50 text-[#00aeef] px-2 py-0.5 rounded-full">{proposal.project.category.name}</span>
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      proposal.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                      proposal.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {proposal.status === 'PENDING' ? 'Pendente' : proposal.status === 'ACCEPTED' ? 'Aceita' : 'Recusada'}
                    </span>
                  </div>
                  <Link href={`/projetos/${proposal.project.slug}`} className="font-bold text-gray-800 hover:text-[#00aeef] transition-colors">
                    {proposal.project.title}
                  </Link>
                  <p className="text-xs text-gray-400 mt-1">
                    Cliente: {proposal.project.client.name} · Enviada {formatRelativeTime(proposal.createdAt)}
                  </p>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{proposal.coverLetter}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xl font-bold text-gray-800">{formatCurrency(Number(proposal.budget))}</p>
                  <p className="text-xs text-gray-400">{proposal.deliveryDays} dias</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
