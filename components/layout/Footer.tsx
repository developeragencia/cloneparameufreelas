import Link from 'next/link'
import Logo from '@/components/ui/Logo'

const footerLinks = {
  plataforma: [
    { label: 'Como Funciona', href: '/como-funciona' },
    { label: 'Blog', href: '/blog' },
    { label: 'Central de Ajuda', href: '/ajuda' },
    { label: 'Termos de Uso', href: '/termos' },
    { label: 'Privacidade', href: '/privacidade' },
  ],
  empresas: [
    { label: 'Publicar Projeto', href: '/publicar-projeto' },
    { label: 'Encontrar Freelancers', href: '/freelancers' },
    { label: 'Área da Empresa', href: '/dashboard/cliente' },
    { label: 'Cadastro Empresa', href: '/cadastro?tipo=cliente' },
  ],
  freelancers: [
    { label: 'Encontrar Projetos', href: '/projetos' },
    { label: 'Área do Freelancer', href: '/dashboard/freelancer' },
    { label: 'Cadastro Freelancer', href: '/cadastro?tipo=freelancer' },
    { label: 'Categorias', href: '/categorias' },
  ],
}

export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(180deg, #0D1117 0%, #0A0D16 100%)' }}>
      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-4 pt-14 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Logo size="lg" variant="light" />
            <p className="text-gray-400 text-sm mt-4 mb-5 leading-relaxed max-w-xs">
              A maior plataforma de freelancers do Brasil. Conectamos talentos a projetos de sucesso.
            </p>
            <Link
              href="/cadastro"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:-translate-y-0.5 transition-all shadow-lg"
            >
              Comece Grátis →
            </Link>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { href: 'https://instagram.com', label: 'IG', color: 'hover:bg-pink-600' },
                { href: 'https://linkedin.com', label: 'in', color: 'hover:bg-blue-700' },
                { href: 'https://twitter.com', label: 'X', color: 'hover:bg-gray-600' },
                { href: 'https://facebook.com', label: 'f', color: 'hover:bg-blue-600' },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  className={`w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white text-xs font-bold transition-all ${s.color}`}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Plataforma</h4>
            <ul className="space-y-2.5">
              {footerLinks.plataforma.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-400 hover:text-indigo-400 text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Empresas</h4>
            <ul className="space-y-2.5">
              {footerLinks.empresas.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-400 hover:text-indigo-400 text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Freelancers</h4>
            <ul className="space-y-2.5">
              {footerLinks.freelancers.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-400 hover:text-indigo-400 text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>

            {/* Payment badges */}
            <div className="mt-6">
              <p className="text-gray-500 text-xs mb-2 uppercase tracking-wide">Pagamento seguro</p>
              <div className="flex gap-2">
                {['Visa', 'PIX', 'MP'].map((p) => (
                  <span key={p} className="bg-white/5 border border-white/10 text-gray-400 text-xs px-2 py-1 rounded-lg font-semibold">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-5">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">© {new Date().getFullYear()} MeuFreelas. Todos os direitos reservados.</p>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-gray-500 text-xs">Todos os sistemas operacionais</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
