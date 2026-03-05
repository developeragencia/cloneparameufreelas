import Link from 'next/link'

const categories = [
  { icon: '💻', title: 'Programação', sub: 'Web, Mobile, APIs', href: '/freelancers?categoria=tecnologia', count: '18.4k' },
  { icon: '🎨', title: 'Design', sub: 'UI/UX, Logos, Branding', href: '/freelancers?categoria=design', count: '12.2k' },
  { icon: '📣', title: 'Marketing', sub: 'SEO, Social, Ads', href: '/freelancers?categoria=marketing', count: '9.8k' },
  { icon: '✍️', title: 'Redação', sub: 'Conteúdo, Copywriting', href: '/freelancers?categoria=redacao', count: '7.3k' },
  { icon: '🎬', title: 'Vídeo', sub: 'Edição, Animação', href: '/freelancers?categoria=video', count: '5.6k' },
  { icon: '📊', title: 'Finanças', sub: 'Contabilidade, BI', href: '/freelancers?categoria=financas', count: '4.1k' },
  { icon: '🌎', title: 'Idiomas', sub: 'Tradução, Ensino', href: '/freelancers?categoria=idiomas', count: '3.2k' },
  { icon: '🤝', title: 'Consultoria', sub: 'Gestão, Estratégia', href: '/freelancers?categoria=consultoria', count: '2.9k' },
  { icon: '📷', title: 'Fotografia', sub: 'Produto, Retrato', href: '/freelancers?categoria=fotografia', count: '2.4k' },
  { icon: '🎵', title: 'Música', sub: 'Produção, Locução', href: '/freelancers?categoria=musica', count: '1.8k' },
]

export default function CategoriesSection() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Navegue por categoria</h2>
            <p className="text-gray-500 text-sm mt-1">Encontre o especialista certo para cada necessidade</p>
          </div>
          <Link href="/categorias" className="hidden sm:inline-flex text-[#1A56DB] text-sm font-semibold hover:underline">
            Ver todas →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group flex flex-col items-center text-center p-5 rounded-xl border border-gray-200 hover:border-[#1A56DB] hover:shadow-md transition-all duration-150 bg-white"
            >
              <span className="text-3xl mb-3">{cat.icon}</span>
              <h3 className="font-semibold text-gray-800 text-sm leading-tight mb-1 group-hover:text-[#1A56DB] transition-colors">{cat.title}</h3>
              <p className="text-[11px] text-gray-400 leading-tight mb-1">{cat.sub}</p>
              <span className="text-[11px] font-medium text-[#1A56DB]">{cat.count} freelas</span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-6 sm:hidden">
          <Link href="/categorias" className="text-[#1A56DB] text-sm font-semibold hover:underline">
            Ver todas as categorias →
          </Link>
        </div>
      </div>
    </section>
  )
}
