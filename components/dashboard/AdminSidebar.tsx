'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, FolderOpen, CreditCard, AlertTriangle, Tag, Settings } from 'lucide-react'

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/usuarios', label: 'Usuários', icon: Users },
  { href: '/admin/projetos', label: 'Projetos', icon: FolderOpen },
  { href: '/admin/pagamentos', label: 'Pagamentos', icon: CreditCard },
  { href: '/admin/disputas', label: 'Disputas', icon: AlertTriangle },
  { href: '/admin/categorias', label: 'Categorias', icon: Tag },
  { href: '/admin/configuracoes', label: 'Configurações', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-[#0f0f23] text-white flex-shrink-0 hidden md:flex flex-col">
      <div className="p-6 border-b border-white border-opacity-10">
        <Link href="/" className="font-black text-xl">
          <span className="text-white">99</span>
          <span className="text-[#00aeef]">freelas</span>
        </Link>
        <p className="text-xs text-gray-400 mt-1">Painel Administrativo</p>
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
        <Link href="/" className="text-xs text-gray-400 hover:text-white transition-colors">← Voltar ao site</Link>
      </div>
    </aside>
  )
}
