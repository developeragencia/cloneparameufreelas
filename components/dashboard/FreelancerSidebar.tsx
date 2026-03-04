'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Briefcase, FileText, MessageSquare, CreditCard, User, Image } from 'lucide-react'

const links = [
  { href: '/dashboard/freelancer', label: 'Visão Geral', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/freelancer/projetos', label: 'Encontrar Projetos', icon: Briefcase },
  { href: '/dashboard/freelancer/propostas', label: 'Minhas Propostas', icon: FileText },
  { href: '/dashboard/freelancer/mensagens', label: 'Mensagens', icon: MessageSquare },
  { href: '/dashboard/freelancer/portfolio', label: 'Portfólio', icon: Image },
  { href: '/dashboard/freelancer/pagamentos', label: 'Pagamentos', icon: CreditCard },
  { href: '/dashboard/freelancer/perfil', label: 'Meu Perfil', icon: User },
]

export default function FreelancerSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-[#1a1a2e] text-white flex-shrink-0 hidden md:flex flex-col">
      <div className="p-6 border-b border-white border-opacity-10">
        <Link href="/" className="font-black text-xl">
          <span className="text-white">99</span>
          <span className="text-[#00aeef]">freelas</span>
        </Link>
        <p className="text-xs text-gray-400 mt-1">Painel do Freelancer</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active ? 'bg-[#00aeef] text-white' : 'text-gray-300 hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white border-opacity-10">
        <Link
          href="/projetos"
          className="flex items-center justify-center gap-2 w-full bg-[#00aeef] hover:bg-[#0099d4] text-white py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          Ver Projetos Disponíveis
        </Link>
      </div>
    </aside>
  )
}
