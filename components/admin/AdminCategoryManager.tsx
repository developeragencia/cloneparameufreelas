'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Plus, Trash2 } from 'lucide-react'

interface Category { id: string; name: string; slug: string; icon?: string | null; _count: { projects: number } }

export default function AdminCategoryManager({ initialCategories }: { initialCategories: Category[] }) {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', slug: '', icon: '', description: '' })
  const [loading, setLoading] = useState(false)

  const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      toast.success('Categoria criada!')
      setShowForm(false)
      setForm({ name: '', slug: '', icon: '', description: '' })
      router.refresh()
    } catch { toast.error('Erro ao criar categoria') } finally { setLoading(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza? Todos os projetos associados perderão a categoria.')) return
    setLoading(true)
    try {
      await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' })
      toast.success('Categoria removida')
      router.refresh()
    } catch { toast.error('Erro ao remover') } finally { setLoading(false) }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-[#00aeef] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0099d4] transition-colors">
          <Plus className="w-4 h-4" /> Nova Categoria
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-bold text-gray-800 mb-4">Nova Categoria</h2>
          <form onSubmit={handleAdd} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value, slug: slugify(e.target.value)})} required className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                <input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} required className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ícone (emoji)</label>
                <input value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} placeholder="💻" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <input value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]" />
            </div>
            <div className="flex gap-2">
              <button type="submit" disabled={loading} className="bg-[#00aeef] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#0099d4] transition-colors disabled:opacity-50">Salvar</button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">Cancelar</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="px-4 py-3 text-gray-500 font-medium">Ícone</th>
              <th className="px-4 py-3 text-gray-500 font-medium">Nome</th>
              <th className="px-4 py-3 text-gray-500 font-medium">Slug</th>
              <th className="px-4 py-3 text-gray-500 font-medium">Projetos</th>
              <th className="px-4 py-3 text-gray-500 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {initialCategories.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-xl">{cat.icon ?? '📁'}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{cat.name}</td>
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{cat.slug}</td>
                <td className="px-4 py-3 text-gray-600">{cat._count.projects}</td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(cat.id)} disabled={loading || cat._count.projects > 0} className="text-red-400 hover:text-red-600 transition-colors disabled:opacity-30">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
