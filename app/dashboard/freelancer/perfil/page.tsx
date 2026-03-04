'use client'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Save } from 'lucide-react'

const estados = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']

export default function FreelancerPerfilPage() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', bio: '', city: '', state: '', phone: '',
    headline: '', hourlyRate: '', experience: '', education: '',
  })

  useEffect(() => {
    fetch('/api/users/profile').then(r => r.json()).then(data => {
      if (data) {
        setForm({
          name: data.name ?? '',
          bio: data.bio ?? '',
          city: data.city ?? '',
          state: data.state ?? '',
          phone: data.phone ?? '',
          headline: data.freelancerProfile?.headline ?? '',
          hourlyRate: data.freelancerProfile?.hourlyRate?.toString() ?? '',
          experience: data.freelancerProfile?.experience ?? '',
          education: data.freelancerProfile?.education ?? '',
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
          name: form.name, bio: form.bio, city: form.city,
          state: form.state, phone: form.phone,
          freelancerProfile: {
            headline: form.headline,
            hourlyRate: form.hourlyRate ? Number(form.hourlyRate) : null,
            experience: form.experience,
            education: form.education,
          },
        }),
      })
      if (!res.ok) throw new Error()
      toast.success('Perfil atualizado com sucesso!')
    } catch { toast.error('Erro ao atualizar perfil') }
    finally { setLoading(false) }
  }

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Meu Perfil</h1>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
              <input value={form.name} onChange={e => set('name', e.target.value)} required className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
              <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="(11) 99999-9999" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título Profissional</label>
              <input value={form.headline} onChange={e => set('headline', e.target.value)} placeholder="Ex: Desenvolvedor Full Stack" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Valor por Hora (R$)</label>
              <input type="number" value={form.hourlyRate} onChange={e => set('hourlyRate', e.target.value)} placeholder="50" min="0" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
              <input value={form.city} onChange={e => set('city', e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select value={form.state} onChange={e => set('state', e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]">
                <option value="">Selecione</option>
                {estados.map(uf => <option key={uf} value={uf}>{uf}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sobre você</label>
            <textarea value={form.bio} onChange={e => set('bio', e.target.value)} rows={4} placeholder="Descreva suas habilidades, experiências e o que te diferencia..." className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef] resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experiência</label>
            <textarea value={form.experience} onChange={e => set('experience', e.target.value)} rows={3} placeholder="Descreva sua experiência profissional..." className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef] resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Formação Acadêmica</label>
            <textarea value={form.education} onChange={e => set('education', e.target.value)} rows={3} placeholder="Descreva sua formação..." className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef] resize-none" />
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
