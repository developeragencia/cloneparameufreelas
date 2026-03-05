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

  const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white'

  return (
    <div className="min-h-screen flex" style={{ background: '#F1F5F9' }}>
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[400px] xl:w-[440px] flex-col justify-between p-10 relative overflow-hidden flex-shrink-0"
        style={{ background: 'linear-gradient(160deg, #0D1117 0%, #1E1B4B 50%, #312E81 100%)' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute bottom-40 -left-20 w-64 h-64 rounded-full blur-3xl opacity-30" style={{ background: '#6366F1' }} />
        <div className="absolute top-20 right-0 w-40 h-40 rounded-full blur-3xl opacity-20" style={{ background: '#F97316' }} />

        <div className="relative z-10">
          <Logo size="xl" variant="light" />
        </div>
        <div className="relative z-10 space-y-5">
          <div>
            <h2 className="text-2xl font-extrabold text-white">Faça parte da maior plataforma de freelancers do Brasil</h2>
            <p className="text-gray-400 text-sm mt-2">Gratuito para sempre. Sem taxa de inscrição.</p>
          </div>
          {[
            { icon: '✅', text: 'Cadastro rápido e gratuito' },
            { icon: '🔒', text: 'Pagamento 100% seguro' },
            { icon: '⚡', text: 'Receba propostas em minutos' },
            { icon: '🏆', text: '+3.4M profissionais verificados' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3">
              <span className="text-base">{item.icon}</span>
              <span className="text-gray-300 text-sm">{item.text}</span>
            </div>
          ))}
        </div>
        <p className="relative z-10 text-gray-600 text-xs">© {new Date().getFullYear()} MeuFreelas</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-start justify-center p-6 sm:p-10 overflow-y-auto">
        <div className="w-full max-w-lg py-4">
          <div className="lg:hidden text-center mb-6">
            <Logo size="xl" variant="dark" />
          </div>

          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Criar conta grátis</h1>
            <p className="mt-1.5 text-gray-500 text-sm">
              Já tem conta?{' '}
              <Link href="/login" className="text-indigo-600 font-semibold hover:underline">Fazer login</Link>
            </p>
          </div>

          {/* Tipo de conta */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { id: 'cliente', icon: Building2, label: 'Sou Empresa', sub: 'Quero contratar' },
              { id: 'freelancer', icon: Briefcase, label: 'Sou Freelancer', sub: 'Quero trabalhar' },
            ].map(({ id, icon: Icon, label, sub }) => (
              <button key={id} type="button" onClick={() => setTipo(id)}
                className={`flex flex-col items-center gap-1.5 p-4 rounded-2xl border-2 transition-all ${
                  tipo === id
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-600 shadow-md'
                    : 'border-gray-200 bg-white text-gray-500 hover:border-indigo-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-bold text-sm">{label}</span>
                <span className="text-xs opacity-70">{sub}</span>
              </button>
            ))}
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[{ id: 'google', label: 'Google' }, { id: 'github', label: 'GitHub' }].map(({ id, label }) => (
              <button key={id} onClick={() => handleSocialLogin(id)} disabled={!!socialLoading}
                className="flex items-center justify-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2.5 rounded-xl transition-all hover:shadow-md disabled:opacity-60 text-sm">
                {socialLoading === id ? (
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                ) : id === 'google' ? (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                )}
                {label}
              </button>
            ))}
          </div>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
            <div className="relative flex justify-center"><span className="bg-[#F1F5F9] px-4 text-xs text-gray-400 font-medium">ou use seu email</span></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                {tipo === 'freelancer' ? 'Nome completo' : 'Nome / Empresa'}
              </label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={tipo === 'freelancer' ? 'Seu nome completo' : 'Nome da empresa'}
                required className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="seu@email.com" required className={`${inputCls} pl-10`} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Cidade</label>
                <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="Sua cidade" className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Estado</label>
                <select value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className={inputCls}>
                  <option value="">UF</option>
                  {estados.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Senha</label>
              <div className="relative">
                <input type={show ? 'text' : 'password'} value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Mínimo 6 caracteres" required minLength={6} className={`${inputCls} pr-10`} />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirmar Senha</label>
              <div className="relative">
                <input type={showConfirm ? 'text' : 'password'} value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  placeholder="Repita sua senha" required className={`${inputCls} pr-10`} />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 text-sm shadow-lg hover:-translate-y-0.5 mt-1"
              style={{ background: 'linear-gradient(135deg, #6366F1, #4F46E5)' }}
            >
              {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <UserPlus className="w-4 h-4" />}
              {loading ? 'Criando conta...' : 'Criar conta grátis'}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-4">
            Ao criar, você concorda com os{' '}
            <Link href="/termos" className="text-indigo-600 hover:underline">Termos</Link>{' '}e{' '}
            <Link href="/privacidade" className="text-indigo-600 hover:underline">Privacidade</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function CadastroPage() {
  return <Suspense fallback={null}><CadastroPageInner /></Suspense>
}
