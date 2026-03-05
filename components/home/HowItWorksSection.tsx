import Link from 'next/link'

const steps = [
  {
    number: '01',
    title: 'Publique seu Projeto',
    description: 'Descreva o que você precisa, defina o orçamento e prazo. É rápido, simples e totalmente grátis.',
    color: 'from-indigo-500 to-purple-600',
    badge: 'Grátis',
  },
  {
    number: '02',
    title: 'Escolha o Melhor',
    description: 'Receba propostas de freelancers qualificados. Veja portfólios, avaliações e converse pelo chat.',
    color: 'from-cyan-500 to-blue-500',
    badge: 'Fácil',
  },
  {
    number: '03',
    title: 'Pague com Segurança',
    description: 'O pagamento só é liberado ao freelancer quando você aprovar o trabalho. Seu dinheiro sempre protegido.',
    color: 'from-orange-500 to-amber-500',
    badge: 'Seguro',
  },
]

export default function HowItWorksSection() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">Como Funciona</span>
          <h2 className="section-title">Simples como deve ser</h2>
          <p className="section-subtitle">Em 3 passos você encontra o profissional ideal e entrega seu projeto com segurança.</p>
        </div>

        <div className="relative">
          {/* Connector line desktop */}
          <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-indigo-200 via-cyan-200 to-orange-200 z-0" style={{ left: '18%', right: '18%' }} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                {/* Number circle */}
                <div className={`relative w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-extrabold text-xl md:text-2xl mb-5 shadow-xl`}>
                  {step.number}
                  <span className="absolute -top-2 -right-2 bg-white border-2 border-gray-100 text-gray-700 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {step.badge}
                  </span>
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link
            href="/publicar-projeto"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-200 hover:-translate-y-0.5 text-sm"
          >
            Começar agora →
          </Link>
        </div>
      </div>
    </section>
  )
}
