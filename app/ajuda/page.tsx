'use client'
import { useState } from 'react'
import { ChevronDown, ChevronUp, Search, MessageSquare, Mail, Phone } from 'lucide-react'

const faqs = [
  { category: 'Geral', q: 'O que é o meufreelas?', a: 'O meufreelas é uma plataforma online que conecta clientes com freelancers qualificados de todo o Brasil. Clientes publicam projetos e freelancers enviam propostas.' },
  { category: 'Geral', q: 'Como funciona a plataforma?', a: '1. Cliente publica um projeto descrevendo o que precisa. 2. Freelancers enviam propostas com seus valores e prazos. 3. Cliente escolhe o melhor freelancer. 4. O pagamento fica retido na plataforma. 5. Após conclusão, o pagamento é liberado ao freelancer.' },
  { category: 'Clientes', q: 'Quanto custa publicar um projeto?', a: 'Publicar projetos é totalmente gratuito. Você só paga quando contratar um freelancer e o projeto for concluído com sucesso.' },
  { category: 'Clientes', q: 'Como escolho o freelancer certo?', a: 'Analise o perfil, portfólio, avaliações de outros clientes e a proposta apresentada. Você também pode conversar com os candidatos antes de decidir.' },
  { category: 'Clientes', q: 'O que acontece se o freelancer não entregar o projeto?', a: 'Se o freelancer não entregar conforme acordado, você pode abrir uma disputa. Nossa equipe analisará o caso e, se necessário, o reembolso será realizado.' },
  { category: 'Freelancers', q: 'Como me cadastro como freelancer?', a: 'Crie uma conta gratuita, selecione "Freelancer" no cadastro, complete seu perfil com experiências e habilidades, e comece a enviar propostas para projetos.' },
  { category: 'Freelancers', q: 'Qual taxa a plataforma cobra?', a: 'A meufreelas cobra uma taxa de 15% sobre o valor de cada projeto concluído. Esta taxa cobre o processamento do pagamento e a garantia da transação.' },
  { category: 'Freelancers', q: 'Quando recebo o pagamento?', a: 'Após a conclusão e aprovação do projeto pelo cliente, o pagamento é liberado em até 5 dias úteis para sua conta bancária ou carteira digital.' },
  { category: 'Pagamentos', q: 'Quais formas de pagamento são aceitas?', a: 'Aceitamos cartão de crédito, boleto bancário e PIX. Os pagamentos são processados de forma segura e mantidos em custódia até a conclusão do projeto.' },
  { category: 'Pagamentos', q: 'O sistema de pagamento é seguro?', a: 'Sim! Utilizamos criptografia SSL e os pagamentos ficam em custódia segura até que ambas as partes confirmem a conclusão do projeto.' },
]

const categories = ['Todos', 'Geral', 'Clientes', 'Freelancers', 'Pagamentos']

export default function AjudaPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const filtered = faqs.filter(f => {
    const matchCat = activeCategory === 'Todos' || f.category === activeCategory
    const matchSearch = !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#00aeef] to-[#0077a8] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl font-black mb-3">Central de Ajuda</h1>
          <p className="text-blue-100 mb-8">Encontre respostas para suas dúvidas ou fale com nosso suporte</p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar resposta..." className="w-full pl-12 pr-4 py-3.5 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 shadow-lg" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === cat ? 'bg-[#00aeef] text-white' : 'bg-white text-gray-600 hover:border-[#00aeef] hover:text-[#00aeef] border border-gray-200'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ */}
        <div className="space-y-3 mb-12">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <p>Nenhuma resposta encontrada para sua busca.</p>
            </div>
          ) : filtered.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors">
                <div>
                  <span className="text-xs text-[#00aeef] font-semibold uppercase tracking-wide">{faq.category}</span>
                  <p className="font-semibold text-gray-800 mt-0.5">{faq.q}</p>
                </div>
                {openIndex === idx ? <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />}
              </button>
              {openIndex === idx && (
                <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t">
                  <p className="pt-4">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">Ainda precisa de ajuda?</h2>
          <p className="text-gray-500 text-sm text-center mb-6">Nossa equipe de suporte está pronta para ajudar</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="mailto:suporte@meufreelas.com.br" className="flex flex-col items-center p-4 rounded-xl border hover:border-[#00aeef] hover:bg-blue-50 transition-all group">
              <Mail className="w-8 h-8 text-[#00aeef] mb-2" />
              <span className="font-semibold text-gray-800 text-sm">E-mail</span>
              <span className="text-xs text-gray-400 mt-1">suporte@meufreelas.com.br</span>
            </a>
            <a href="#" className="flex flex-col items-center p-4 rounded-xl border hover:border-[#00aeef] hover:bg-blue-50 transition-all group">
              <MessageSquare className="w-8 h-8 text-[#00aeef] mb-2" />
              <span className="font-semibold text-gray-800 text-sm">Chat ao Vivo</span>
              <span className="text-xs text-gray-400 mt-1">Seg-Sex, 9h às 18h</span>
            </a>
            <a href="tel:+551132003200" className="flex flex-col items-center p-4 rounded-xl border hover:border-[#00aeef] hover:bg-blue-50 transition-all group">
              <Phone className="w-8 h-8 text-[#00aeef] mb-2" />
              <span className="font-semibold text-gray-800 text-sm">Telefone</span>
              <span className="text-xs text-gray-400 mt-1">(11) 3200-3200</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
