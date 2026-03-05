import { FileText, User, ShieldCheck } from 'lucide-react'

const steps = [
  {
    icon: FileText,
    title: 'Publique uma vaga',
    desc: 'Publique a sua vaga para milhares de profissionais, você irá receber propostas de freelancers talentosos em poucos minutos.',
  },
  {
    icon: User,
    title: 'Contrate',
    desc: 'Reveja o histórico de trabalho, feedback de clientes e portfólio para limitar os candidatos. Então faça uma entrevista pelo chat e escolha o melhor.',
  },
  {
    icon: ShieldCheck,
    title: 'Pague com segurança',
    desc: 'Com o pagamento seguro do MeuFreelas, o pagamento será repassado para o freelancer somente quando o projeto estiver concluído.',
  },
]

export default function HowItWorksSection() {
  return (
    <section className="py-14 md:py-20" style={{ background: '#3C3C3C' }}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Como Funciona?</h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            Anuncie o seu trabalho facilmente, contrate freelancers e pague com segurança.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full border-2 border-white/40 flex items-center justify-center mb-5">
                  <Icon className="w-9 h-9 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-white text-base mb-3">{step.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{step.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
