'use client'
import { useState } from 'react'

export default function ClienteConfiguracoesPage() {
  const [notifications, setNotifications] = useState({ email: true, sms: false, push: true })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Configurações</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Notificações</h2>
        <div className="space-y-4">
          {[
            { key: 'email', label: 'Notificações por Email', desc: 'Receba atualizações por email sobre seus projetos' },
            { key: 'sms', label: 'Notificações por SMS', desc: 'Receba alertas importantes por SMS' },
            { key: 'push', label: 'Notificações Push', desc: 'Notificações no navegador em tempo real' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between py-3 border-b last:border-0">
              <div>
                <p className="font-medium text-gray-700">{label}</p>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
              <button
                onClick={() => setNotifications((n) => ({ ...n, [key]: !n[key as keyof typeof n] }))}
                className={`w-12 h-6 rounded-full transition-colors ${notifications[key as keyof typeof notifications] ? 'bg-[#00aeef]' : 'bg-gray-300'}`}
              >
                <span className={`block w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${notifications[key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Segurança</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha atual</label>
            <input type="password" placeholder="••••••••" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nova senha</label>
            <input type="password" placeholder="••••••••" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar nova senha</label>
            <input type="password" placeholder="••••••••" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]" />
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="bg-[#00aeef] hover:bg-[#0099d4] text-white font-bold px-8 py-3 rounded-md transition-colors shadow"
      >
        {saved ? '✓ Salvo!' : 'Salvar configurações'}
      </button>
    </div>
  )
}
