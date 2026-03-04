import { prisma } from '@/lib/prisma'
import AdminCategoryManager from '@/components/admin/AdminCategoryManager'

export default async function AdminCategoriasPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { projects: true } } },
    orderBy: { name: 'asc' },
  })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Categorias</h1>
      <AdminCategoryManager initialCategories={categories} />
    </div>
  )
}
