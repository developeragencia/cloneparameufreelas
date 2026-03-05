'use client'
import { useState } from 'react'

const testimonials = [
  {
    name: 'Rafael Leite',
    content: '" Muito bom site para quem busca profissionais de diversos segmentos e especialização. Depois que você faz um projeto com esse site, você se pergunta: como eu trabalhava sem esse site? Valeu muito a pena! "',
  },
  {
    name: 'Lincoln Tamashiro',
    content: '" Dentre as plataformas de freelas, a 99 foi a que tem a maior base de respostas entre propostas de freelas. O nível da base de dados de profissionais disponíveis é muito acima do esperado. Sobre a plataforma, é necessário apenas alguns ajustes de respostas nas informações. Mas a plataforma é limpa e objetiva. Parabéns ao 99Freelas. "',
  },
]

export default function TestimonialsSection() {
  const [page, setPage] = useState(0)

  return (
    <section className="py-20 bg-[#00aeef]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          O que nossos clientes estão dizendo
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-8 text-white">
              <p className="text-base leading-relaxed mb-6 italic">{t.content}</p>
              <div className="bg-[#0099d4] rounded-md px-4 py-2 inline-block">
                <span className="text-white font-semibold">- {t.name}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2">
          {testimonials.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setPage(i)} 
              className={`w-3 h-3 rounded-full transition-all ${i === page ? 'bg-white w-8' : 'bg-white bg-opacity-50'}`}
              aria-label={`Ver depoimento ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
