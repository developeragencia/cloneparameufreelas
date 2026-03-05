import Link from 'next/link'
import { ArrowLeft, Search, HelpCircle, Mail } from 'lucide-react'

const faqItems = [
  {
    category: 'Para Empresas',
    questions: [
      { q: 'Como publicar um projeto?', a: 'Clique em "Publicar projeto" no menu, preencha os detalhes do seu projeto e aguarde propostas de freelancers.' },
      { q: 'Como escolher o melhor freelancer?', a: 'Analise o portfólio, avaliações de clientes anteriores e a proposta enviada pelo freelancer.' },
      { q: 'Como funciona o pagamento?', a: 'O pagamento é feito de forma segura através da plataforma. O valor só é liberado ao freelancer após a conclusão do projeto.' },
    ],
  },
  {
    category: 'Para Freelancers',
    questions: [
      { q: 'Como encontrar projetos?', a: 'Acesse "Encontrar Trabalho" no menu e navegue pelos projetos disponíveis. Envie propostas para os que mais combinam com suas habilidades.' },
      { q: 'Como recebo meu pagamento?', a: 'Após a conclusão e aprovação do projeto, o pagamento é processado e você recebe via transferência bancária ou PIX.' },
      { q: 'Posso trabalhar de qualquer lugar?', a: 'Sim! A maioria dos projetos são remotos. Você pode trabalhar de onde estiver.' },
    ],
  },
  {
    category: 'Geral',
    questions: [
      { q: 'A plataforma é gratuita?', a: 'Sim, criar uma conta e navegar pela plataforma é totalmente gratuito. Cobramos apenas uma pequena taxa sobre projetos concluídos.' },
      { q: 'Como entro em contato com o suporte?', a: 'Você pode nos contatar através do email suporte@meufreelas.com.br ou pelo formulário de contato.' },
      { q: 'Meus dados estão seguros?', a: 'Sim, utilizamos criptografia e seguimos as melhores práticas de segurança para proteger seus dados.' },
    ],
  },
]

export default function AjudaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium mb-6 hover:underline" style={{ color: '#00AEEF' }}>
          <ArrowLeft className="w-4 h-4" /> Voltar para home
        </Link>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Central de Ajuda</h1>
          <p className="text-gray-600 mb-6">Encontre respostas para as perguntas mais frequentes</p>

          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar ajuda..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-8">
          {faqItems.map((section) => (
            <div key={section.category}>
              <h2 className="text-xl font-bold text-gray-800 mb-4">{section.category}</h2>
              <div className="space-y-3">
                {section.questions.map((item, idx) => (
                  <details key={idx} className="bg-white border border-gray-200 rounded-lg p-4 group">
                    <summary className="flex items-start gap-3 cursor-pointer font-semibold text-gray-800 text-sm">
                      <HelpCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00AEEF' }} />
                      <span className="flex-1">{item.q}</span>
                    </summary>
                    <p className="mt-3 pl-8 text-sm text-gray-600 leading-relaxed">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white border border-gray-200 rounded-lg p-6 text-center">
          <Mail className="w-8 h-8 mx-auto mb-3" style={{ color: '#00AEEF' }} />
          <h3 className="font-bold text-gray-800 mb-2">Não encontrou o que procurava?</h3>
          <p className="text-sm text-gray-600 mb-4">Entre em contato com nossa equipe de suporte</p>
          <Link
            href="/contato"
            className="inline-block px-6 py-2 text-sm font-semibold text-white rounded transition-colors"
            style={{ background: '#00AEEF' }}
          >
            Falar com o suporte
          </Link>
        </div>
      </div>
    </div>
  )
}
