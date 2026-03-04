'use client'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { Bell, LogOut, User, Menu } from 'lucide-react'
import { useState } from 'react'

interface Props {
  user: { name?: string | null; email?: string | null; image?: string | null; role?: string }
}

export default function DashboardHeader({ user }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white border-b h-16 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-3">
        <Link href="/" className="font-black text-xl">
          <span className="text-gray-800">99</span>
          <span className="text-[#00aeef]">freelas</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative text-gray-500 hover:text-[#00aeef] transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
        </button>

        <div className="relative">
          <button onClick={() => setOpen(!open)} className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#00aeef] flex items-center justify-center text-white font-semibold text-sm">
              {user?.name?.charAt(0).toUpperCase() ?? 'U'}
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:block">{user?.name}</span>
          </button>

          {open && (
            <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg border w-48 py-1 z-50">
              <div className="px-4 py-2 border-b">
                <p className="font-medium text-sm text-gray-800 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
              <Link href={user?.role === 'FREELANCER' ? '/dashboard/freelancer/perfil' : '/dashboard/cliente/perfil'} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setOpen(false)}>
                <User className="w-4 h-4" /> Meu Perfil
              </Link>
              <button onClick={() => signOut({ callbackUrl: '/' })} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                <LogOut className="w-4 h-4" /> Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
