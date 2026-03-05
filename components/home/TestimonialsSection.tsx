const testimonials = [
  {
    name: 'Ana Costa',
    role: 'CEO, StartupBR',
    avatar: 'A',
    color: '#1A56DB',
    rating: 5,
    text: 'Contratei um desenvolvedor em menos de 24h. O processo é incrivelmente ágil e o profissional entregou tudo acima do esperado. Recomendo muito!',
  },
  {
    name: 'Carlos Mendes',
    role: 'Desenvolvedor Freelancer',
    avatar: 'C',
    color: '#0D9488',
    rating: 5,
    text: 'Em 3 meses faturei mais de R$18k pela plataforma. A qualidade dos projetos e clientes é excelente. Minha renda duplicou desde que me cadastrei.',
  },
  {
    name: 'Marina Oliveira',
    role: 'Diretora de TI, AgTech',
    avatar: 'M',
    color: '#9333EA',
    rating: 5,
    text: 'Nossa empresa usa o MeuFreelas há 2 anos. Sempre encontramos profissionais de alto nível para nossos projetos. Plataforma séria e confiável.',
  },
  {
    name: 'Rafael Souza',
    role: 'Designer UI/UX Freelancer',
    avatar: 'R',
    color: '#EA580C',
    rating: 5,
    text: 'Nunca tive dificuldades em encontrar projetos interessantes. A plataforma é profissional, intuitiva e o suporte sempre ágil quando precisei.',
  },
  {
    name: 'Juliana Pereira',
    role: 'Empreendedora, E-commerce',
    avatar: 'J',
    color: '#BE185D',
    rating: 5,
    text: 'Encontrei uma redatora incrível em menos de 1 hora. As propostas foram rápidas e detalhadas. O sistema de avaliações me ajudou muito a escolher.',
  },
  {
    name: 'Thiago Lima',
    role: 'Motion Designer',
    avatar: 'T',
    color: '#1D4ED8',
    rating: 5,
    text: 'Como freelancer, o MeuFreelas mudou minha carreira. Consigo projetos constantes, clientes serios e o pagamento sempre seguro e pontual.',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">O que dizem nossos usuários</h2>
          <p className="text-gray-500 text-sm">Milhares de profissionais e empresas já confiam no MeuFreelas</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < t.rating ? 'text-yellow-400' : 'text-gray-200'} fill-current`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ background: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
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
