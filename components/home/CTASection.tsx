import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-8">
          Está pronto para encontrar o freelancer ideal para o seu projeto?
        </h2>
        <Link
          href="/publicar-projeto"
          className="inline-block px-10 py-3.5 text-base font-semibold text-white rounded-sm transition-colors"
          style={{ background: '#00AEEF' }}
        >
          Anuncie uma vaga agora!
        </Link>
      </div>
    </section>
  )
}
