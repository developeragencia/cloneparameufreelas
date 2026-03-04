import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-16 bg-white text-center">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          Está pronto para encontrar o freelancer ideal para o seu projeto?
        </h2>
        <Link
          href="/publicar-projeto"
          className="inline-block bg-[#00aeef] hover:bg-[#0099d4] text-white font-bold px-10 py-4 rounded text-lg transition-colors shadow-md"
        >
          Anuncie uma vaga agora!
        </Link>
      </div>
    </section>
  )
}
