import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatCurrency, formatDate } from '@/lib/utils'
import { CreditCard, CheckCircle, Clock, XCircle } from 'lucide-react'

export default async function ClientPagamentosPage() {
  const session = await getServerSession(authOptions)
  const payments = await prisma.payment.findMany({
    where: { clientId: session!.user.id },
    include: {
      project: { select: { title: true, slug: true } },
      freelancer: { select: { name: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  const total = payments.reduce((sum, p) => sum + Number(p.amount), 0)
  const completed = payments.filter(p => p.status === 'RELEASED').reduce((sum, p) => sum + Number(p.amount), 0)
  const pending = payments.filter(p => p.status === 'PENDING' || p.status === 'HELD').reduce((sum, p) => sum + Number(p.amount), 0)

  const statusIcon = (s: string) => {
    if (s === 'RELEASED') return <CheckCircle className="w-4 h-4 text-green-500" />
    if (s === 'PENDING' || s === 'HELD') return <Clock className="w-4 h-4 text-yellow-500" />
    return <XCircle className="w-4 h-4 text-red-500" />
  }
  const statusLabel = (s: string) => {
    const map: Record<string, string> = { PENDING: 'Pendente', HELD: 'Em custódia', RELEASED: 'Liberado', REFUNDED: 'Reembolsado', DISPUTED: 'Em disputa' }
    return map[s] ?? s
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Pagamentos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Gasto', value: formatCurrency(total), color: 'text-gray-800' },
          { label: 'Pagamentos Concluídos', value: formatCurrency(completed), color: 'text-green-600' },
          { label: 'Em Custódia', value: formatCurrency(pending), color: 'text-yellow-600' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl shadow-sm p-5">
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="font-bold text-gray-800">Histórico de Pagamentos</h2>
        </div>
        {payments.length === 0 ? (
          <div className="p-12 text-center">
            <CreditCard className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">Nenhum pagamento realizado ainda</p>
          </div>
        ) : (
          <div className="divide-y">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  {statusIcon(payment.status)}
                  <div>
                    <p className="text-sm font-medium text-gray-800">{payment.project.title}</p>
                    <p className="text-xs text-gray-400">Para: {payment.freelancer.name} · {formatDate(payment.createdAt)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">{formatCurrency(Number(payment.amount))}</p>
                  <p className="text-xs text-gray-400">{statusLabel(payment.status)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
