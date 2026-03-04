import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatCurrency, formatRelativeTime } from '@/lib/utils'
import { Star } from 'lucide-react'
import ProposalActions from '@/components/dashboard/ProposalActions'

export default async function ClientPropostasPage() {
  const session = await getServerSession(authOptions)
  const proposals = await prisma.proposal.findMany({
    where: { project: { clientId: session!.user.id } },
    include: {
      freelancer: { include: { freelancerProfile: true } },
      project: { select: { id: true, title: true, slug: true, status: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Propostas Recebidas</h1>

      {proposals.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <p className="text-gray-400 text-sm">Nenhuma proposta recebida ainda. Publique um projeto para começar.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {proposals.map((proposal) => (
            <div key={proposal.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-full bg-[#00aeef] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {proposal.freelancer.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-800">{proposal.freelancer.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        {proposal.freelancer.rating.toFixed(1)} ({proposal.freelancer.reviewCount})
                      </div>
                    </div>
                    {proposal.freelancer.freelancerProfile?.headline && (
                      <p className="text-sm text-gray-500 mb-2">{proposal.freelancer.freelancerProfile.headline}</p>
                    )}
                    <p className="text-xs text-gray-400 mb-3">
                      Para: <span className="font-medium text-gray-600">{proposal.project.title}</span> · {formatRelativeTime(proposal.createdAt)}
                    </p>
                    <p className="text-sm text-gray-700 line-clamp-3">{proposal.coverLetter}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3 flex-shrink-0">
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-800">{formatCurrency(Number(proposal.budget))}</p>
                    <p className="text-xs text-gray-400">{proposal.deliveryDays} dias</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    proposal.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                    proposal.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {proposal.status === 'PENDING' ? 'Pendente' : proposal.status === 'ACCEPTED' ? 'Aceita' : 'Recusada'}
                  </span>
                  {proposal.status === 'PENDING' && proposal.project.status === 'OPEN' && (
                    <ProposalActions proposalId={proposal.id} freelancerName={proposal.freelancer.name} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
