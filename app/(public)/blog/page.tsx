import Link from 'next/link'
import { ArrowLeft, Calendar, User } from 'lucide-react'

const blogPosts = [
  {
    id: 1,
    title: 'Como escolher o freelancer ideal para seu projeto',
    excerpt: 'Dicas essenciais para contratar o profissional perfeito e garantir o sucesso do seu projeto.',
    author: 'Equipe MeuFreelas',
    date: '15 de Fevereiro, 2024',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
  },
  {
    id: 2,
    title: '10 habilidades mais procuradas em 2024',
    excerpt: 'Descubra quais são as competências que estão em alta no mercado freelancer este ano.',
    author: 'Equipe MeuFreelas',
    date: '10 de Fevereiro, 2024',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
  },
  {
    id: 3,
    title: 'Guia completo: Como precificar seus serviços',
    excerpt: 'Aprenda a calcular o valor justo do seu trabalho e aumentar seus ganhos como freelancer.',
    author: 'Equipe MeuFreelas',
    date: '5 de Fevereiro, 2024',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium mb-6 hover:underline" style={{ color: '#00AEEF' }}>
          <ArrowLeft className="w-4 h-4" /> Voltar para home
        </Link>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">Blog MeuFreelas</h1>
        <p className="text-gray-600 mb-8">Dicas, tutoriais e novidades sobre o mundo freelancer</p>

        <div className="space-y-6">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img src={post.image} alt={post.title} className="w-full h-48 md:h-full object-cover" />
                </div>
                <div className="p-6 md:w-2/3">
                  <h2 className="text-xl font-bold text-gray-800 mb-2 hover:text-[#00AEEF] transition-colors">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" /> {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {post.date}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-500 text-sm">Mais artigos em breve...</p>
        </div>
      </div>
    </div>
  )
}
