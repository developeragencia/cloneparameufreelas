import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Star, MapPin, Clock, Briefcase, MessageSquare, CheckCircle } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface Props { params: { slug: string } }

export default async function FreelancerProfilePage({ params }: Props) {
  const user = await prisma.user.findFirst({
    where: { OR: [{ id: params.slug }, { name: { contains: params.slug.replace(/-/g, ' ') } }], role: 'FREELANCER', isActive: true },
    include: {
      freelancerProfile: { include: { skills: { include: { skill: true } }, portfolio: true } },
      reviewsReceived: { include: { giver: { select: { name: true } } }, orderBy: { createdAt: 'desc' }, take: 5 },
      _count: { select: { proposals: true } },
    },
  })

  if (!user) notFound()

  const portfolio: any[] = user.freelancerProfile?.portfolio ?? []

  const skills: string[] = (user.freelancerProfile?.skills ?? []).map((s: any) => s.skill?.name).filter(Boolean)

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00aeef] to-[#0077a8] flex items-center justify-center text-white text-4xl font-black mx-auto mb-4">
                {user.image ? <img src={user.image} alt={user.name} className="w-full h-full rounded-full object-cover" /> : user.name.charAt(0).toUpperCase()}
              </div>
              <h1 className="text-xl font-black text-gray-800">{user.name}</h1>
              {user.freelancerProfile?.headline && <p className="text-sm text-[#00aeef] font-medium mt-1">{user.freelancerProfile.headline}</p>}
              {user.isVerified && (
                <div className="flex items-center justify-center gap-1 mt-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-xs font-medium">Perfil Verificado</span>
                </div>
              )}
              <div className="flex items-center justify-center gap-1 mt-3">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className={`w-4 h-4 ${i <= Math.round(Number(user.rating)) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
                ))}
                <span className="text-sm text-gray-600 ml-1">{Number(user.rating).toFixed(1)} ({user.reviewCount})</span>
              </div>
              {user.city && (
                <div className="flex items-center justify-center gap-1 mt-2 text-gray-400 text-sm">
                  <MapPin className="w-3 h-3" />
                  <span>{user.city}{user.state ? `, ${user.state}` : ''}</span>
                </div>
              )}
              <Link href={`/mensagens?with=${user.id}`} className="mt-5 w-full flex items-center justify-center gap-2 bg-[#00aeef] hover:bg-[#0099d4] text-white py-2.5 rounded-lg font-semibold text-sm transition-colors">
                <MessageSquare className="w-4 h-4" /> Enviar Mensagem
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5">
              <h3 className="font-bold text-gray-800 mb-3">Informações</h3>
              <div className="space-y-2 text-sm">
                {user.freelancerProfile?.hourlyRate && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Valor/hora</span>
                    <span className="font-semibold text-gray-800">{formatCurrency(Number(user.freelancerProfile.hourlyRate))}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">Projetos</span>
                  <span className="font-semibold text-gray-800">{user._count.proposals}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Avaliações</span>
                  <span className="font-semibold text-gray-800">{user.reviewCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Na plataforma</span>
                  <span className="font-semibold text-gray-800">
                    {Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24 * 30))} meses
                  </span>
                </div>
              </div>
            </div>

            {skills.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="font-bold text-gray-800 mb-3">Habilidades</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill: string) => (
                    <span key={skill} className="text-xs bg-blue-50 text-[#00aeef] px-2.5 py-1 rounded-full font-medium">{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main content */}
          <div className="lg:col-span-2 space-y-5">
            {user.bio && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="font-bold text-gray-800 mb-3">Sobre</h2>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{user.bio}</p>
              </div>
            )}

            {typeof user.freelancerProfile?.experienceYears === 'number' && user.freelancerProfile.experienceYears > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="font-bold text-gray-800 mb-3">Experiência</h2>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {user.freelancerProfile.experienceYears} ano(s) de experiência
                </p>
              </div>
            )}

            {user.freelancerProfile?.educationLevel && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="font-bold text-gray-800 mb-3">Formação</h2>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{user.freelancerProfile.educationLevel}</p>
              </div>
            )}

            {portfolio.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="font-bold text-gray-800 mb-4">Portfólio</h2>
                <div className="grid grid-cols-2 gap-4">
                  {portfolio.map((item: any) => (
                    <div key={item.id} className="rounded-lg overflow-hidden border">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.title} className="w-full h-32 object-cover" />
                      ) : (
                        <div className="w-full h-32 bg-gradient-to-br from-[#00aeef] to-[#0077a8] flex items-center justify-center">
                          <span className="text-white text-3xl font-black">{item.title.charAt(0)}</span>
                        </div>
                      )}
                      <div className="p-3">
                        <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                        {item.description && <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{item.description}</p>}
                        {item.projectUrl && <a href={item.projectUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[#00aeef] hover:underline mt-1 block">Ver projeto →</a>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {user.reviewsReceived.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="font-bold text-gray-800 mb-4">Avaliações</h2>
                <div className="space-y-4">
                  {user.reviewsReceived.map((review: any) => (
                    <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-[#00aeef] flex items-center justify-center text-white text-xs font-bold">
                          {review.giver.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{review.giver.name}</p>
                          <div className="flex">
                            {[1,2,3,4,5].map(i => (
                              <Star key={i} className={`w-3 h-3 ${i <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      {review.comment && <p className="text-sm text-gray-600">{review.comment}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
