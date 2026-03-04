'use client'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Plus, Trash2, ExternalLink } from 'lucide-react'

interface PortfolioItem { id: string; title: string; description: string; imageUrl?: string; projectUrl?: string }

export default function FreelancerPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', imageUrl: '', projectUrl: '' })

  useEffect(() => {
    fetch('/api/users/profile').then(r => r.json()).then(data => {
      if (data?.freelancerProfile?.portfolio) {
        try { setItems(JSON.parse(data.freelancerProfile.portfolio)) } catch { setItems([]) }
      }
    })
  }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) return
    const newItem = { ...form, id: Date.now().toString() }
    const updated = [...items, newItem]
    setLoading(true)
    try {
      await fetch('/api/users/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ freelancerProfile: { portfolio: JSON.stringify(updated) } }),
      })
      setItems(updated)
      setForm({ title: '', description: '', imageUrl: '', projectUrl: '' })
      setShowForm(false)
      toast.success('Item adicionado ao portfólio!')
    } catch { toast.error('Erro ao salvar') } finally { setLoading(false) }
  }

  const handleDelete = async (id: string) => {
    const updated = items.filter(i => i.id !== id)
    setLoading(true)
    try {
      await fetch('/api/users/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ freelancerProfile: { portfolio: JSON.stringify(updated) } }),
      })
      setItems(updated)
      toast.success('Item removido')
    } catch { toast.error('Erro ao remover') } finally { setLoading(false) }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Portfólio</h1>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-[#00aeef] hover:bg-[#0099d4] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
          <Plus className="w-4 h-4" /> Adicionar Item
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-bold text-gray-800 mb-4">Novo Item do Portfólio</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título do Projeto *</label>
              <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} required className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]" placeholder="Nome do projeto" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef] resize-none" placeholder="Descreva o projeto..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
                <input value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link do Projeto</label>
                <input value={form.projectUrl} onChange={e => setForm({...form, projectUrl: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]" placeholder="https://..." />
              </div>
            </div>
            <div className="flex gap-2">
              <button type="submit" disabled={loading} className="bg-[#00aeef] hover:bg-[#0099d4] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50">Salvar</button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 rounded-lg text-sm font-semibold transition-colors">Cancelar</button>
            </div>
          </form>
        </div>
      )}

      {items.length === 0 && !showForm ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <p className="text-gray-400 text-sm mb-4">Nenhum item no portfólio. Adicione seus melhores projetos!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover" />
              ) : (
                <div className="w-full h-40 bg-gradient-to-br from-[#00aeef] to-[#0077a8] flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">{item.title.charAt(0)}</span>
                </div>
              )}
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                {item.description && <p className="text-sm text-gray-500 line-clamp-2 mb-3">{item.description}</p>}
                <div className="flex items-center justify-between">
                  {item.projectUrl ? (
                    <a href={item.projectUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#00aeef] text-sm hover:underline">
                      <ExternalLink className="w-3 h-3" /> Ver projeto
                    </a>
                  ) : <span />}
                  <button onClick={() => handleDelete(item.id)} disabled={loading} className="text-red-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
