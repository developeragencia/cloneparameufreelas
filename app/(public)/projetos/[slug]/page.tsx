import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { formatCurrency, formatDate, getStatusLabel, getStatusColor } from '@/lib/utils'
import { Clock, DollarSign, MapPin, Calendar, Users, Star, ExternalLink } from 'lucide-react'
import ProposalForm from '@/components/projects/ProposalForm'
import type { Metadata } from 'next'

interface PageProps { params: { slug: string } }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await prisma.project.findUnique({ where: { slug: params.slug }, select: { title: true, description: true } })
  if (!project) return { title: 'Projeto não encontrado' }
  return { title: project.title, description: project.description.slice(0, 160) }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
    include: {
      client: { include: { clientProfile: true } },
      category: true,
      skills: { include: { skill: true } },
      reviews: { include: { giver: { select: { name: true, image: true } } }, take: 5 },
    },
  })

  if (!project) notFound()

  await prisma.project.update({ where: { id: project.id }, data: { viewCount: { increment: 1 } } })

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {project.isFeatured && <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-medium">Destaque</span>}
                    {project.isUrgent && <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full font-medium">Urgente</span>}
                    {project.category && <span className="bg-blue-50 text-[#00aeef] text-xs px-2 py-0.5 rounded-full">{project.category.name}</span>}
                    <span className={`badge-status ${getStatusColor(project.status)}`}>{getStatusLabel(project.status)}</span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800">{project.title}</h1>
                </div>
              </div>

              <div className="prose max-w-none text-gray-700 text-sm leading-relaxed mb-6 whitespace-pre-wrap">
                {project.description}
              </div>

              <div className="flex flex-wrap gap-2">
                {project.skills.map((ps) => (
                  <span key={ps.id} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                    {ps.skill.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Proposal form */}
            {project.status === 'OPEN' && <ProposalForm projectId={project.id} projectTitle={project.title} />}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Project details */}
            <div className="bg-white rounded-lg shadow-sm p-5">
              <h3 className="font-bold text-gray-800 mb-4">Detalhes do Projeto</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <DollarSign className="w-4 h-4 text-[#00aeef]" />
                  <div>
                    <p className="text-gray-500 text-xs">Orçamento</p>
                    <p className="font-semibold text-gray-800">
                      {formatCurrency(Number(project.budgetMin))}
                      {Number(project.budgetMin) !== Number(project.budgetMax) && ` - ${formatCurrency(Number(project.budgetMax))}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users className="w-4 h-4 text-[#00aeef]" />
                  <div>
                    <p className="text-gray-500 text-xs">Propostas</p>
                    <p className="font-semibold text-gray-800">{project.proposalCount} proposta{project.proposalCount !== 1 ? 's' : ''}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-[#00aeef]" />
                  <div>
                    <p className="text-gray-500 text-xs">Publicado em</p>
                    <p className="font-semibold text-gray-800">{formatDate(project.createdAt)}</p>
                  </div>
                </div>
                {project.deadline && (
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-[#00aeef]" />
                    <div>
                      <p className="text-gray-500 text-xs">Prazo</p>
                      <p className="font-semibold text-gray-800">{formatDate(project.deadline)}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-[#00aeef]" />
                  <div>
                    <p className="text-gray-500 text-xs">Localização</p>
                    <p className="font-semibold text-gray-800">{project.remote ? 'Remoto' : project.location || 'A combinar'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Client card */}
            <div className="bg-white rounded-lg shadow-sm p-5">
              <h3 className="font-bold text-gray-800 mb-4">Sobre o Cliente</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-[#00aeef] flex items-center justify-center text-white font-bold text-lg">
                  {project.client.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{project.client.name}</p>
                  {project.client.clientProfile?.companyName && (
                    <p className="text-sm text-gray-500">{project.client.clientProfile.companyName}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>{project.client.rating.toFixed(1)} ({project.client.reviewCount} avaliações)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
