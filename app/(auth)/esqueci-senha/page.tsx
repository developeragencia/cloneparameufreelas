'use client'
import { useState } from 'react'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Logo size="xl" variant="dark" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Esqueci minha senha</h2>
          <p className="mt-3 text-sm text-gray-600">
            Lembrou a senha?{' '}
            <Link href="/login" className="text-[#00aeef] font-semibold hover:underline">Fazer login</Link>
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-10">
          {submitted ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Email enviado!</h3>
              <p className="text-gray-600 text-sm mb-6">
                Verifique sua caixa de entrada em <strong>{email}</strong> e siga as instruções para redefinir sua senha.
              </p>
              <Link href="/login" className="inline-block bg-[#00aeef] hover:bg-[#0099d4] text-white font-bold px-8 py-3 rounded-md transition-colors">
                Voltar ao login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <p className="text-sm text-gray-600">
                Digite seu email cadastrado e enviaremos um link para redefinir sua senha.
              </p>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#00aeef] focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#00aeef] hover:bg-[#0099d4] text-white font-bold py-4 rounded-md transition-all disabled:opacity-50 shadow-md hover:shadow-lg text-base"
              >
                {loading ? 'Enviando...' : 'Enviar link de recuperação'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
