'use client'
export const dynamic = 'force-dynamic'
import { Suspense } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { Eye, EyeOff, UserPlus } from 'lucide-react'
import Logo from '@/components/ui/Logo'

function CadastroPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultTipo = searchParams.get('tipo') || 'cliente'
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
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

  const estados = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-lg w-full">
        <div className="text-center mb-10">
          <Logo size="xl" variant="dark" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Criar sua conta</h2>
          <p className="mt-3 text-sm text-gray-600">
            Já tem conta?{' '}
            <Link href="/login" className="text-[#00aeef] font-semibold hover:underline">Faça login</Link>
          </p>
        </div>

        {/* Tipo de conta */}
        <div className="flex bg-gray-200 rounded-lg p-1 mb-8 shadow-sm">
          <button
            type="button"
            onClick={() => setTipo('cliente')}
            className={`flex-1 py-3 rounded-md text-sm font-bold transition-all ${tipo === 'cliente' ? 'bg-white text-[#00aeef] shadow-md' : 'text-gray-600 hover:text-gray-800'}`}
          >
            Sou Empresa / Cliente
          </button>
          <button
            type="button"
            onClick={() => setTipo('freelancer')}
            className={`flex-1 py-3 rounded-md text-sm font-bold transition-all ${tipo === 'freelancer' ? 'bg-white text-[#00aeef] shadow-md' : 'text-gray-600 hover:text-gray-800'}`}
          >
            Sou Freelancer
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {tipo === 'freelancer' ? 'Nome completo' : 'Nome / Empresa'}
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={tipo === 'freelancer' ? 'Seu nome completo' : 'Seu nome ou empresa'}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#00aeef]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="seu@email.com"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#00aeef]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Cidade</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="Sua cidade"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#00aeef]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
                <select
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef] transition-all bg-white"
                >
                  <option value="">UF</option>
                  {estados.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Senha</label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Mínimo 6 caracteres"
                  required
                  minLength={6}
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef] pr-10 transition-all"
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Confirmar Senha</label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                placeholder="Repita sua senha"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#00aeef]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00aeef] hover:bg-[#0099d4] text-white font-bold py-4 rounded-md flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-md hover:shadow-lg text-base"
            >
              <UserPlus className="w-5 h-5" />
              {loading ? 'Criando conta...' : 'Criar minha conta'}
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-8">
            Ao criar uma conta, você concorda com nossos{' '}
            <Link href="/termos" className="text-[#00aeef] font-medium hover:underline">Termos de Uso</Link>{' '}
            e{' '}
            <Link href="/privacidade" className="text-[#00aeef] font-medium hover:underline">Política de Privacidade</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function CadastroPage() {
  return <Suspense fallback={null}><CadastroPageInner /></Suspense>
}
