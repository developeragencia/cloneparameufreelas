'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Search, ChevronDown, Menu, X, Bell, MessageSquare, User, LogOut, Settings, LayoutDashboard } from 'lucide-react'
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
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-[62px] gap-4">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo size="md" variant="dark" />
          </Link>

          {/* Search bar - desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg relative">
            <div className="flex w-full border border-gray-300 rounded-lg overflow-hidden focus-within:border-[#1A56DB] focus-within:ring-1 focus-within:ring-[#1A56DB] transition-all">
              <div className="relative border-r border-gray-300">
                <button
                  type="button"
                  onClick={() => setSearchDropdown(!searchDropdown)}
                  className="flex items-center gap-1 px-3 py-2.5 text-sm text-gray-600 font-medium whitespace-nowrap hover:bg-gray-50 h-full"
                >
                  {searchType} <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {searchDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 min-w-[140px]">
                    {['Freelancers', 'Projetos'].map((opt) => (
                      <button key={opt} type="button"
                        onClick={() => { setSearchType(opt); setSearchDropdown(false) }}
                        className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#1A56DB] font-medium">
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input
                type="text" value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Buscar ${searchType.toLowerCase()}...`}
                className="flex-1 px-4 py-2.5 text-sm outline-none text-gray-800 bg-white"
              />
              <button type="submit" className="px-4 py-2.5 bg-[#1A56DB] hover:bg-[#1446BF] transition-colors">
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>
          </form>

          {/* Nav links + auth */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/como-funciona" className="px-3 py-2 text-sm text-gray-600 hover:text-[#1A56DB] font-medium transition-colors">Como Funciona</Link>
            <Link href="/freelancers" className="px-3 py-2 text-sm text-gray-600 hover:text-[#1A56DB] font-medium transition-colors">Freelancers</Link>
            <Link href="/projetos" className="px-3 py-2 text-sm text-gray-600 hover:text-[#1A56DB] font-medium transition-colors">Projetos</Link>

            <div className="w-px h-5 bg-gray-200 mx-1" />

            {session ? (
              <>
                <Link href="/dashboard/cliente/mensagens" className="relative p-2 text-gray-500 hover:text-[#1A56DB] transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </Link>
                <Link href={getDashboardPath() + '/notificacoes'} className="relative p-2 text-gray-500 hover:text-[#1A56DB] transition-colors">
                  <Bell className="w-5 h-5" />
                </Link>
                <div className="relative ml-1">
                  <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-7 h-7 rounded-full bg-[#1A56DB] flex items-center justify-center text-white text-xs font-bold">
                      {session.user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-700 max-w-[80px] truncate">{session.user.name?.split(' ')[0]}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-1.5 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-semibold text-sm text-gray-900">{session.user.name}</p>
                        <p className="text-xs text-gray-500">{session.user.email}</p>
                      </div>
                      <Link href={getDashboardPath()} onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                        <LayoutDashboard className="w-4 h-4 text-gray-400" /> Meu Painel
                      </Link>
                      <Link href={getDashboardPath() + '/perfil'} onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                        <User className="w-4 h-4 text-gray-400" /> Meu Perfil
                      </Link>
                      <Link href={getDashboardPath() + '/configuracoes'} onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                        <Settings className="w-4 h-4 text-gray-400" /> Configurações
                      </Link>
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button onClick={() => signOut({ callbackUrl: '/' })} className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                          <LogOut className="w-4 h-4" /> Sair
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#1A56DB] transition-colors">Entrar</Link>
                <Link href="/cadastro" className="px-4 py-2 text-sm font-semibold text-[#1A56DB] border border-[#1A56DB] rounded-lg hover:bg-blue-50 transition-colors">Cadastrar</Link>
                <Link href="/publicar-projeto" className="ml-1 px-4 py-2 text-sm font-semibold bg-[#1A56DB] hover:bg-[#1446BF] text-white rounded-lg transition-colors">
                  Publicar Projeto
                </Link>
              </>
            )}
          </nav>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 text-gray-600 rounded-lg hover:bg-gray-100" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-3">
          <form onSubmit={handleSearch} className="flex border border-gray-300 rounded-lg overflow-hidden">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar freelancers ou projetos..."
              className="flex-1 px-4 py-2.5 text-sm outline-none text-gray-800" />
            <button type="submit" className="px-4 bg-[#1A56DB]">
              <Search className="w-4 h-4 text-white" />
            </button>
          </form>
          <nav className="space-y-0.5 pt-1">
            {['/como-funciona|Como Funciona', '/freelancers|Freelancers', '/projetos|Projetos'].map((item) => {
              const [href, label] = item.split('|')
              return (
                <Link key={href} href={href} onClick={() => setMenuOpen(false)}
                  className="block py-2.5 px-2 text-sm font-medium text-gray-700 hover:text-[#1A56DB] rounded-lg hover:bg-gray-50">
                  {label}
                </Link>
              )
            })}
            <div className="border-t border-gray-200 pt-3 mt-2 space-y-2">
              {session ? (
                <>
                  <Link href={getDashboardPath()} onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 py-2.5 px-2 text-sm font-medium text-gray-700 hover:text-[#1A56DB] rounded-lg hover:bg-gray-50">
                    <LayoutDashboard className="w-4 h-4" /> Meu Painel
                  </Link>
                  <button onClick={() => { setMenuOpen(false); signOut({ callbackUrl: '/' }) }}
                    className="flex items-center gap-2 py-2.5 px-2 text-sm font-medium text-red-600 w-full text-left">
                    <LogOut className="w-4 h-4" /> Sair
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link href="/login" onClick={() => setMenuOpen(false)}
                    className="text-center py-2.5 text-sm font-semibold text-gray-700 border border-gray-300 rounded-lg">Entrar</Link>
                  <Link href="/publicar-projeto" onClick={() => setMenuOpen(false)}
                    className="text-center py-2.5 text-sm font-semibold bg-[#1A56DB] text-white rounded-lg">Publicar Projeto</Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
