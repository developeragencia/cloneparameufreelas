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
    description: 'Com o pagamento seguro do 99Freelas, o pagamento será repassado para o freelancer somente quando o projeto estiver concluído.',
  },
]

export default function HowItWorksSection() {
  return (
    <section className="py-16 bg-[#2d2d2d] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-3">Como Funciona?</h2>
        <p className="text-gray-300 mb-14 text-lg">
          Anuncie o seu trabalho facilmente, contrate freelancers e pague com segurança.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={i} className="flex flex-col items-center text-center px-4">
                <div className="mb-6 p-4 border-2 border-gray-400 rounded-full">
                  <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
