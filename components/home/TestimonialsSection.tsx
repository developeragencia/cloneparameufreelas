'use client'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Rafael Leite',
    content: '" Muito bom site para quem busca profissionais de diversos segmentos e especialização. Depois que você faz um projeto com esse site, você se pergunta: como eu trabalhava sem esse site? Valeu muito a pena! "',
  },
  {
    name: 'Lincoln Tamashiro',
    content: '" Dentre as plataformas de freelas, a 99 foi a que tem a maior base de respostas entre propostas de freelas. O nível da base de dados de profissionais disponíveis é muito acima do esperado. Sobre a plataforma, é necessário apenas alguns ajustes de respostas nas informações. Mas a plataforma é limpa e objetiva. Parabéns ao MeuFreelas. "',
  },
  {
    name: 'Mariana Santos',
    content: '" Plataforma excelente! Consegui meus melhores clientes por aqui. O sistema de pagamento seguro dá total confiança para trabalhar. Recomendo para todos os freelancers! "',
  },
  {
    name: 'Carlos Mendes',
    content: '" Encontrei excelentes freelancers para minha empresa. O processo é simples e rápido. Recomendo muito para quem precisa de profissionais qualificados! "',
  },
]

export default function TestimonialsSection() {
  const [page, setPage] = useState(0)
  const perPage = 2
  const totalPages = Math.ceil(testimonials.length / perPage)
  const visible = testimonials.slice(page * perPage, page * perPage + perPage)

  return (
    <section className="py-16 bg-[#00aeef]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-10">
          O que nossos clientes estão dizendo
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {visible.map((t, i) => (
            <div key={i} className="bg-white bg-opacity-20 rounded-lg p-6 text-white">
              <p className="text-sm leading-relaxed mb-4 italic">{t.content}</p>
              <div className="bg-[#0099d4] rounded px-3 py-1 inline-block">
                <span className="text-white font-semibold text-sm">- {t.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex items-center justify-center gap-3">
          <button onClick={() => setPage((p) => Math.max(0, p - 1))} className="text-white hover:text-gray-200 disabled:opacity-40" disabled={page === 0}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} onClick={() => setPage(i)} className={`w-3 h-3 rounded-full transition-colors ${i === page ? 'bg-white' : 'bg-white bg-opacity-50'}`} />
          ))}
          <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} className="text-white hover:text-gray-200 disabled:opacity-40" disabled={page === totalPages - 1}>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
