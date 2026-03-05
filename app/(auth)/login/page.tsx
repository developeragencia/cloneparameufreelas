'use client'
export const dynamic = 'force-dynamic'
import { Suspense } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import Logo from '@/components/ui/Logo'

function LoginPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard/cliente'
  const [loading, setLoading] = useState(false)
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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Logo size="xl" variant="dark" />
          <h2 className="mt-6 text-3xl font-bold text-gray-800">Entrar na sua conta</h2>
          <p className="mt-2 text-sm text-gray-600">
            Não tem conta?{' '}
            <Link href="/cadastro" className="text-[#00aeef] font-semibold hover:underline">Cadastre-se grátis</Link>
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="seu@email.com"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Senha</label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Sua senha"
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef] focus:border-transparent pr-10 transition-all"
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-right mt-2">
                <Link href="/esqueci-senha" className="text-xs text-[#00aeef] font-medium hover:underline">Esqueci minha senha</Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00aeef] hover:bg-[#0099d4] text-white font-bold py-3.5 rounded-md flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-md hover:shadow-lg"
            >
              <LogIn className="w-5 h-5" />
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Ao entrar, você concorda com nossos{' '}
              <Link href="/termos" className="text-[#00aeef] font-medium hover:underline">Termos de Uso</Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-4 text-sm text-gray-500">
          <strong>Demo:</strong> cliente@demo.com.br / Cliente@123
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return <Suspense fallback={null}><LoginPageInner /></Suspense>
}
