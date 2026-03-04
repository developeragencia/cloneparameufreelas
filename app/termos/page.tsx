export default function TermosPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-black text-gray-800 mb-2">Termos de Uso</h1>
          <p className="text-sm text-gray-400 mb-8">Última atualização: Janeiro de 2025</p>

          <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">1. Aceitação dos Termos</h2>
              <p>Ao acessar e utilizar a plataforma meufreelas, você concorda com estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não poderá utilizar nossos serviços.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">2. Descrição do Serviço</h2>
              <p>A meufreelas é uma plataforma que conecta clientes que precisam de serviços com freelancers qualificados. Atuamos como intermediários, facilitando a conexão entre as partes, mas não somos parte do contrato de prestação de serviços.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">3. Cadastro e Conta</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Você deve ter pelo menos 18 anos para usar a plataforma</li>
                <li>As informações fornecidas devem ser verdadeiras e atualizadas</li>
                <li>Você é responsável pela segurança de sua conta</li>
                <li>É proibido criar múltiplas contas ou compartilhar credenciais</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">4. Taxas e Pagamentos</h2>
              <p>A plataforma cobra uma taxa de serviço sobre cada transação realizada. O percentual exato é exibido antes da conclusão de qualquer pagamento. Os pagamentos são processados de forma segura e mantidos em custódia até a conclusão satisfatória do projeto.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">5. Conduta Proibida</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Publicar conteúdo falso, enganoso ou ofensivo</li>
                <li>Contatar usuários fora da plataforma para evitar taxas</li>
                <li>Realizar transações fraudulentas</li>
                <li>Violar direitos de propriedade intelectual</li>
                <li>Fazer spam ou assediar outros usuários</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">6. Resolução de Disputas</h2>
              <p>Em caso de conflito entre cliente e freelancer, a plataforma oferece um serviço de mediação. Ambas as partes devem apresentar evidências e argumentos, e nossa equipe tomará uma decisão final e vinculante.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">7. Limitação de Responsabilidade</h2>
              <p>A meufreelas não se responsabiliza pela qualidade dos serviços prestados pelos freelancers, por atrasos na entrega ou por quaisquer danos decorrentes das relações estabelecidas entre usuários na plataforma.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">8. Contato</h2>
              <p>Para dúvidas sobre estes termos, entre em contato: <a href="mailto:juridico@meufreelas.com.br" className="text-[#00aeef] hover:underline">juridico@meufreelas.com.br</a></p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
