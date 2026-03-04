'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { Search, ChevronDown, Menu, X, Bell, MessageSquare, User, LogOut, Settings, LayoutDashboard } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Header() {
  const { data: session } = useSession()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) router.push(`/freelancers?q=${encodeURIComponent(searchQuery)}`)
  }

  const getDashboardPath = () => {
    if (!session) return '/login'
    if (session.user.role === 'ADMIN') return '/admin'
    if (session.user.role === 'FREELANCER') return '/dashboard/freelancer'
    return '/dashboard/cliente'
  }

  return (
    <header className="bg-[#1a1a2e] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <div className="text-2xl font-black">
              <span className="text-white">99</span>
              <span className="text-[#00aeef]">freelas</span>
            </div>
          </Link>

          {/* Search bar - desktop */}
          <div className="hidden md:flex items-center gap-2 flex-1 max-w-lg mx-6">
            <div className="relative">
              <button className="flex items-center gap-1 bg-[#00aeef] text-white px-3 py-2 rounded-l-md text-sm font-medium hover:bg-[#0099d4] transition-colors">
                Freelancers <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSearch} className="flex flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar freelancers"
                className="flex-1 px-4 py-2 text-gray-800 text-sm outline-none rounded-none border-0"
              />
              <button type="submit" className="bg-white px-3 py-2 rounded-r-md hover:bg-gray-100 transition-colors">
                <Search className="w-4 h-4 text-gray-600" />
              </button>
            </form>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-4">
            {session ? (
              <>
                <Link href="/dashboard/cliente/mensagens" className="text-gray-300 hover:text-white transition-colors">
                  <div className="relative">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                </Link>
                <Link href={getDashboardPath() + '/notificacoes'} className="text-gray-300 hover:text-white transition-colors">
                  <div className="relative">
                    <Bell className="w-5 h-5" />
                  </div>
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#00aeef] flex items-center justify-center text-white text-sm font-bold">
                      {session.user.name?.charAt(0).toUpperCase()}
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-lg shadow-xl border py-2 z-50">
                      <div className="px-4 py-2 border-b">
                        <p className="font-semibold text-sm">{session.user.name}</p>
                        <p className="text-xs text-gray-500">{session.user.email}</p>
                      </div>
                      <Link href={getDashboardPath()} onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50">
                        <LayoutDashboard className="w-4 h-4" /> Painel
                      </Link>
                      <Link href={getDashboardPath() + '/perfil'} onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50">
                        <User className="w-4 h-4" /> Meu Perfil
                      </Link>
                      <Link href={getDashboardPath() + '/configuracoes'} onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50">
                        <Settings className="w-4 h-4" /> Configurações
                      </Link>
                      <hr className="my-1" />
                      <button onClick={() => signOut({ callbackUrl: '/' })} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50 w-full">
                        <LogOut className="w-4 h-4" /> Sair
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
                  Login
                </Link>
                <Link href="/cadastro" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
                  Cadastre-se
                </Link>
                <Link href="/publicar-projeto" className="bg-[#00aeef] hover:bg-[#0099d4] text-white text-sm font-semibold px-5 py-2 rounded transition-colors">
                  Publicar projeto
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Secondary nav */}
        <div className="hidden md:flex items-center justify-end pb-2 gap-6 text-sm">
          <Link href="/como-funciona" className="text-gray-300 hover:text-white transition-colors font-medium">Como Funciona</Link>
          <Link href="/freelancers" className="text-gray-300 hover:text-white transition-colors font-medium">Encontrar Freelancers</Link>
          <Link href="/projetos" className="text-gray-300 hover:text-white transition-colors font-medium">Encontrar Trabalho</Link>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0f0f1a] border-t border-gray-700 px-4 py-4 space-y-3">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar freelancers"
              className="flex-1 px-4 py-2 text-gray-800 text-sm rounded-l-md outline-none"
            />
            <button type="submit" className="bg-[#00aeef] px-3 py-2 rounded-r-md">
              <Search className="w-4 h-4 text-white" />
            </button>
          </form>
          <nav className="space-y-2">
            <Link href="/como-funciona" className="block text-gray-300 hover:text-white py-2">Como Funciona</Link>
            <Link href="/freelancers" className="block text-gray-300 hover:text-white py-2">Encontrar Freelancers</Link>
            <Link href="/projetos" className="block text-gray-300 hover:text-white py-2">Encontrar Trabalho</Link>
            <hr className="border-gray-700" />
            {session ? (
              <>
                <Link href={getDashboardPath()} className="block text-gray-300 hover:text-white py-2">Painel</Link>
                <button onClick={() => signOut({ callbackUrl: '/' })} className="block text-red-400 hover:text-red-300 py-2">Sair</button>
              </>
            ) : (
              <>
                <Link href="/login" className="block text-gray-300 hover:text-white py-2">Login</Link>
                <Link href="/cadastro" className="block text-gray-300 hover:text-white py-2">Cadastre-se</Link>
                <Link href="/publicar-projeto" className="block bg-[#00aeef] text-white text-center py-2 rounded">Publicar projeto</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
