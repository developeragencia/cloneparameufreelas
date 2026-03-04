'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Send } from 'lucide-react'

export default function ProposalForm({ projectId, projectTitle }: { projectId: string; projectTitle: string }) {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ coverLetter: '', budget: '', deliveryDays: '' })

  if (!session) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-dashed border-gray-200 text-center">
        <h3 className="font-bold text-gray-800 mb-2">Interessado neste projeto?</h3>
        <p className="text-gray-500 text-sm mb-4">Faça login para enviar sua proposta</p>
        <button onClick={() => router.push(`/login?callbackUrl=/projetos/${projectId}`)} className="bg-[#00aeef] text-white px-6 py-2 rounded font-semibold hover:bg-[#0099d4] transition-colors">
          Fazer Login
        </button>
      </div>
    )
  }

  if (session.user.role === 'CLIENT') return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.coverLetter.trim() || !form.budget || !form.deliveryDays) {
      toast.error('Preencha todos os campos')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/proposals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, ...form, budget: Number(form.budget), deliveryDays: Number(form.deliveryDays) }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erro ao enviar proposta')
      toast.success('Proposta enviada com sucesso!')
      router.push('/dashboard/freelancer/propostas')
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="font-bold text-gray-800 text-lg mb-4">Enviar Proposta</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valor proposto (R$)</label>
            <input
              type="number"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
              placeholder="Ex: 1500"
              min="1"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prazo (dias)</label>
            <input
              type="number"
              value={form.deliveryDays}
              onChange={(e) => setForm({ ...form, deliveryDays: e.target.value })}
              placeholder="Ex: 14"
              min="1"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Carta de apresentação</label>
          <textarea
            value={form.coverLetter}
            onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
            placeholder="Descreva sua experiência e por que você é o melhor candidato para este projeto..."
            rows={6}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef] resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-[#00aeef] hover:bg-[#0099d4] text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          {loading ? 'Enviando...' : 'Enviar Proposta'}
        </button>
      </form>
    </div>
  )
}
