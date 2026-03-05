'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Search, ChevronDown, Menu, X, User, LogOut, Settings, LayoutDashboard } from 'lucide-react'
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
    <header className="sticky top-0 z-50">
      {/* Top bar — charcoal dark */}
      <div style={{ background: '#3C3C3C' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-[52px] gap-4">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Logo size="md" variant="light" />
            </Link>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
              <div className="flex w-full overflow-hidden rounded-sm">
                <div className="relative">
                  <button type="button" onClick={() => setSearchDropdown(!searchDropdown)}
                    className="flex items-center gap-1 px-3 py-2 text-xs text-white font-semibold whitespace-nowrap h-full bg-[#00AEEF] hover:bg-[#0099d4] transition-colors">
                    {searchType} <ChevronDown className="w-3 h-3" />
                  </button>
                  {searchDropdown && (
                    <div className="absolute top-full left-0 mt-1 bg-white rounded shadow-lg border border-gray-200 z-50 min-w-[150px]">
                      {['Freelancers', 'Projetos'].map((opt) => (
                        <button key={opt} type="button"
                          onClick={() => { setSearchType(opt); setSearchDropdown(false) }}
                          className="block w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 font-medium">
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <input type="text" value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Buscar ${searchType.toLowerCase()}`}
                  className="flex-1 px-3 py-2 text-xs outline-none text-gray-800 bg-white"
                />
                <button type="submit" className="px-3 py-2 bg-white hover:bg-gray-100 transition-colors border-l border-gray-200">
                  <Search className="w-3.5 h-3.5 text-gray-500" />
                </button>
              </div>
            </form>

            {/* Auth links */}
            <nav className="hidden md:flex items-center gap-2">
              {session ? (
                <div className="relative">
                  <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-1.5 py-1 px-2 rounded hover:bg-white/10 transition-colors text-white text-xs font-medium">
                    <div className="w-6 h-6 rounded-full bg-[#00AEEF] flex items-center justify-center text-white text-[10px] font-bold">
                      {session.user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="max-w-[70px] truncate text-xs">{session.user.name?.split(' ')[0]}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-1.5 w-48 bg-white rounded shadow-xl border border-gray-200 py-1 z-50">
                      <div className="px-3 py-2 border-b border-gray-100">
                        <p className="font-semibold text-xs text-gray-900">{session.user.name}</p>
                        <p className="text-[10px] text-gray-500">{session.user.email}</p>
                      </div>
                      <Link href={getDashboardPath()} onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50">
                        <LayoutDashboard className="w-3.5 h-3.5 text-gray-400" /> Meu Painel
                      </Link>
                      <Link href={getDashboardPath() + '/perfil'} onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50">
                        <User className="w-3.5 h-3.5 text-gray-400" /> Meu Perfil
                      </Link>
                      <Link href={getDashboardPath() + '/configuracoes'} onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50">
                        <Settings className="w-3.5 h-3.5 text-gray-400" /> Configurações
                      </Link>
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button onClick={() => signOut({ callbackUrl: '/' })} className="flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 w-full">
                          <LogOut className="w-3.5 h-3.5" /> Sair
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link href="/login" className="text-xs text-white font-medium hover:text-[#00AEEF] transition-colors px-2 py-1">Login</Link>
                  <Link href="/cadastro" className="text-xs text-white font-medium hover:text-[#00AEEF] transition-colors px-2 py-1">Cadastre-se</Link>
                  <Link href="/publicar-projeto"
                    className="ml-1 px-4 py-1.5 text-xs font-semibold bg-[#00AEEF] hover:bg-[#0099d4] text-white rounded transition-colors">
                    Publicar projeto
                  </Link>
                </>
              )}
            </nav>

            {/* Mobile toggle */}
            <button className="md:hidden p-2 text-white" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Secondary nav */}
      <div style={{ background: '#2E2E2E' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="hidden md:flex items-center h-9 gap-5">
            <Link href="/como-funciona" className="text-xs text-gray-300 hover:text-white font-medium transition-colors">Como Funciona</Link>
            <Link href="/freelancers" className="text-xs text-gray-300 hover:text-white font-medium transition-colors">Encontrar Freelancers</Link>
            <Link href="/projetos" className="text-xs text-gray-300 hover:text-white font-medium transition-colors">Encontrar Trabalho</Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-700 px-4 py-4 space-y-3" style={{ background: '#3C3C3C' }}>
          <form onSubmit={handleSearch} className="flex overflow-hidden rounded-sm">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar freelancers..." className="flex-1 px-4 py-2.5 text-sm outline-none text-gray-800 bg-white" />
            <button type="submit" className="px-4 bg-[#00AEEF]">
              <Search className="w-4 h-4 text-white" />
            </button>
          </form>
          <nav className="space-y-1 pt-1">
            {[
              ['/como-funciona', 'Como Funciona'],
              ['/freelancers', 'Encontrar Freelancers'],
              ['/projetos', 'Encontrar Trabalho'],
            ].map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)}
                className="block py-2.5 px-2 text-sm text-gray-200 hover:text-white">
                {label}
              </Link>
            ))}
            <div className="border-t border-gray-600 pt-3 mt-2 space-y-2">
              {session ? (
                <>
                  <Link href={getDashboardPath()} onClick={() => setMenuOpen(false)} className="block py-2.5 px-2 text-sm text-gray-200 hover:text-white">
                    Meu Painel
                  </Link>
                  <button onClick={() => { setMenuOpen(false); signOut({ callbackUrl: '/' }) }}
                    className="block py-2.5 px-2 text-sm text-red-400 w-full text-left">
                    Sair
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link href="/login" onClick={() => setMenuOpen(false)} className="text-center py-2.5 text-sm text-white border border-gray-500 rounded-sm">Login</Link>
                  <Link href="/publicar-projeto" onClick={() => setMenuOpen(false)} className="text-center py-2.5 text-sm font-semibold bg-[#00AEEF] text-white rounded-sm">Publicar projeto</Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
