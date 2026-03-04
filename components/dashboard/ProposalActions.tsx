'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Check, X } from 'lucide-react'

export default function ProposalActions({ proposalId, freelancerName }: { proposalId: string; freelancerName: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const handleAction = async (status: 'ACCEPTED' | 'REJECTED') => {
    setLoading(status)
    try {
      const res = await fetch(`/api/proposals/${proposalId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error()
      toast.success(status === 'ACCEPTED' ? `Proposta de ${freelancerName} aceita!` : 'Proposta recusada')
      router.refresh()
    } catch {
      toast.error('Erro ao processar ação')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleAction('ACCEPTED')}
        disabled={loading !== null}
        className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
      >
        <Check className="w-3 h-3" />
        {loading === 'ACCEPTED' ? '...' : 'Aceitar'}
      </button>
      <button
        onClick={() => handleAction('REJECTED')}
        disabled={loading !== null}
        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
      >
        <X className="w-3 h-3" />
        {loading === 'REJECTED' ? '...' : 'Recusar'}
      </button>
    </div>
  )
}
