'use client'
export const dynamic = 'force-dynamic'
import { Suspense } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { Eye, EyeOff, LogIn, Mail } from 'lucide-react'
import Logo from '@/components/ui/Logo'

function LoginPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard/cliente'
  const [loading, setLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<string | null>(null)
  const [show, setShow] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false,
      })
      if (res?.error) {
        toast.error('Email ou senha inválidos')
      } else {
        toast.success('Login realizado com sucesso!')
        router.push(callbackUrl)
        router.refresh()
      }
    } catch {
      toast.error('Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = async (provider: string) => {
    setSocialLoading(provider)
    await signIn(provider, { callbackUrl })
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel - decorative */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 text-white relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #2d3e50 0%, #00aeef 100%)',
        }}
      >
        <div className="relative z-10">
          <Logo size="xl" variant="light" />
        </div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Encontre os melhores freelancers do Brasil
          </h2>
          <p className="text-blue-100 text-lg">
            Conectamos empresas e profissionais talentosos para projetos de sucesso.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { v: '136.912', l: 'Projetos' },
              { v: '3.4M+', l: 'Freelancers' },
              { v: 'R$26M+', l: 'Pagos' },
            ].map((s) => (
              <div key={s.l} className="bg-white bg-opacity-10 rounded-xl p-4 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold">{s.v}</div>
                <div className="text-sm text-blue-100">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full translate-x-20 translate-y-20" />
        <div className="absolute top-20 right-10 w-32 h-32 bg-white opacity-5 rounded-full" />
      </div>

      {/* Right panel - form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center py-12 px-6 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <Logo size="xl" variant="dark" />
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Bem-vindo de volta!</h1>
            <p className="mt-2 text-gray-500">
              Não tem conta?{' '}
              <Link href="/cadastro" className="text-[#00aeef] font-semibold hover:underline">
                Cadastre-se grátis
              </Link>
            </p>
          </div>

          {/* Social buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialLogin('google')}
              disabled={!!socialLoading}
              className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition-all hover:border-gray-300 hover:shadow-md disabled:opacity-60"
            >
              {socialLoading === 'google' ? (
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              Continuar com Google
            </button>
            <button
              onClick={() => handleSocialLogin('github')}
              disabled={!!socialLoading}
              className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition-all hover:border-gray-300 hover:shadow-md disabled:opacity-60"
            >
              {socialLoading === 'github' ? (
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              )}
              Continuar com GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-50 px-4 text-sm text-gray-400">ou entre com email</span>
            </div>
          </div>

          {/* Email form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="seu@email.com"
                  required
                  className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#00aeef] focus:border-transparent bg-white"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-gray-700">Senha</label>
                <Link href="/esqueci-senha" className="text-xs text-[#00aeef] font-medium hover:underline">
                  Esqueci minha senha
                </Link>
              </div>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Sua senha"
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#00aeef] focus:border-transparent pr-12 bg-white"
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600">
                  {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00aeef] hover:bg-[#0099d4] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-lg hover:shadow-xl text-base"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <LogIn className="w-5 h-5" />
              )}
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            Ao entrar, você concorda com nossos{' '}
            <Link href="/termos" className="text-[#00aeef] hover:underline">Termos de Uso</Link>
          </p>

          <p className="text-center mt-4 text-xs text-gray-400 bg-gray-100 rounded-lg py-2 px-4">
            <strong>Demo:</strong> cliente@demo.com.br / Cliente@123
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return <Suspense fallback={null}><LoginPageInner /></Suspense>
}
