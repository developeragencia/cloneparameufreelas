'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Search, ChevronDown, Menu, X, Bell, MessageSquare, User, LogOut, Settings, LayoutDashboard, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Logo from '@/components/ui/Logo'

export default function Header() {
  const { data: session } = useSession()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [searchDropdown, setSearchDropdown] = useState(false)
  const [searchType, setSearchType] = useState('Freelancers')
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const path = searchType === 'Projetos' ? '/projetos' : '/freelancers'
    if (searchQuery.trim()) router.push(`${path}?q=${encodeURIComponent(searchQuery)}`)
    else router.push(path)
  }

  const getDashboardPath = () => {
    if (!session) return '/login'
    if (session.user.role === 'ADMIN') return '/admin'
    if (session.user.role === 'FREELANCER') return '/dashboard/freelancer'
    return '/dashboard/cliente'
  }

  return (
    <header className="sticky top-0 z-50" style={{ background: 'linear-gradient(90deg, #0D1117 0%, #1E1B4B 100%)' }}>
      {/* Top accent line */}
      <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, #6366F1, #22D3EE, #F97316)' }} />

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo size="lg" variant="light" />
          </Link>

          {/* Search - desktop */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <form onSubmit={handleSearch} className="flex w-full rounded-xl overflow-hidden shadow-lg shadow-black/20">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSearchDropdown(!searchDropdown)}
                  className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 text-sm font-semibold h-full whitespace-nowrap transition-colors"
                >
                  {searchType} <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {searchDropdown && (
                  <div className="absolute top-full left-0 bg-white rounded-b-xl shadow-2xl border-0 z-50 min-w-[150px] overflow-hidden">
                    {['Freelancers', 'Projetos'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => { setSearchType(opt); setSearchDropdown(false) }}
                        className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Buscar ${searchType.toLowerCase()}...`}
                className="flex-1 px-4 py-2.5 text-gray-800 text-sm outline-none bg-white"
              />
              <button type="submit" className="bg-[#F97316] hover:bg-[#EA6C0A] px-5 py-2.5 transition-colors">
                <Search className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2">
            <Link href="/como-funciona" className="text-gray-400 hover:text-white text-sm font-medium transition-colors px-3 py-2">
              Como Funciona
            </Link>
            <Link href="/freelancers" className="text-gray-400 hover:text-white text-sm font-medium transition-colors px-3 py-2">
              Freelancers
            </Link>
            {session ? (
              <>
                <Link href="/dashboard/cliente/mensagens" className="relative text-gray-400 hover:text-white transition-colors p-2">
                  <MessageSquare className="w-5 h-5" />
                </Link>
                <Link href={getDashboardPath() + '/notificacoes'} className="relative text-gray-400 hover:text-white transition-colors p-2">
                  <Bell className="w-5 h-5" />
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-xl border border-white/10 hover:border-indigo-400/50 bg-white/5 hover:bg-white/10 transition-all"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">
                      {session.user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-white text-sm font-medium max-w-[80px] truncate">{session.user.name?.split(' ')[0]}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-60 bg-white text-gray-800 rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-fade-in">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-semibold text-sm text-gray-900">{session.user.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{session.user.email}</p>
                        <span className="inline-block mt-1 text-xs bg-indigo-50 text-indigo-600 font-semibold px-2 py-0.5 rounded-full">
                          {session.user.role === 'FREELANCER' ? 'Freelancer' : 'Empresa'}
                        </span>
                      </div>
                      <Link href={getDashboardPath()} onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors">
                        <LayoutDashboard className="w-4 h-4 text-indigo-500" /> Meu Painel
                      </Link>
                      <Link href={getDashboardPath() + '/perfil'} onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors">
                        <User className="w-4 h-4 text-indigo-500" /> Meu Perfil
                      </Link>
                      <Link href={getDashboardPath() + '/configuracoes'} onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors">
                        <Settings className="w-4 h-4 text-indigo-500" /> Configurações
                      </Link>
                      <div className="mx-4 my-1 border-t border-gray-100" />
                      <button onClick={() => signOut({ callbackUrl: '/' })} className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 w-full text-left transition-colors">
                        <LogOut className="w-4 h-4" /> Sair
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-300 hover:text-white text-sm font-medium transition-colors px-3 py-2">
                  Entrar
                </Link>
                <Link href="/cadastro" className="text-gray-300 hover:text-white text-sm font-medium transition-colors px-3 py-2">
                  Cadastrar
                </Link>
                <Link href="/publicar-projeto" className="flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6C0A] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-orange-900/30 hover:-translate-y-0.5">
                  <Zap className="w-4 h-4" /> Publicar Projeto
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 px-4 py-5 space-y-4" style={{ background: '#12102A' }}>
          <form onSubmit={handleSearch} className="flex rounded-xl overflow-hidden">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar freelancers ou projetos..."
              className="flex-1 px-4 py-2.5 text-gray-800 text-sm outline-none"
            />
            <button type="submit" className="bg-[#F97316] px-4 py-2.5">
              <Search className="w-4 h-4 text-white" />
            </button>
          </form>
          <nav className="space-y-1">
            {[
              { href: '/como-funciona', label: 'Como Funciona' },
              { href: '/freelancers', label: 'Encontrar Freelancers' },
              { href: '/projetos', label: 'Encontrar Trabalho' },
            ].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                className="block text-gray-300 hover:text-white hover:bg-white/5 py-2.5 px-3 rounded-lg transition-colors text-sm font-medium">
                {item.label}
              </Link>
            ))}
            <div className="border-t border-white/10 pt-3 mt-3 space-y-2">
              {session ? (
                <>
                  <Link href={getDashboardPath()} onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 text-gray-300 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 text-sm font-medium">
                    <LayoutDashboard className="w-4 h-4" /> Meu Painel
                  </Link>
                  <button onClick={() => { setMenuOpen(false); signOut({ callbackUrl: '/' }) }}
                    className="flex items-center gap-2 text-red-400 py-2.5 px-3 rounded-lg hover:bg-red-900/20 w-full text-left text-sm font-medium">
                    <LogOut className="w-4 h-4" /> Sair
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMenuOpen(false)}
                    className="block text-gray-300 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 text-sm font-medium">Entrar</Link>
                  <Link href="/publicar-projeto" onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 bg-[#F97316] text-white py-3 px-4 rounded-xl font-bold text-sm">
                    <Zap className="w-4 h-4" /> Publicar Projeto
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
