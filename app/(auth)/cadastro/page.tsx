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
              <Link href="/login" className="text-[#00AEEF] font-semibold hover:underline">Fazer login</Link>
            </p>
          </div>

          {/* Tipo de conta */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setTipo('cliente')}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                tipo === 'cliente'
                  ? 'border-[#00AEEF] bg-blue-50 text-[#00AEEF]'
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
                  ? 'border-[#00AEEF] bg-blue-50 text-[#00AEEF]'
                  : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
              }`}
            >
              <Briefcase className="w-6 h-6" />
              <span className="font-semibold text-sm">Sou Freelancer</span>
              <span className="text-xs opacity-70">Quero trabalhar</span>
            </button>
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent bg-white"
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
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent bg-white"
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Estado</label>
                <select
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent bg-white"
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent pr-12 bg-white"
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent pr-12 bg-white"
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600">
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00AEEF] hover:bg-[#0099d4] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 text-sm mt-2"
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
            <Link href="/termos" className="text-[#00AEEF] hover:underline">Termos de Uso</Link>{' '}
            e{' '}
            <Link href="/privacidade" className="text-[#00AEEF] hover:underline">Política de Privacidade</Link>
          </p>
      </div>
    </div>
  )
}

export default function CadastroPage() {
  return <Suspense fallback={null}><CadastroPageInner /></Suspense>
}

