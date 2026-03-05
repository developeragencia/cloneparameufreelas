import Link from 'next/link'

const stats = [
  {
    value: '136.912',
    label: 'Projetos Concluídos',
    sub: '+12% este mês',
    color: 'from-indigo-500 to-indigo-600',
    bg: 'bg-indigo-50',
    text: 'text-indigo-600',
  },
  {
    value: '3.4M+',
    label: 'Freelancers Ativos',
    sub: 'Em todo o Brasil',
    color: 'from-cyan-500 to-cyan-600',
    bg: 'bg-cyan-50',
    text: 'text-cyan-600',
  },
  {
    value: 'R$26M+',
    label: 'Pagos a Freelancers',
    sub: 'Com total segurança',
    color: 'from-orange-500 to-orange-600',
    bg: 'bg-orange-50',
    text: 'text-orange-600',
  },
]

export default function StatsSection() {
  return (
    <section className="bg-[#F8FAFC] py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-3 md:gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 text-center group hover:shadow-md transition-all">
              <div className={`inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl ${stat.bg} mb-3`}>
                <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-br ${stat.color}`} />
              </div>
              <div className={`text-lg sm:text-2xl md:text-3xl font-extrabold ${stat.text} mb-0.5 leading-none`}>{stat.value}</div>
              <div className="text-xs sm:text-sm font-semibold text-gray-700 mb-0.5">{stat.label}</div>
              <div className="text-xs text-gray-400 hidden sm:block">{stat.sub}</div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs sm:text-sm text-gray-500 mt-5">
          Freelancer? Junte-se a nós —{' '}
          <Link href="/cadastro?tipo=freelancer" className="text-indigo-600 font-semibold hover:underline">
            Cadastre-se grátis agora
          </Link>
        </p>
      </div>
    </section>
  )
}
