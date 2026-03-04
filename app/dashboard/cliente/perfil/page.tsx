'use client'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Save, User } from 'lucide-react'

const estados = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']

export default function ClientPerfilPage() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', bio: '', city: '', state: '', phone: '', companyName: '', website: '' })

  useEffect(() => {
    fetch('/api/users/profile').then(r => r.json()).then(data => {
      if (data) {
        setForm({
          name: data.name ?? '',
          bio: data.bio ?? '',
          city: data.city ?? '',
          state: data.state ?? '',
          phone: data.phone ?? '',
          companyName: data.clientProfile?.companyName ?? '',
          website: data.clientProfile?.website ?? '',
        })
      }
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/users/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          bio: form.bio,
          city: form.city,
          state: form.state,
          phone: form.phone,
          clientProfile: { companyName: form.companyName, website: form.website },
        }),
      })
      if (!res.ok) throw new Error()
      toast.success('Perfil atualizado com sucesso!')
    } catch {
      toast.error('Erro ao atualizar perfil')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Meu Perfil</h1>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-[#00aeef] flex items-center justify-center text-white text-2xl font-bold">
            {form.name.charAt(0).toUpperCase() || <User className="w-8 h-8" />}
          </div>
          <div>
            <h2 className="font-bold text-gray-800">{form.name || 'Seu Nome'}</h2>
            <p className="text-sm text-gray-500">Cliente</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
              <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="(11) 99999-9999" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa</label>
              <input value={form.companyName} onChange={e => setForm({...form, companyName: e.target.value})} placeholder="Sua empresa" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <input value={form.website} onChange={e => setForm({...form, website: e.target.value})} placeholder="https://..." className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
              <input value={form.city} onChange={e => setForm({...form, city: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select value={form.state} onChange={e => setForm({...form, state: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]">
                <option value="">Selecione</option>
                {estados.map(uf => <option key={uf} value={uf}>{uf}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sobre você / empresa</label>
            <textarea value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} rows={4} placeholder="Conte um pouco sobre você ou sua empresa..." className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef] resize-none" />
          </div>
          <div className="flex justify-end">
            <button type="submit" disabled={loading} className="flex items-center gap-2 bg-[#00aeef] hover:bg-[#0099d4] text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors disabled:opacity-50">
              <Save className="w-4 h-4" />
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
