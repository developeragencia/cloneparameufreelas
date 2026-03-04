export default function StatsSection() {
  const stats = [
    { value: '136.877', label: 'projetos concluídos', color: 'text-[#00aeef]' },
    { value: '3.409.198', label: 'freelancers cadastrados', color: 'text-[#00aeef]' },
    { value: 'R$ 26.456.081,44', label: 'pago aos freelancers', color: 'text-[#00aeef]' },
  ]

  return (
    <section className="bg-white border-b">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {stats.map((stat, i) => (
            <div key={i} className="py-10 text-center">
              <div className="text-4xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className={`text-sm font-medium ${stat.color}`}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
