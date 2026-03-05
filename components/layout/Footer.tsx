import Link from 'next/link'
import Logo from '@/components/ui/Logo'

const cols = [
  {
    title: 'Plataforma',
    links: [
      { label: 'Como Funciona', href: '/como-funciona' },
      { label: 'Categorias', href: '/categorias' },
      { label: 'Blog', href: '/blog' },
      { label: 'Central de Ajuda', href: '/ajuda' },
    ],
  },
  {
    title: 'Para Empresas',
    links: [
      { label: 'Publicar Projeto', href: '/publicar-projeto' },
      { label: 'Encontrar Freelancers', href: '/freelancers' },
      { label: 'Painel da Empresa', href: '/dashboard/cliente' },
      { label: 'Cadastro Empresa', href: '/cadastro?tipo=cliente' },
    ],
  },
  {
    title: 'Para Freelancers',
    links: [
      { label: 'Encontrar Projetos', href: '/projetos' },
      { label: 'Painel do Freelancer', href: '/dashboard/freelancer' },
      { label: 'Cadastro Freelancer', href: '/cadastro?tipo=freelancer' },
      { label: 'Como Receber', href: '/como-funciona#pagamento' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Termos de Uso', href: '/termos' },
      { label: 'Política de Privacidade', href: '/privacidade' },
      { label: 'Cookies', href: '/cookies' },
      { label: 'Contato', href: '/contato' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Logo size="md" variant="light" />
            <p className="text-gray-400 text-sm mt-3 mb-5 leading-relaxed max-w-xs">
              A plataforma que conecta empresas a freelancers qualificados em todo o Brasil.
            </p>
            <div className="flex gap-2">
              {[
                { label: 'in', href: 'https://linkedin.com' },
                { label: 'IG', href: 'https://instagram.com' },
                { label: 'f', href: 'https://facebook.com' },
                { label: 'X', href: 'https://twitter.com' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-[#1A56DB] flex items-center justify-center text-gray-400 hover:text-white text-xs font-bold transition-colors">
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map(col => (
            <div key={col.title}>
              <h4 className="text-white font-semibold text-sm mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-gray-400 hover:text-white text-sm transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-800 py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">© {new Date().getFullYear()} MeuFreelas. Todos os direitos reservados.</p>
          <div className="flex items-center gap-3">
            <span className="text-gray-600 text-xs">Pagamento seguro:</span>
            {['Pix', 'Visa', 'Master', 'MP'].map(p => (
              <span key={p} className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded font-medium">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
