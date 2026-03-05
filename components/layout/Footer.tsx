import Link from 'next/link'
import { Facebook, Twitter, Linkedin } from 'lucide-react'
import Logo from '@/components/ui/Logo'

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-auto">
      {/* Newsletter bar */}
      <div className="bg-[#333] text-white py-3 text-center text-sm">
        Você é um freelancer? Junte-se a nós!{' '}
        <Link href="/cadastro?tipo=freelancer" className="text-[#00aeef] font-semibold hover:underline">
          Cadastre-se.
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Logo size="lg" variant="dark" />
            <p className="text-sm text-gray-600 mb-4">
              Você é um freelancer? Nós conectamos milhares de profissionais a empresas todos os dias.
            </p>
            <Link
              href="/cadastro?tipo=freelancer"
              className="inline-block bg-[#00aeef] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-[#0099d4] transition-colors"
            >
              Cadastre-se
            </Link>
          </div>

          {/* MeuFreelas */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4">MeuFreelas</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/como-funciona" className="text-[#00aeef] hover:underline">Como funciona</Link></li>
              <li><Link href="/blog" className="text-[#00aeef] hover:underline">Blog</Link></li>
              <li><Link href="/ajuda" className="text-[#00aeef] hover:underline">Central de ajuda</Link></li>
              <li><Link href="/termos" className="text-[#00aeef] hover:underline">Termos de uso</Link></li>
              <li><Link href="/privacidade" className="text-[#00aeef] hover:underline">Política de privacidade</Link></li>
            </ul>
          </div>

          {/* Para Empresas */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4">Para Empresas</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/dashboard/cliente" className="text-[#00aeef] hover:underline">Área de empresa</Link></li>
              <li><Link href="/cadastro?tipo=cliente" className="text-[#00aeef] hover:underline">Cadastro de empresa</Link></li>
              <li><Link href="/como-funciona#empresa" className="text-[#00aeef] hover:underline">Como funciona</Link></li>
              <li><Link href="/publicar-projeto" className="text-[#00aeef] hover:underline">Publique seu projeto</Link></li>
              <li><Link href="/freelancers" className="text-[#00aeef] hover:underline">Lista de freelancers</Link></li>
            </ul>
          </div>

          {/* Para Freelancers */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4">Para Freelancers</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/dashboard/freelancer" className="text-[#00aeef] hover:underline">Área de freelancer</Link></li>
              <li><Link href="/cadastro?tipo=freelancer" className="text-[#00aeef] hover:underline">Cadastro de freelancer</Link></li>
              <li><Link href="/como-funciona#freelancer" className="text-[#00aeef] hover:underline">Como funciona</Link></li>
              <li><Link href="/projetos" className="text-[#00aeef] hover:underline">Lista de projetos</Link></li>
            </ul>
          </div>

          {/* Siga-nos */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4">Siga-nos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-[#00aeef] hover:underline flex items-center gap-2">
                  <Facebook className="w-4 h-4" /> Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-[#00aeef] hover:underline flex items-center gap-2">
                  <Twitter className="w-4 h-4" /> Twitter
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-[#00aeef] hover:underline flex items-center gap-2">
                  <Linkedin className="w-4 h-4" /> Linkedin
                </a>
              </li>
              <li>
                <a href="https://plus.google.com" target="_blank" rel="noreferrer" className="text-[#00aeef] hover:underline">
                  Google +
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t py-4 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} MeuFreelas. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
