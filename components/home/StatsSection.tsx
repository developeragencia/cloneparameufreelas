import Link from 'next/link'

export default function StatsSection() {
  const stats = [
    { value: '136.912', label: 'projetos concluídos' },
    { value: '3.411.215', label: 'freelancers cadastrados' },
    { value: 'R$ 26.456.081,44', label: 'pago aos freelancers' },
  ]

  return (
    <section className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 pt-4 pb-6">
        <p className="text-center text-xs sm:text-sm text-gray-600 mb-4">
          Você é um freelancer? Conectamos profissionais a empresas todos os dias.{' '}
          <Link href="/cadastro?tipo=freelancer" className="text-[#00aeef] font-semibold hover:underline">
            Cadastre-se grátis
          </Link>
        </p>
        <div className="grid grid-cols-3 divide-x divide-gray-200">
          {stats.map((stat, i) => (
            <div key={i} className="py-3 text-center px-1">
              <div className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-1 truncate">{stat.value}</div>
              <div className="text-xs text-gray-500 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
