'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function AdminDisputeActions({ disputeId }: { disputeId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const resolve = async (resolution: string) => {
    setLoading(true)
    try {
      const status =
        resolution === 'FAVOR_CLIENT' ? 'RESOLVED_CLIENT' : 'RESOLVED_FREELANCER'
      await fetch(`/api/admin/disputes/${disputeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, resolution }),
      })
      toast.success('Disputa resolvida')
      router.refresh()
    } catch { toast.error('Erro ao resolver disputa') } finally { setLoading(false) }
  }

  return (
    <div className="flex gap-1">
      <button onClick={() => resolve('FAVOR_CLIENT')} disabled={loading} className="text-xs px-2 py-1 rounded font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
        Favorável ao cliente
      </button>
      <button onClick={() => resolve('FAVOR_FREELANCER')} disabled={loading} className="text-xs px-2 py-1 rounded font-medium bg-green-100 text-green-700 hover:bg-green-200 transition-colors">
        Favorável ao freelancer
      </button>
    </div>
  )
}
