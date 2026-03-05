import Link from 'next/link'

const posts = [
  {
    title: 'Como contratar um freelancer de qualidade',
    excerpt: 'Dicas para encontrar e contratar os melhores profissionais freelancers para o seu projeto.',
    category: 'Empresas',
    date: '01 Mar 2026',
    slug: 'como-contratar-freelancer',
  },
  {
    title: 'Como se destacar como freelancer em 2026',
    excerpt: 'Estratégias para aumentar sua visibilidade e conquistar mais clientes na plataforma.',
    category: 'Freelancers',
    date: '25 Fev 2026',
    slug: 'destaque-como-freelancer-2026',
  },
  {
    title: 'Precificação: como cobrar pelo seu trabalho freelancer',
    excerpt: 'Aprenda a definir valores justos para seus serviços e nunca trabalhar abaixo do mercado.',
    category: 'Dicas',
    date: '18 Fev 2026',
    slug: 'precificacao-freelancer',
  },
  {
    title: 'Pagamento seguro: como funciona no MeuFreelas',
    excerpt: 'Entenda o sistema de pagamento seguro e como ele protege tanto clientes quanto freelancers.',
    category: 'Plataforma',
    date: '10 Fev 2026',
    slug: 'pagamento-seguro-meufreelas',
  },
  {
    title: 'Portfólio profissional: o guia completo',
    excerpt: 'Tudo que você precisa saber para criar um portfólio que conquista clientes.',
    category: 'Freelancers',
    date: '02 Fev 2026',
    slug: 'portfolio-profissional-guia',
  },
  {
    title: 'Como escrever um briefing de projeto eficiente',
    excerpt: 'Um bom briefing é a chave para receber propostas qualificadas dos melhores freelancers.',
    category: 'Empresas',
    date: '25 Jan 2026',
    slug: 'briefing-projeto-eficiente',
  },
]

const categoryColors: Record<string, string> = {
  Empresas: 'bg-blue-100 text-blue-700',
  Freelancers: 'bg-green-100 text-green-700',
  Dicas: 'bg-yellow-100 text-yellow-700',
  Plataforma: 'bg-purple-100 text-purple-700',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#2d3e50] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Blog MeuFreelas</h1>
          <p className="text-gray-300 text-lg">Dicas, novidades e conteúdo para freelancers e empresas</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-40 bg-gradient-to-br from-[#00aeef] to-[#2d3e50]" />
              <div className="p-6">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryColors[post.category]}`}>
                  {post.category}
                </span>
                <h2 className="text-lg font-bold text-gray-800 mt-3 mb-2 leading-snug">{post.title}</h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{post.date}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-[#00aeef] text-sm font-semibold hover:underline"
                  >
                    Ler mais →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
