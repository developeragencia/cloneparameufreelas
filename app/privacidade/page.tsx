export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-black text-gray-800 mb-2">Política de Privacidade</h1>
          <p className="text-sm text-gray-400 mb-8">Última atualização: Janeiro de 2025</p>

          <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">1. Coleta de Dados</h2>
              <p>Coletamos informações que você nos fornece diretamente, como nome, e-mail, telefone e dados de perfil profissional. Também coletamos automaticamente dados de uso da plataforma, endereço IP e cookies.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">2. Uso das Informações</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Fornecer, manter e melhorar nossos serviços</li>
                <li>Processar transações e enviar notificações relacionadas</li>
                <li>Enviar comunicações de marketing (com seu consentimento)</li>
                <li>Detectar e prevenir fraudes e abusos</li>
                <li>Cumprir obrigações legais</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">3. Compartilhamento de Dados</h2>
              <p>Não vendemos seus dados pessoais. Podemos compartilhá-los com:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Outros usuários da plataforma (dados de perfil público)</li>
                <li>Prestadores de serviços que nos auxiliam na operação</li>
                <li>Autoridades, quando exigido por lei</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">4. Cookies</h2>
              <p>Utilizamos cookies para melhorar sua experiência, manter sessões ativas e analisar o uso da plataforma. Você pode configurar seu navegador para recusar cookies, mas isso pode afetar algumas funcionalidades.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">5. Segurança</h2>
              <p>Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, perda ou destruição. Senhas são armazenadas com hash criptográfico seguro.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">6. Seus Direitos (LGPD)</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Acesso aos seus dados pessoais</li>
                <li>Correção de dados incompletos ou desatualizados</li>
                <li>Exclusão dos dados tratados com base no consentimento</li>
                <li>Portabilidade dos dados</li>
                <li>Revogação do consentimento</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">7. Retenção de Dados</h2>
              <p>Mantemos seus dados pelo tempo necessário para fornecer os serviços e cumprir obrigações legais. Você pode solicitar a exclusão de sua conta a qualquer momento.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">8. Contato</h2>
              <p>Para exercer seus direitos ou tirar dúvidas: <a href="mailto:privacidade@meufreelas.com.br" className="text-[#00aeef] hover:underline">privacidade@meufreelas.com.br</a></p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
