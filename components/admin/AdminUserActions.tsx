'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function AdminUserActions({ userId, isActive, isVerified }: { userId: string; isActive: boolean; isVerified: boolean }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const update = async (data: object) => {
    setLoading(true)
    try {
      await fetch('/api/admin/users', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId, ...data }) })
      toast.success('Usuário atualizado')
      router.refresh()
    } catch { toast.error('Erro ao atualizar') } finally { setLoading(false) }
  }

  return (
    <div className="flex gap-1">
      <button onClick={() => update({ isActive: !isActive })} disabled={loading} className={`text-xs px-2 py-1 rounded font-medium transition-colors ${isActive ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}>
        {isActive ? 'Desativar' : 'Ativar'}
      </button>
      {!isVerified && (
        <button onClick={() => update({ isVerified: true })} disabled={loading} className="text-xs px-2 py-1 rounded font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
          Verificar
        </button>
      )}
    </div>
  )
}
