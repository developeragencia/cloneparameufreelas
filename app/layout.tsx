import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Providers from '@/components/providers'

export const metadata: Metadata = {
  title: { default: 'MeuFreelas - Encontre Freelancers e Projetos', template: '%s | MeuFreelas' },
  description: 'Plataforma líder de freelancers no Brasil. Encontre profissionais talentosos ou projetos para trabalhar. Mais de 3 milhões de freelancers cadastrados.',
  keywords: ['freelancer', 'projetos', 'trabalho freelance', 'contratar freelancer', 'design', 'programação', 'marketing'],
  authors: [{ name: 'MeuFreelas' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'MeuFreelas',
    title: 'MeuFreelas - Encontre Freelancers e Projetos',
    description: 'Plataforma líder de freelancers no Brasil.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          {children}
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        </Providers>
      </body>
    </html>
  )
}
