import Link from 'next/link'
import { FileText, User, ShieldCheck, Star, MessageSquare, DollarSign } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Como Funciona' }

export default function ComoFuncionaPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1a1a2e] text-white py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Como Funciona o MeuFreelas?</h1>
          <p className="text-gray-300 text-lg">
            Conectamos clientes a freelancers talentosos de forma simples, rápida e segura.
          </p>
        </div>
      </section>

      {/* Para Empresas */}
      <section id="empresa" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Para Empresas</h2>
          <p className="text-center text-gray-500 mb-12">Encontre o profissional ideal para o seu projeto</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: FileText, step: '1', title: 'Publique seu projeto', desc: 'Descreva o que você precisa, defina o orçamento e o prazo. É gratuito!' },
              { icon: User, step: '2', title: 'Receba propostas', desc: 'Freelancers talentosos enviarão propostas detalhadas para o seu projeto.' },
              { icon: ShieldCheck, step: '3', title: 'Contrate e pague com segurança', desc: 'Escolha o melhor freelancer e pague com segurança. O valor só é liberado após a conclusão.' },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-[#00aeef] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">{item.step}</div>
                  <Icon className="w-8 h-8 text-[#00aeef] mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              )
            })}
          </div>
          <div className="text-center mt-8">
            <Link href="/publicar-projeto" className="bg-[#00aeef] text-white px-8 py-3 rounded font-semibold hover:bg-[#0099d4] transition-colors">
              Publicar Projeto Grátis
            </Link>
          </div>
        </div>
      </section>

      {/* Para Freelancers */}
      <section id="freelancer" className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Para Freelancers</h2>
          <p className="text-center text-gray-500 mb-12">Encontre projetos e trabalhe com liberdade</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: User, step: '1', title: 'Crie seu perfil', desc: 'Monte um perfil completo com suas habilidades, experiências e portfólio.' },
              { icon: MessageSquare, step: '2', title: 'Envie propostas', desc: 'Candidate-se aos projetos que mais combinam com seu perfil e habilidades.' },
              { icon: DollarSign, step: '3', title: 'Receba pagamentos', desc: 'Trabalhe e receba pagamentos com segurança diretamente na plataforma.' },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="text-center p-6 border rounded-lg bg-white hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-[#00aeef] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">{item.step}</div>
                  <Icon className="w-8 h-8 text-[#00aeef] mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              )
            })}
          </div>
          <div className="text-center mt-8">
            <Link href="/cadastro?tipo=freelancer" className="bg-[#00aeef] text-white px-8 py-3 rounded font-semibold hover:bg-[#0099d4] transition-colors">
              Cadastre-se como Freelancer
            </Link>
          </div>
        </div>
      </section>

      {/* Pagamento Seguro */}
      <section className="py-16 bg-[#2d2d2d] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ShieldCheck className="w-16 h-16 text-[#00aeef] mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Pagamento 100% Seguro</h2>
          <p className="text-gray-300 text-lg mb-8">
            O valor do projeto fica retido na plataforma até a conclusão. Só então é liberado ao freelancer.
            Você tem total controle e segurança em cada transação.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {['Proteção total do seu dinheiro', 'Pagamento só após aprovação', 'Sistema antifraude avançado'].map((item, i) => (
              <div key={i} className="bg-white bg-opacity-10 rounded-lg p-4 flex items-start gap-3">
                <Star className="w-5 h-5 text-[#00aeef] mt-0.5 flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
