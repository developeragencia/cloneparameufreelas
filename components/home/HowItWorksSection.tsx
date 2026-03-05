import Link from 'next/link'
import { FileText, Users, ThumbsUp } from 'lucide-react'

const steps = [
  {
    num: '01',
    title: 'Publique seu Projeto',
    desc: 'Descreva o que você precisa, defina o orçamento e prazo. É rápido, simples e totalmente grátis.',
    icon: FileText,
  },
  {
    num: '02',
    title: 'Escolha o Melhor',
    desc: 'Receba propostas de freelancers qualificados. Veja portfólios, avaliações e converse pelo chat.',
    icon: Users,
  },
  {
    num: '03',
    title: 'Pague com Segurança',
    desc: 'O pagamento só é liberado ao freelancer quando você aprovar o trabalho. Seu dinheiro sempre protegido.',
    icon: ThumbsUp,
  },
]

export default function HowItWorksSection() {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Como funciona</h2>
          <p className="text-gray-500 text-sm">Em 3 passos simples você contrata o freelancer ideal</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
          {/* Connector */}
          <div className="hidden sm:block absolute top-8 left-[calc(16.5%+32px)] right-[calc(16.5%+32px)] h-px bg-gray-300" />

          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.num} className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-[#1A56DB] flex items-center justify-center shadow-sm">
                    <Icon className="w-7 h-7 text-[#1A56DB]" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#1A56DB] text-white text-xs font-bold flex items-center justify-center">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/publicar-projeto"
            className="inline-flex items-center gap-2 bg-[#1A56DB] hover:bg-[#1446BF] text-white font-semibold px-8 py-3 rounded-lg text-sm transition-colors"
          >
            Publicar meu projeto agora →
          </Link>
        </div>
      </div>
    </section>
  )
}
