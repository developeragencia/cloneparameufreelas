import Link from 'next/link'

export default function StatsSection() {
  return (
    <>
      {/* Freelancer strip */}
      <div style={{ background: '#00AEEF' }} className="py-2.5">
        <div className="max-w-6xl mx-auto px-4 text-center text-xs text-white">
          Você é um freelancer? Junte-se a nós!{' '}
          <Link href="/cadastro?tipo=freelancer" className="font-bold hover:underline text-white">
            Cadastre-se.
          </Link>
        </div>
      </div>

      {/* Stats row */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
            {[
              { num: '136.925', label: 'projetos concluídos' },
              { num: '3.412.049', label: 'freelancers cadastrados' },
              { num: 'R$ 26.456.081,44', label: 'pago aos freelancers' },
            ].map(stat => (
              <div key={stat.label} className="text-center py-3 sm:py-0">
                <div className="text-2xl sm:text-3xl font-bold text-gray-800">{stat.num}</div>
                <div className="text-xs mt-1 font-medium" style={{ color: '#00AEEF' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
