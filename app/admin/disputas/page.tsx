import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import AdminDisputeActions from '@/components/admin/AdminDisputeActions'

export default async function AdminDisputasPage() {
  const disputes = await prisma.dispute.findMany({
    include: {
      project: { select: { title: true, slug: true } },
      openedBy: { select: { name: true, role: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Disputas ({disputes.length})</h1>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="px-4 py-3 text-gray-500 font-medium">Projeto</th>
                <th className="px-4 py-3 text-gray-500 font-medium">Aberta por</th>
                <th className="px-4 py-3 text-gray-500 font-medium">Motivo</th>
                <th className="px-4 py-3 text-gray-500 font-medium">Status</th>
                <th className="px-4 py-3 text-gray-500 font-medium">Data</th>
                <th className="px-4 py-3 text-gray-500 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {disputes.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">Nenhuma disputa encontrada</td></tr>
              ) : disputes.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{d.project.title}</td>
                  <td className="px-4 py-3 text-gray-600">{d.openedBy.name}</td>
                  <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{d.reason}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        d.status === 'OPEN'
                          ? 'bg-yellow-100 text-yellow-700'
                          : d.status === 'UNDER_REVIEW'
                          ? 'bg-blue-100 text-blue-700'
                          : d.status === 'RESOLVED_CLIENT' || d.status === 'RESOLVED_FREELANCER'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {d.status === 'OPEN'
                        ? 'Aberta'
                        : d.status === 'UNDER_REVIEW'
                        ? 'Em análise'
                        : d.status === 'RESOLVED_CLIENT' || d.status === 'RESOLVED_FREELANCER'
                        ? 'Resolvida'
                        : 'Fechada'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">{formatDate(d.createdAt)}</td>
                  <td className="px-4 py-3">
                    {d.status === 'OPEN' && <AdminDisputeActions disputeId={d.id} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
