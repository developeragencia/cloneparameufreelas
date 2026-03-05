import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">

          {/* Brand column */}
          <div className="md:col-span-1">
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Você é um freelancer? Nós conectamos milhares de profissionais a empresas todos os dias.
            </p>
            <Link
              href="/cadastro?tipo=freelancer"
              className="inline-block px-5 py-2 text-sm font-semibold text-white rounded-sm transition-colors"
              style={{ background: '#00AEEF' }}
            >
              Cadastre-se
            </Link>
          </div>

          {/* MeuFreelas */}
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-3">MeuFreelas</h4>
            <ul className="space-y-2">
              {[
                ['Como funciona', '/como-funciona'],
                ['Blog', '/blog'],
                ['Central de ajuda', '/ajuda'],
                ['Termos de uso', '/termos'],
                ['Política de privacidade', '/privacidade'],
              ].map(([l, h]) => (
                <li key={h}><Link href={h} className="text-sm hover:underline" style={{ color: '#00AEEF' }}>{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Para Empresas */}
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-3">Para Empresas</h4>
            <ul className="space-y-2">
              {[
                ['Área de empresa', '/dashboard/cliente'],
                ['Cadastro de empresa', '/cadastro?tipo=cliente'],
                ['Como funciona', '/como-funciona'],
                ['Publique seu projeto', '/publicar-projeto'],
                ['Lista de freelancers', '/freelancers'],
              ].map(([l, h]) => (
                <li key={h}><Link href={h} className="text-sm hover:underline" style={{ color: '#00AEEF' }}>{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Para Freelancers */}
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-3">Para Freelancers</h4>
            <ul className="space-y-2">
              {[
                ['Área de freelancer', '/dashboard/freelancer'],
                ['Cadastro de freelancer', '/cadastro?tipo=freelancer'],
                ['Como funciona', '/como-funciona'],
                ['Lista de projetos', '/projetos'],
              ].map(([l, h]) => (
                <li key={h}><Link href={h} className="text-sm hover:underline" style={{ color: '#00AEEF' }}>{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Siga-nos */}
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-3">Siga-nos</h4>
            <ul className="space-y-2">
              {[
                ['Facebook', 'https://facebook.com'],
                ['Twitter', 'https://twitter.com'],
                ['LinkedIn', 'https://linkedin.com'],
                ['Instagram', 'https://instagram.com'],
              ].map(([l, h]) => (
                <li key={h}><a href={h} target="_blank" rel="noreferrer" className="text-sm hover:underline" style={{ color: '#00AEEF' }}>{l}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4 text-center">
        <p className="text-xs text-gray-400">© {new Date().getFullYear()} MeuFreelas. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
