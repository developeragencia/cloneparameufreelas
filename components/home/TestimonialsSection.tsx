'use client'
import { useState } from 'react'

const pages = [
  [
    {
      text: '" Muito bom site para quem busca profissionais de diversos segmentos e especialização. Depois que você faz um projeto com esse site, você se pergunta: como eu trabalhava sem esse site? Valeu muito a pena! "',
      name: 'Rafael Leite',
    },
    {
      text: '" Dentre as plataformas de freelas, a 99 foi a que tem a maior base de respostas entre propostas de freelas. O nível da base de dados de profissionais disponíveis é muito acima do esperado. Sobre a plataforma, é necessário apenas alguns ajustes de respostas nas informações. Mas a plataforma é limpa e objetiva. Parabéns ao MeuFreelas. "',
      name: 'Lincoln Tamashiro',
    },
  ],
  [
    {
      text: '" Plataforma excelente! Encontrei freelancers qualificados rapidamente e o processo foi simples e seguro. Recomendo para qualquer empresa que precise de serviços especializados. "',
      name: 'Marina Costa',
    },
    {
      text: '" Como freelancer, o MeuFreelas abriu muitas portas para mim. Os projetos são de qualidade e o sistema de pagamento é totalmente seguro e confiável. "',
      name: 'Carlos Andrade',
    },
  ],
]

export default function TestimonialsSection() {
  const [page, setPage] = useState(0)

  return (
    <section className="py-10 md:py-14" style={{ background: '#00AEEF' }}>
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-8">
          O que nossos clientes estão dizendo
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {pages[page].map((t) => (
            <div key={t.name} className="p-5 rounded" style={{ background: 'rgba(0,0,0,0.15)' }}>
              <p className="text-white text-xs leading-relaxed mb-3">{t.text}</p>
              <p className="text-white font-semibold text-xs">- {t.name}</p>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className="w-3 h-3 rounded-full transition-all"
              style={{ background: i === page ? 'white' : 'rgba(255,255,255,0.4)' }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
