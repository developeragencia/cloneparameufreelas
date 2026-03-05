'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { ArrowLeft, Briefcase } from 'lucide-react'

export default function PublicarProjetoPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: '',
    category: '',
  })

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg border border-gray-200 p-8 text-center">
          <Briefcase className="w-12 h-12 mx-auto mb-4" style={{ color: '#00AEEF' }} />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Faça login para continuar</h2>
          <p className="text-sm text-gray-600 mb-6">Você precisa estar logado para publicar um projeto</p>
          <Link
            href="/login?callbackUrl=/publicar-projeto"
            className="inline-block px-6 py-3 text-sm font-semibold text-white rounded transition-colors"
            style={{ background: '#00AEEF' }}
          >
            Fazer Login
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Erro ao criar projeto')
      toast.success('Projeto publicado com sucesso!')
      router.push('/dashboard/cliente')
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium mb-6 hover:underline" style={{ color: '#00AEEF' }}>
          <ArrowLeft className="w-4 h-4" /> Voltar para home
        </Link>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">Publicar Novo Projeto</h1>
        <p className="text-gray-600 mb-8">Descreva seu projeto e receba propostas de freelancers qualificados</p>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Título do Projeto</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] text-sm"
              placeholder="Ex: Desenvolvimento de site institucional"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Descrição Detalhada</label>
            <textarea
              required
              rows={6}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] text-sm resize-none"
              placeholder="Descreva o que você precisa, requisitos técnicos, objetivos..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Orçamento (R$)</label>
              <input
                type="number"
                required
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] text-sm"
                placeholder="5000"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Prazo de Entrega</label>
              <input
                type="date"
                required
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Categoria</label>
            <select
              required
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] text-sm"
            >
              <option value="">Selecione uma categoria</option>
              <option value="design">Design & Arte</option>
              <option value="desenvolvimento-web">Desenvolvimento Web</option>
              <option value="marketing">Marketing Digital</option>
              <option value="redacao">Redação & Tradução</option>
              <option value="video">Vídeo & Animação</option>
              <option value="programacao">Programação</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-sm font-semibold text-white rounded transition-colors disabled:opacity-60"
            style={{ background: '#00AEEF' }}
          >
            {loading ? 'Publicando...' : 'Publicar Projeto'}
          </button>
        </form>
      </div>
    </div>
  )
}
