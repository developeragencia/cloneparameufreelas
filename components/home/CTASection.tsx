import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-20 bg-white text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
          Está pronto para encontrar o freelancer ideal para o seu projeto?
        </h2>
        <Link
          href="/publicar-projeto"
          className="inline-block bg-[#00aeef] hover:bg-[#0099d4] text-white font-bold px-12 py-4 rounded-md text-lg transition-all shadow-lg hover:shadow-xl"
        >
          Anuncie uma vaga agora!
        </Link>
      </div>
    </section>
  )
}
