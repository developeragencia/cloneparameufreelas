const testimonials = [
  {
    name: 'Rafael Leite',
    role: 'CEO, StartupBR',
    avatar: 'RL',
    color: 'from-indigo-500 to-purple-500',
    stars: 5,
    content: 'Plataforma incrível! Encontrei o desenvolvedor perfeito para meu projeto em menos de 24h. A qualidade dos profissionais é muito acima do esperado.',
  },
  {
    name: 'Lincoln Tamashiro',
    role: 'Designer Freelancer',
    avatar: 'LT',
    color: 'from-cyan-500 to-blue-500',
    stars: 5,
    content: 'Como freelancer, o MeuFreelas transformou minha carreira. Tenho projetos consistentes e o sistema de pagamento seguro me dá total tranquilidade.',
  },
  {
    name: 'Carla Mendes',
    role: 'Diretora de Marketing',
    avatar: 'CM',
    color: 'from-pink-500 to-rose-500',
    stars: 5,
    content: 'Usamos o MeuFreelas para toda nossa demanda criativa. Profissionais verificados, entrega no prazo e suporte excelente. Recomendo a todos!',
  },
  {
    name: 'Bruno Santos',
    role: 'Desenvolvedor Full Stack',
    avatar: 'BS',
    color: 'from-orange-500 to-amber-500',
    stars: 5,
    content: 'Melhor plataforma para freelancers do Brasil. Interface intuitiva, projetos de qualidade e pagamento sempre em dia. Só pontos positivos!',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-14 md:py-20" style={{ background: 'linear-gradient(135deg, #0D1117 0%, #1E1B4B 60%, #0D1117 100%)' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block bg-white/10 text-cyan-300 text-xs font-bold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide border border-white/10">
            Depoimentos
          </span>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2">
            Quem usa,{' '}
            <span style={{ background: 'linear-gradient(135deg, #6366F1, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              recomenda
            </span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base">Mais de 3 milhões de profissionais confiam no MeuFreelas</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="glass-card p-5 md:p-6 hover:border-indigo-400/30 transition-all">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <svg key={s} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-5">&ldquo;{t.content}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
