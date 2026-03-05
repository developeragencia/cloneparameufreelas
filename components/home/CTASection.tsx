import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-14 md:py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #F97316 0%, #EF4444 50%, #EC4899 100%)' }}>
      {/* Decorative circles */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/10" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-white/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/5" />

      <div className="relative max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="text-center md:text-left">
            <span className="inline-block bg-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
              Comece Agora — É Grátis
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-3">
              Pronto para decolar<br />o seu projeto?
            </h2>
            <p className="text-white/80 text-sm md:text-base max-w-md">
              Publique sua vaga agora e receba propostas de freelancers qualificados em minutos. Sem mensalidade, sem complication.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0">
            <Link
              href="/publicar-projeto"
              className="flex items-center justify-center gap-2 bg-white text-orange-600 font-extrabold px-8 py-4 rounded-2xl text-sm md:text-base transition-all shadow-2xl hover:-translate-y-1 hover:shadow-white/30 whitespace-nowrap"
            >
              Publicar Projeto Agora →
            </Link>
            <Link
              href="/cadastro?tipo=freelancer"
              className="flex items-center justify-center gap-2 bg-white/10 border-2 border-white/40 text-white font-bold px-8 py-4 rounded-2xl text-sm md:text-base transition-all hover:bg-white/20 whitespace-nowrap"
            >
              Sou Freelancer
            </Link>
          </div>
        </div>

        {/* Bottom trust line */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-8 border-t border-white/20">
          {['Cadastro 100% grátis', 'Sem mensalidade', 'Pagamento seguro', '+3.4M freelancers'].map((item) => (
            <div key={item} className="flex items-center gap-2 text-white/80 text-xs font-medium">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
