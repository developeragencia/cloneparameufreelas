import Link from 'next/link'

const categories = [
  {
    label: 'Desenhar o seu',
    bold: 'website',
    href: '/freelancers?categoria=design',
    color: 'rgba(0,174,239,0.75)',
    img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=70',
  },
  {
    label: 'Escrever o seu',
    bold: 'conteúdo',
    href: '/freelancers?categoria=redacao',
    color: 'rgba(180,0,180,0.65)',
    img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=70',
  },
  {
    label: 'Desenvolver o seu',
    bold: 'código',
    href: '/freelancers?categoria=tecnologia',
    color: 'rgba(200,50,50,0.70)',
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=70',
  },
  {
    label: 'Melhorar o seu',
    bold: 'SEO',
    href: '/freelancers?categoria=marketing',
    color: 'rgba(200,160,0,0.72)',
    img: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=600&q=70',
  },
  {
    label: 'Desenhar o seu',
    bold: 'logotipo',
    href: '/freelancers?categoria=design',
    color: 'rgba(0,150,70,0.72)',
    img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=70',
  },
  {
    label: 'Criar o seu',
    bold: 'vídeo',
    href: '/freelancers?categoria=video',
    color: 'rgba(0,150,180,0.72)',
    img: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=70',
  },
]

export default function CategoriesSection() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-8">
          Encontre freelancers talentosos para...
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.bold}
              href={cat.href}
              className="relative group block overflow-hidden"
              style={{ height: '160px' }}
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url(${cat.img})` }}
              />
              {/* Color overlay */}
              <div className="absolute inset-0" style={{ background: cat.color }} />
              {/* Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                <span className="text-base font-normal drop-shadow">{cat.label}</span>
                <span className="text-xl font-bold drop-shadow">{cat.bold}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/categorias"
            className="inline-block border border-gray-400 text-gray-600 hover:border-gray-600 hover:text-gray-800 text-sm font-medium px-8 py-2.5 transition-colors"
          >
            Ver todas categorias
          </Link>
        </div>
      </div>
    </section>
  )
}
