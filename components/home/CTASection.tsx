import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-6">
          Está pronto para encontrar o freelancer ideal para o seu projeto?
        </h2>
        <Link
          href="/publicar-projeto"
          className="inline-block px-8 py-3 text-sm font-semibold text-white rounded transition-colors"
          style={{ background: '#00AEEF' }}
        >
          Anuncie uma vaga agora!
        </Link>
      </div>
    </section>
  )
}
