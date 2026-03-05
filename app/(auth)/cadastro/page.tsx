'use client'
export const dynamic = 'force-dynamic'
import { Suspense } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { Eye, EyeOff, UserPlus, Mail, Building2, Briefcase } from 'lucide-react'
import Logo from '@/components/ui/Logo'

function CadastroPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultTipo = searchParams.get('tipo') || 'cliente'
  const [loading, setLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<string | null>(null)
  const [show, setShow] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [tipo, setTipo] = useState(defaultTipo)
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', city: '', state: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      toast.error('As senhas não coincidem')
      return
    }
    if (form.password.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, role: tipo === 'freelancer' ? 'FREELANCER' : 'CLIENT' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erro ao criar conta')
      toast.success('Conta criada com sucesso! Faça login para continuar.')
      router.push('/login')
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = async (provider: string) => {
    setSocialLoading(provider)
    await signIn(provider, { callbackUrl: '/dashboard' })
  }

  const estados = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-6">
            <Logo size="lg" variant="dark" />
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Criar conta grátis</h1>
            <p className="mt-1.5 text-gray-500 text-sm">
              Já tem conta?{' '}
              <Link href="/login" className="text-[#1A56DB] font-semibold hover:underline">Fazer login</Link>
            </p>
          </div>

          {/* Tipo de conta */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setTipo('cliente')}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                tipo === 'cliente'
                  ? 'border-[#1A56DB] bg-blue-50 text-[#1A56DB]'
                  : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
              }`}
            >
              <Building2 className="w-6 h-6" />
              <span className="font-semibold text-sm">Sou Empresa / Cliente</span>
              <span className="text-xs opacity-70">Quero contratar</span>
            </button>
            <button
              type="button"
              onClick={() => setTipo('freelancer')}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                tipo === 'freelancer'
                  ? 'border-[#1A56DB] bg-blue-50 text-[#1A56DB]'
                  : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
              }`}
            >
              <Briefcase className="w-6 h-6" />
              <span className="font-semibold text-sm">Sou Freelancer</span>
              <span className="text-xs opacity-70">Quero trabalhar</span>
            </button>
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <button
              onClick={() => handleSocialLogin('google')}
              disabled={!!socialLoading}
              className="flex items-center justify-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-lg transition-colors disabled:opacity-60 text-sm"
            >
              {socialLoading === 'google' ? (
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              Google
            </button>
            <button
              onClick={() => handleSocialLogin('github')}
              disabled={!!socialLoading}
              className="flex items-center justify-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-lg transition-colors disabled:opacity-60 text-sm"
            >
              {socialLoading === 'github' ? (
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              )}
              GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-50 px-4 text-sm text-gray-400">ou cadastre com email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                {tipo === 'freelancer' ? 'Nome completo' : 'Nome / Empresa'}
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={tipo === 'freelancer' ? 'Seu nome completo' : 'Nome da empresa ou seu nome'}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="seu@email.com"
                  required
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Cidade</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="Sua cidade"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Estado</label>
                <select
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent bg-white"
                >
                  <option value="">UF</option>
                  {estados.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Senha</label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Mínimo 6 caracteres"
                  required
                  minLength={6}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent pr-12 bg-white"
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600">
                  {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirmar Senha</label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  placeholder="Repita sua senha"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent pr-12 bg-white"
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600">
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1A56DB] hover:bg-[#1446BF] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 text-sm mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <UserPlus className="w-5 h-5" />
              )}
              {loading ? 'Criando conta...' : 'Criar minha conta grátis'}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-4">
            Ao criar uma conta, você concorda com nossos{' '}
            <Link href="/termos" className="text-[#1A56DB] hover:underline">Termos de Uso</Link>{' '}
            e{' '}
            <Link href="/privacidade" className="text-[#1A56DB] hover:underline">Política de Privacidade</Link>
          </p>
      </div>
    </div>
  )
}

export default function CadastroPage() {
  return <Suspense fallback={null}><CadastroPageInner /></Suspense>
}
