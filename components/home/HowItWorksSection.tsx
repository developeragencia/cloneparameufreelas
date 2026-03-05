import { FileText, User, ShieldCheck } from 'lucide-react'

const steps = [
  {
    icon: FileText,
    title: 'Publique uma vaga',
    description: 'Publique a sua vaga para milhares de profissionais, você irá receber propostas de freelancers talentosos em poucos minutos.',
  },
  {
    icon: User,
    title: 'Contrate',
    description: 'Reveja o histórico de trabalho, feedback de clientes e portfólio para limitar os candidatos. Então faça uma entrevista pelo chat e escolha o melhor.',
  },
  {
    icon: ShieldCheck,
    title: 'Pague com segurança',
    description: 'Com o pagamento seguro do MeuFreelas, o pagamento será repassado para o freelancer somente quando o projeto estiver concluído.',
  },
]

export default function HowItWorksSection() {
  return (
    <section className="py-12 md:py-20 bg-[#2d2d2d] text-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">Como Funciona?</h2>
        <p className="text-gray-300 mb-8 md:mb-14 text-sm md:text-base max-w-2xl mx-auto">
          Anuncie o seu trabalho facilmente, contrate freelancers e pague com segurança.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={i} className="flex flex-col items-center text-center px-2">
                <div className="mb-4 p-4 border-2 border-white rounded-full">
                  <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-base md:text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed text-sm">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
