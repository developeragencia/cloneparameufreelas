import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const allCategories = [
  { name: 'Design & Arte', slug: 'design', count: 1245, color: '#00AEEF' },
  { name: 'Desenvolvimento Web', slug: 'desenvolvimento-web', count: 2134, color: '#F97316' },
  { name: 'Marketing Digital', slug: 'marketing', count: 987, color: '#10B981' },
  { name: 'Redação & Tradução', slug: 'redacao', count: 756, color: '#8B5CF6' },
  { name: 'Vídeo & Animação', slug: 'video', count: 543, color: '#EC4899' },
  { name: 'Música & Áudio', slug: 'audio', count: 321, color: '#F59E0B' },
  { name: 'Programação', slug: 'programacao', count: 1876, color: '#3B82F6' },
  { name: 'Negócios', slug: 'negocios', count: 654, color: '#6366F1' },
  { name: 'Dados & IA', slug: 'dados', count: 432, color: '#14B8A6' },
  { name: 'Fotografia', slug: 'fotografia', count: 298, color: '#EF4444' },
  { name: 'Consultoria', slug: 'consultoria', count: 567, color: '#06B6D4' },
  { name: 'Arquitetura', slug: 'arquitetura', count: 234, color: '#84CC16' },
]

export default function CategoriasPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium mb-6 hover:underline" style={{ color: '#00AEEF' }}>
          <ArrowLeft className="w-4 h-4" /> Voltar para home
        </Link>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">Todas as Categorias</h1>
        <p className="text-gray-600 mb-8">Explore freelancers talentosos em todas as áreas</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/freelancers?categoria=${cat.slug}`}
              className="bg-white p-5 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: cat.color }}>
                  <span className="text-white font-bold text-lg">{cat.name.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-sm">{cat.name}</h3>
                  <p className="text-xs text-gray-500">{cat.count.toLocaleString('pt-BR')} freelancers</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
