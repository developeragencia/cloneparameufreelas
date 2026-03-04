'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

interface Category { id: string; name: string; icon?: string | null }

const skills = ['React','Next.js','Node.js','TypeScript','Python','PHP','WordPress','Laravel','Vue.js','Angular','Flutter','React Native','Java','C#','Ruby','PostgreSQL','MySQL','MongoDB','Docker','AWS','Figma','Adobe XD','Illustrator','Photoshop','Motion Design']

export default function PublicarProjetoPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [form, setForm] = useState({
    title: '', description: '', categoryId: '',
    budgetMin: '', budgetMax: '', deadline: '', budgetType: 'FIXED',
  })

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login?callbackUrl=/publicar-projeto')
    if (session?.user.role === 'FREELANCER') { toast.error('Apenas clientes podem publicar projetos'); router.push('/') }
    fetch('/api/categories').then(r => r.json()).then(setCategories).catch(() => {})
  }, [status, session, router])

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim() || !form.description.trim()) { toast.error('Título e descrição são obrigatórios'); return }
    if (form.description.trim().length < 100) { toast.error('A descrição deve ter ao menos 100 caracteres'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          budgetMin: Number(form.budgetMin),
          budgetMax: Number(form.budgetMax),
          skills: selectedSkills,
        }),
      })
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Erro') }
      const project = await res.json()
      toast.success('Projeto publicado com sucesso!')
      router.push(`/projetos/${project.slug}`)
    } catch (err: any) {
      toast.error(err.message || 'Erro ao publicar projeto')
    } finally { setLoading(false) }
  }

  if (status === 'loading') return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#00aeef]" /></div>

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-800">Publicar Projeto</h1>
          <p className="text-gray-500 mt-2">Descreva seu projeto com detalhes para atrair os melhores freelancers</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Básico */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h2 className="font-bold text-gray-800 text-lg">Informações Básicas</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título do Projeto *</label>
              <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} required maxLength={150} placeholder="Ex: Desenvolvimento de site institucional em React" className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]" />
              <p className="text-xs text-gray-400 mt-1">{form.title.length}/150 caracteres</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <select value={form.categoryId} onChange={e => setForm({...form, categoryId: e.target.value})} className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]">
                <option value="">Selecione uma categoria</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição detalhada * <span className="text-gray-400 font-normal">(mínimo 100 caracteres)</span></label>
              <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} required rows={8} placeholder="Descreva em detalhes o que você precisa: objetivos, funcionalidades, referências, requisitos técnicos, etc." className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef] resize-none" />
              <p className={`text-xs mt-1 ${form.description.length < 100 ? 'text-orange-400' : 'text-green-500'}`}>{form.description.length} caracteres {form.description.length < 100 ? `(faltam ${100 - form.description.length})` : '✓'}</p>
            </div>
          </div>

          {/* Orçamento */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h2 className="font-bold text-gray-800 text-lg">Orçamento e Prazo</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de orçamento</label>
              <div className="flex gap-3">
                {[{v:'FIXED',l:'Preço Fixo'},{v:'HOURLY',l:'Por Hora'}].map(opt => (
                  <button key={opt.v} type="button" onClick={() => setForm({...form, budgetType: opt.v})} className={`flex-1 py-2.5 rounded-lg border text-sm font-semibold transition-all ${form.budgetType === opt.v ? 'border-[#00aeef] bg-blue-50 text-[#00aeef]' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                    {opt.l}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valor mínimo (R$) *</label>
                <input type="number" value={form.budgetMin} onChange={e => setForm({...form, budgetMin: e.target.value})} required min="0" placeholder="500" className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valor máximo (R$)</label>
                <input type="number" value={form.budgetMax} onChange={e => setForm({...form, budgetMax: e.target.value})} min="0" placeholder="1500" className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prazo desejado</label>
              <input type="date" value={form.deadline} onChange={e => setForm({...form, deadline: e.target.value})} min={new Date().toISOString().split('T')[0]} className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]" />
            </div>
          </div>

          {/* Habilidades */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h2 className="font-bold text-gray-800 text-lg">Habilidades Necessárias</h2>
            <p className="text-sm text-gray-500">Selecione as tecnologias/habilidades que o freelancer deve ter</p>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <button key={skill} type="button" onClick={() => toggleSkill(skill)} className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${selectedSkills.includes(skill) ? 'bg-[#00aeef] text-white border-[#00aeef]' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-[#00aeef] hover:text-[#00aeef]'}`}>
                  {skill}
                </button>
              ))}
            </div>
            {selectedSkills.length > 0 && <p className="text-xs text-[#00aeef]">{selectedSkills.length} habilidade(s) selecionada(s)</p>}
          </div>

          <button type="submit" disabled={loading} className="w-full bg-[#00aeef] hover:bg-[#0099d4] text-white py-4 rounded-xl font-bold text-lg transition-colors disabled:opacity-50 shadow-lg shadow-blue-200">
            {loading ? 'Publicando...' : 'Publicar Projeto Grátis'}
          </button>
          <p className="text-center text-xs text-gray-400">Ao publicar, você concorda com os Termos de Uso e Política de Privacidade</p>
        </form>
      </div>
    </div>
  )
}
