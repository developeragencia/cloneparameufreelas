import { prisma } from '@/lib/prisma'
import { formatCurrency, formatDate } from '@/lib/utils'

export default async function AdminPagamentosPage() {
  const payments = await prisma.payment.findMany({
    include: {
      project: { select: { title: true } },
      client: { select: { name: true } },
      freelancer: { select: { name: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  const total = payments.reduce((s, p) => s + Number(p.amount), 0)
  const fees = payments.reduce((s, p) => s + Number(p.platformFee), 0)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Pagamentos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-sm text-gray-500">Volume Total</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{formatCurrency(total)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-sm text-gray-500">Taxa da Plataforma</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{formatCurrency(fees)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-sm text-gray-500">Transações</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{payments.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="font-bold text-gray-800">Histórico de Pagamentos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="px-4 py-3 text-gray-500 font-medium">Projeto</th>
                <th className="px-4 py-3 text-gray-500 font-medium">Cliente</th>
                <th className="px-4 py-3 text-gray-500 font-medium">Freelancer</th>
                <th className="px-4 py-3 text-gray-500 font-medium">Valor</th>
                <th className="px-4 py-3 text-gray-500 font-medium">Taxa</th>
                <th className="px-4 py-3 text-gray-500 font-medium">Status</th>
                <th className="px-4 py-3 text-gray-500 font-medium">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800 max-w-xs truncate">{p.project.title}</td>
                  <td className="px-4 py-3 text-gray-600">{p.client.name}</td>
                  <td className="px-4 py-3 text-gray-600">{p.freelancer.name}</td>
                  <td className="px-4 py-3 font-semibold text-gray-800">{formatCurrency(Number(p.amount))}</td>
                  <td className="px-4 py-3 text-green-600">{formatCurrency(Number(p.platformFee))}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      p.status === 'RELEASED' ? 'bg-green-100 text-green-700' :
                      p.status === 'HELD' ? 'bg-yellow-100 text-yellow-700' :
                      p.status === 'PENDING' ? 'bg-gray-100 text-gray-600' : 'bg-red-100 text-red-700'
                    }`}>{p.status}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">{formatDate(p.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
