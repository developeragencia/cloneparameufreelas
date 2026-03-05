import Link from 'next/link'

export default function StatsSection() {
  const stats = [
    { value: '136.912', label: 'projetos concluídos' },
    { value: '3.411.215', label: 'freelancers cadastrados' },
    { value: 'R$ 26.456.081,44', label: 'pago aos freelancers' },
  ]

  return (
    <section className="bg-white border-b py-2">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-center text-sm text-gray-600 mb-6">
          Você é um freelancer? <Link href="/cadastro?tipo=freelancer" className="text-[#00aeef] font-medium hover:underline">Junte-se a nós!</Link> <span className="text-[#00aeef] font-medium">Cadastre-se</span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {stats.map((stat, i) => (
            <div key={i} className="py-8 text-center">
              <div className="text-4xl font-bold text-gray-800 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
