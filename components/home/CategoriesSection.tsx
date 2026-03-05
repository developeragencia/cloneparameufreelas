import Link from 'next/link'

const categories = [
  {
    icon: '💻',
    title: 'Desenvolvimento',
    sub: 'Web, Mobile, APIs',
    slug: 'desenvolvimento',
    gradient: 'from-indigo-500 to-purple-600',
    light: 'bg-indigo-50 text-indigo-600',
  },
  {
    icon: '🎨',
    title: 'Design',
    sub: 'UI/UX, Logos, Branding',
    slug: 'design-web',
    gradient: 'from-pink-500 to-rose-500',
    light: 'bg-pink-50 text-pink-600',
  },
  {
    icon: '✍️',
    title: 'Conteúdo',
    sub: 'Textos, Blog, Copywriting',
    slug: 'redacao-conteudo',
    gradient: 'from-emerald-500 to-teal-500',
    light: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: '📈',
    title: 'Marketing',
    sub: 'SEO, Ads, Redes Sociais',
    slug: 'seo-marketing',
    gradient: 'from-orange-500 to-amber-500',
    light: 'bg-orange-50 text-orange-600',
  },
  {
    icon: '🎥',
    title: 'Vídeo & Áudio',
    sub: 'Edição, Animação, Podcast',
    slug: 'video-animacao',
    gradient: 'from-cyan-500 to-blue-500',
    light: 'bg-cyan-50 text-cyan-600',
  },
  {
    icon: '📊',
    title: 'Negócios',
    sub: 'Finanças, Consultoria, RH',
    slug: 'negocios',
    gradient: 'from-violet-500 to-indigo-500',
    light: 'bg-violet-50 text-violet-600',
  },
]

export default function CategoriesSection() {
  return (
    <section className="py-12 md:py-16 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="section-title">Explore por categoria</h2>
          <p className="section-subtitle">Encontre o especialista certo para cada tipo de projeto</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/freelancers?categoria=${cat.slug}`}
              className="group bg-white rounded-2xl p-4 md:p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${cat.gradient} text-2xl md:text-3xl mb-3 shadow-lg`}>
                {cat.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-sm md:text-base mb-0.5 group-hover:text-indigo-600 transition-colors">{cat.title}</h3>
              <p className="text-xs text-gray-500 leading-snug hidden sm:block">{cat.sub}</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/categorias"
            className="inline-flex items-center gap-2 border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 px-6 py-2.5 rounded-xl transition-all font-semibold text-sm"
          >
            Ver todas as categorias →
          </Link>
        </div>
      </div>
    </section>
  )
}
