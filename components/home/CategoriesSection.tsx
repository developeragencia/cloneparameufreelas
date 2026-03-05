import Link from 'next/link'

const categories = [
  { title: 'Desenhar o seu', bold: 'website', slug: 'design-web', color: '#5DADE2', bg: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&q=70' },
  { title: 'Escrever o seu', bold: 'conteúdo', slug: 'redacao-conteudo', color: '#C39BD3', bg: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=70' },
  { title: 'Desenvolver o seu', bold: 'código', slug: 'desenvolvimento', color: '#EC7063', bg: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=70' },
  { title: 'Melhorar o seu', bold: 'SEO', slug: 'seo-marketing', color: '#F8C471', bg: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&q=70' },
  { title: 'Desenhar o seu', bold: 'logotipo', slug: 'design-logo', color: '#58D68D', bg: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=400&q=70' },
  { title: 'Criar o seu', bold: 'vídeo', slug: 'video-animacao', color: '#5DADE2', bg: 'https://images.unsplash.com/photo-1536240478700-b869ad10e2b7?w=400&q=70' },
]

export default function CategoriesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
          Encontre freelancers talentosos para...
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/freelancers?categoria=${cat.slug}`}
              className="relative overflow-hidden rounded-lg group block shadow-md hover:shadow-xl transition-shadow"
            >
              <div
                className="h-52 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${cat.bg})` }}
              />
              <div
                className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4"
                style={{ backgroundColor: `${cat.color}dd` }}
              >
                <p className="text-lg font-normal mb-1">{cat.title}</p>
                <p className="text-3xl font-bold">{cat.bold}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/categorias"
            className="inline-block border-2 border-gray-400 text-gray-700 hover:border-[#00aeef] hover:text-[#00aeef] px-8 py-3 rounded transition-colors font-semibold"
          >
            Ver todas categorias
          </Link>
        </div>
      </div>
    </section>
  )
}
