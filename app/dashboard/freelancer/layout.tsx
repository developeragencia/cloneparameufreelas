import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import FreelancerSidebar from '@/components/dashboard/FreelancerSidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'

export default async function FreelancerDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login?callbackUrl=/dashboard/freelancer')
  if (session.user.role === 'CLIENT') redirect('/dashboard/cliente')
  if (session.user.role === 'ADMIN') redirect('/admin')

  return (
    <div className="flex min-h-screen bg-gray-100">
      <FreelancerSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader user={session.user} />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
