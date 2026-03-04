'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Save } from 'lucide-react'

export default function AdminConfiguracoesPage() {
  const [form, setForm] = useState({
    platformFeePercent: '15',
    minBudget: '50',
    maxBudget: '500000',
    maintenanceMode: false,
    allowRegistrations: true,
  })
  const [loading, setLoading] = useState(false)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      toast.success('Configurações salvas!')
    } finally { setLoading(false) }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Configurações da Plataforma</h1>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <form onSubmit={handleSave} className="space-y-5">
          <h2 className="font-bold text-gray-800 border-b pb-3">Taxas e Limites</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Taxa da Plataforma (%)</label>
              <input type="number" value={form.platformFeePercent} onChange={e => setForm({...form, platformFeePercent: e.target.value})} min="0" max="50" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]" />
              <p className="text-xs text-gray-400 mt-1">Percentual cobrado sobre cada pagamento</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Orçamento Mínimo (R$)</label>
              <input type="number" value={form.minBudget} onChange={e => setForm({...form, minBudget: e.target.value})} min="0" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Orçamento Máximo (R$)</label>
              <input type="number" value={form.maxBudget} onChange={e => setForm({...form, maxBudget: e.target.value})} min="0" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]" />
            </div>
          </div>

          <h2 className="font-bold text-gray-800 border-b pb-3 pt-2">Controles do Sistema</h2>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.maintenanceMode} onChange={e => setForm({...form, maintenanceMode: e.target.checked})} className="w-4 h-4 accent-[#00aeef]" />
              <div>
                <span className="text-sm font-medium text-gray-800">Modo Manutenção</span>
                <p className="text-xs text-gray-400">Bloqueia o acesso ao site para usuários não-admin</p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.allowRegistrations} onChange={e => setForm({...form, allowRegistrations: e.target.checked})} className="w-4 h-4 accent-[#00aeef]" />
              <div>
                <span className="text-sm font-medium text-gray-800">Permitir Cadastros</span>
                <p className="text-xs text-gray-400">Habilita novos registros de usuários na plataforma</p>
              </div>
            </label>
          </div>

          <div className="flex justify-end pt-2">
            <button type="submit" disabled={loading} className="flex items-center gap-2 bg-[#00aeef] hover:bg-[#0099d4] text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors disabled:opacity-50">
              <Save className="w-4 h-4" />
              {loading ? 'Salvando...' : 'Salvar Configurações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
