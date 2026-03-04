import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function CategoriasPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { projects: true } } },
    orderBy: { name: 'asc' },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-black text-gray-800">Categorias de Serviços</h1>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Encontre freelancers especializados em todas as áreas do mercado digital</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/freelancers?categoria=${cat.slug}`}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow group border border-transparent hover:border-[#00aeef]"
            >
              <div className="text-4xl mb-3">{cat.icon ?? '📁'}</div>
              <h3 className="font-bold text-gray-800 group-hover:text-[#00aeef] transition-colors">{cat.name}</h3>
              {cat.description && <p className="text-sm text-gray-400 mt-1 line-clamp-2">{cat.description}</p>}
              <p className="text-xs text-[#00aeef] font-medium mt-3">{cat._count.projects} projeto{cat._count.projects !== 1 ? 's' : ''}</p>
            </Link>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Nenhuma categoria cadastrada ainda</p>
            <Link href="/" className="text-[#00aeef] hover:underline text-sm mt-2 inline-block">← Voltar ao início</Link>
          </div>
        )}
      </div>
    </div>
  )
}
