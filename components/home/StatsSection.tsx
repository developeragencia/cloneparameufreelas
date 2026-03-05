import Link from 'next/link'

export default function StatsSection() {
  return (
    <>
      {/* Freelancer strip */}
      <div style={{ background: '#3C3C3C' }} className="py-3">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-300">
          Você é um freelancer? Junte-se a nós!{' '}
          <Link href="/cadastro?tipo=freelancer" className="font-semibold hover:underline" style={{ color: '#00AEEF' }}>
            Cadastre-se.
          </Link>
        </div>
      </div>

      {/* Stats row */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
            {[
              { num: '136.925', label: 'projetos concluídos' },
              { num: '3.412.049', label: 'freelancers cadastrados' },
              { num: 'R$ 26.456.081,44', label: 'pago aos freelancers' },
            ].map(stat => (
              <div key={stat.label} className="text-center py-4 sm:py-0">
                <div className="text-3xl sm:text-4xl font-bold text-gray-800">{stat.num}</div>
                <div className="text-sm mt-1 font-medium" style={{ color: '#00AEEF' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
