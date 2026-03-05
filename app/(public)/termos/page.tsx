import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium mb-6 hover:underline" style={{ color: '#00AEEF' }}>
          <ArrowLeft className="w-4 h-4" /> Voltar para home
        </Link>

        <h1 className="text-3xl font-bold text-gray-800 mb-6">Termos de Uso</h1>

        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6 text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">1. Aceitação dos Termos</h2>
            <p>Ao acessar e usar a plataforma MeuFreelas, você concorda com estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deve usar nossos serviços.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">2. Descrição do Serviço</h2>
            <p>O MeuFreelas é uma plataforma que conecta empresas e clientes a profissionais freelancers qualificados. Facilitamos a comunicação, negociação e pagamento entre as partes.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">3. Cadastro e Conta</h2>
            <p>Para usar nossos serviços, você deve criar uma conta fornecendo informações precisas e completas. Você é responsável por manter a confidencialidade de sua senha e por todas as atividades que ocorram em sua conta.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">4. Responsabilidades dos Usuários</h2>
            <p>Freelancers devem entregar trabalhos de qualidade dentro dos prazos acordados. Clientes devem fornecer informações claras sobre os projetos e efetuar pagamentos conforme combinado.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">5. Pagamentos e Taxas</h2>
            <p>A plataforma cobra uma taxa de serviço sobre projetos concluídos. Os valores e condições de pagamento são especificados durante o processo de contratação.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">6. Propriedade Intelectual</h2>
            <p>Todo conteúdo criado através da plataforma pertence ao cliente contratante, salvo acordo diferente entre as partes. A plataforma MeuFreelas mantém direitos sobre sua marca, logo e interface.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">7. Limitação de Responsabilidade</h2>
            <p>O MeuFreelas atua como intermediário. Não nos responsabilizamos por disputas entre clientes e freelancers, qualidade do trabalho entregue ou danos indiretos.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">8. Modificações</h2>
            <p>Reservamos o direito de modificar estes termos a qualquer momento. Mudanças significativas serão comunicadas aos usuários.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">9. Contato</h2>
            <p>Para dúvidas sobre estes termos, entre em contato através de contato@meufreelas.com.br</p>
          </section>

          <p className="text-xs text-gray-500 mt-8">Última atualização: Março de 2024</p>
        </div>
      </div>
    </div>
  )
}
