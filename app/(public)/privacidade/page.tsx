import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium mb-6 hover:underline" style={{ color: '#00AEEF' }}>
          <ArrowLeft className="w-4 h-4" /> Voltar para home
        </Link>

        <h1 className="text-3xl font-bold text-gray-800 mb-6">Política de Privacidade</h1>

        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6 text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">1. Informações que Coletamos</h2>
            <p>Coletamos informações que você nos fornece diretamente, como nome, email, telefone e dados de pagamento. Também coletamos dados de uso da plataforma automaticamente.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">2. Como Usamos suas Informações</h2>
            <p>Usamos suas informações para fornecer e melhorar nossos serviços, processar pagamentos, enviar notificações importantes e personalizar sua experiência na plataforma.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">3. Compartilhamento de Dados</h2>
            <p>Não vendemos suas informações pessoais. Compartilhamos dados apenas quando necessário para fornecer nossos serviços (ex: processadores de pagamento) ou quando exigido por lei.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">4. Segurança</h2>
            <p>Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">5. Cookies</h2>
            <p>Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o uso da plataforma e personalizar conteúdo. Você pode gerenciar preferências de cookies nas configurações do navegador.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">6. Seus Direitos</h2>
            <p>Você tem direito de acessar, corrigir ou excluir suas informações pessoais. Também pode solicitar a portabilidade de dados ou revogar consentimentos a qualquer momento.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">7. Retenção de Dados</h2>
            <p>Mantemos suas informações pelo tempo necessário para fornecer nossos serviços e cumprir obrigações legais. Dados de projetos concluídos são mantidos por até 5 anos.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">8. Menores de Idade</h2>
            <p>Nossos serviços não são direcionados a menores de 18 anos. Não coletamos intencionalmente informações de menores.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">9. Alterações nesta Política</h2>
            <p>Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças significativas através da plataforma ou por email.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">10. Contato</h2>
            <p>Para questões sobre privacidade, entre em contato através de privacidade@meufreelas.com.br</p>
          </section>

          <p className="text-xs text-gray-500 mt-8">Última atualização: Março de 2024</p>
        </div>
      </div>
    </div>
  )
}
