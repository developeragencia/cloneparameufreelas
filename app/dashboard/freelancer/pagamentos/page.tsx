import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatCurrency, formatDate } from '@/lib/utils'
import { CreditCard, CheckCircle, Clock } from 'lucide-react'

export default async function FreelancerPagamentosPage() {
  const session = await getServerSession(authOptions)
  const payments = await prisma.payment.findMany({
    where: { freelancerId: session!.user.id },
    include: {
      project: { select: { title: true } },
      client: { select: { name: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  const earned = payments.filter(p => p.status === 'RELEASED').reduce((s, p) => s + Number(p.freelancerAmount), 0)
  const pending = payments.filter(p => p.status === 'HELD').reduce((s, p) => s + Number(p.freelancerAmount), 0)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Pagamentos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-sm text-gray-500">Total Ganho</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{formatCurrency(earned)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-sm text-gray-500">Em Custódia</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">{formatCurrency(pending)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-sm text-gray-500">Pagamentos Recebidos</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{payments.filter(p => p.status === 'RELEASED').length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="font-bold text-gray-800">Histórico</h2>
        </div>
        {payments.length === 0 ? (
          <div className="p-12 text-center">
            <CreditCard className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">Nenhum pagamento recebido ainda</p>
          </div>
        ) : (
          <div className="divide-y">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  {payment.status === 'RELEASED' ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Clock className="w-4 h-4 text-yellow-500" />}
                  <div>
                    <p className="text-sm font-medium text-gray-800">{payment.project.title}</p>
                    <p className="text-xs text-gray-400">De: {payment.client.name} · {formatDate(payment.createdAt)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">{formatCurrency(Number(payment.freelancerAmount))}</p>
                  <p className="text-xs text-gray-400">{payment.status === 'RELEASED' ? 'Recebido' : 'Em custódia'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
