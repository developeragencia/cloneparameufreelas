import { prisma } from '@/lib/prisma'
import AdminUserActions from '@/components/admin/AdminUserActions'

interface Props { searchParams: { page?: string; q?: string; role?: string } }

export default async function AdminUsuariosPage({ searchParams }: Props) {
  const page = Number(searchParams.page) || 1
  const perPage = 20
  const q = searchParams.q || ''
  const role = searchParams.role || ''

  const where: any = {
    ...(q && { OR: [{ name: { contains: q } }, { email: { contains: q } }] }),
    ...(role && { role }),
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      select: { id: true, name: true, email: true, role: true, isActive: true, isVerified: true, rating: true, reviewCount: true, createdAt: true },
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.user.count({ where }),
  ])

  const pages = Math.ceil(total / perPage)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Usuários ({total})</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 flex gap-3">
        <form className="flex gap-3 flex-1">
          <input name="q" defaultValue={q} placeholder="Buscar por nome ou email..." className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]" />
          <select name="role" defaultValue={role} className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]">
            <option value="">Todos</option>
            <option value="CLIENT">Clientes</option>
            <option value="FREELANCER">Freelancers</option>
            <option value="ADMIN">Admins</option>
          </select>
          <button type="submit" className="bg-[#00aeef] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0099d4] transition-colors">Buscar</button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="px-4 py-3 text-gray-500 font-medium">Usuário</th>
                <th className="px-4 py-3 text-gray-500 font-medium">Tipo</th>
                <th className="px-4 py-3 text-gray-500 font-medium">Status</th>
                <th className="px-4 py-3 text-gray-500 font-medium">Avaliação</th>
                <th className="px-4 py-3 text-gray-500 font-medium">Cadastro</th>
                <th className="px-4 py-3 text-gray-500 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-800">{user.name}</p>
                      <p className="text-gray-400 text-xs">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      user.role === 'ADMIN' ? 'bg-red-100 text-red-700' :
                      user.role === 'CLIENT' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {user.role === 'ADMIN' ? 'Admin' : user.role === 'CLIENT' ? 'Cliente' : 'Freelancer'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {user.isActive ? 'Ativo' : 'Inativo'}
                      </span>
                      {user.isVerified && <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">Verificado</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {Number(user.rating).toFixed(1)} ({user.reviewCount})
                  </td>
                  <td className="px-4 py-3 text-gray-400">{new Date(user.createdAt).toLocaleDateString('pt-BR')}</td>
                  <td className="px-4 py-3">
                    <AdminUserActions userId={user.id} isActive={user.isActive} isVerified={user.isVerified} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pages > 1 && (
          <div className="px-4 py-3 border-t flex items-center justify-between">
            <p className="text-sm text-gray-500">Página {page} de {pages}</p>
            <div className="flex gap-2">
              {page > 1 && <a href={`?page=${page - 1}&q=${q}&role=${role}`} className="text-sm text-[#00aeef] hover:underline">Anterior</a>}
              {page < pages && <a href={`?page=${page + 1}&q=${q}&role=${role}`} className="text-sm text-[#00aeef] hover:underline">Próximo</a>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
