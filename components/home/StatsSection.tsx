import Link from 'next/link'

export default function StatsSection() {
  return (
    <section className="bg-[#F0F6FF] border-b border-blue-100">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <p className="text-gray-600 text-center sm:text-left">
            <span className="font-semibold text-gray-800">Você é freelancer?</span>{' '}
            Cadastre-se gratuitamente e comece a receber projetos hoje mesmo.
          </p>
          <Link
            href="/cadastro?tipo=freelancer"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#1A56DB] hover:bg-[#1446BF] text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
          >
            Cadastrar como freelancer →
          </Link>
        </div>
      </div>
    </section>
  )
}
