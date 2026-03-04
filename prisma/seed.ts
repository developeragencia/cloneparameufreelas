import { PrismaClient, UserRole } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Categorias
  const categories = await Promise.all([
    prisma.category.upsert({ where: { slug: 'design-web' }, update: {}, create: { name: 'Design Web', slug: 'design-web', description: 'Design de sites e interfaces', icon: 'Monitor', color: '#00aeef', sortOrder: 1 } }),
    prisma.category.upsert({ where: { slug: 'redacao-conteudo' }, update: {}, create: { name: 'Redação e Conteúdo', slug: 'redacao-conteudo', description: 'Criação de conteúdo e copywriting', icon: 'PenTool', color: '#c084fc', sortOrder: 2 } }),
    prisma.category.upsert({ where: { slug: 'desenvolvimento' }, update: {}, create: { name: 'Desenvolvimento', slug: 'desenvolvimento', description: 'Programação e desenvolvimento de software', icon: 'Code2', color: '#f87171', sortOrder: 3 } }),
    prisma.category.upsert({ where: { slug: 'seo-marketing' }, update: {}, create: { name: 'SEO e Marketing', slug: 'seo-marketing', description: 'Marketing digital e otimização', icon: 'TrendingUp', color: '#fbbf24', sortOrder: 4 } }),
    prisma.category.upsert({ where: { slug: 'design-logo' }, update: {}, create: { name: 'Design de Logo', slug: 'design-logo', description: 'Criação de logotipos e identidade visual', icon: 'Palette', color: '#34d399', sortOrder: 5 } }),
    prisma.category.upsert({ where: { slug: 'video-animacao' }, update: {}, create: { name: 'Vídeo e Animação', slug: 'video-animacao', description: 'Edição de vídeo e animações', icon: 'Video', color: '#22d3ee', sortOrder: 6 } }),
    prisma.category.upsert({ where: { slug: 'mobile' }, update: {}, create: { name: 'Aplicativos Mobile', slug: 'mobile', description: 'Desenvolvimento de apps iOS e Android', icon: 'Smartphone', color: '#a78bfa', sortOrder: 7 } }),
    prisma.category.upsert({ where: { slug: 'traducao' }, update: {}, create: { name: 'Tradução', slug: 'traducao', description: 'Tradução de documentos e conteúdos', icon: 'Languages', color: '#fb923c', sortOrder: 8 } }),
    prisma.category.upsert({ where: { slug: 'fotografia' }, update: {}, create: { name: 'Fotografia', slug: 'fotografia', description: 'Serviços fotográficos profissionais', icon: 'Camera', color: '#ec4899', sortOrder: 9 } }),
    prisma.category.upsert({ where: { slug: 'consultoria' }, update: {}, create: { name: 'Consultoria', slug: 'consultoria', description: 'Consultoria e assessoria empresarial', icon: 'Briefcase', color: '#64748b', sortOrder: 10 } }),
  ])
  console.log(`✅ ${categories.length} categorias criadas`)

  // Skills
  const skills = await Promise.all([
    prisma.skill.upsert({ where: { slug: 'html-css' }, update: {}, create: { name: 'HTML/CSS', slug: 'html-css', categoryId: categories[0].id } }),
    prisma.skill.upsert({ where: { slug: 'javascript' }, update: {}, create: { name: 'JavaScript', slug: 'javascript', categoryId: categories[2].id } }),
    prisma.skill.upsert({ where: { slug: 'react' }, update: {}, create: { name: 'React', slug: 'react', categoryId: categories[2].id } }),
    prisma.skill.upsert({ where: { slug: 'nodejs' }, update: {}, create: { name: 'Node.js', slug: 'nodejs', categoryId: categories[2].id } }),
    prisma.skill.upsert({ where: { slug: 'php' }, update: {}, create: { name: 'PHP', slug: 'php', categoryId: categories[2].id } }),
    prisma.skill.upsert({ where: { slug: 'wordpress' }, update: {}, create: { name: 'WordPress', slug: 'wordpress', categoryId: categories[0].id } }),
    prisma.skill.upsert({ where: { slug: 'photoshop' }, update: {}, create: { name: 'Photoshop', slug: 'photoshop', categoryId: categories[0].id } }),
    prisma.skill.upsert({ where: { slug: 'illustrator' }, update: {}, create: { name: 'Illustrator', slug: 'illustrator', categoryId: categories[4].id } }),
    prisma.skill.upsert({ where: { slug: 'copywriting' }, update: {}, create: { name: 'Copywriting', slug: 'copywriting', categoryId: categories[1].id } }),
    prisma.skill.upsert({ where: { slug: 'seo' }, update: {}, create: { name: 'SEO', slug: 'seo', categoryId: categories[3].id } }),
    prisma.skill.upsert({ where: { slug: 'google-ads' }, update: {}, create: { name: 'Google Ads', slug: 'google-ads', categoryId: categories[3].id } }),
    prisma.skill.upsert({ where: { slug: 'python' }, update: {}, create: { name: 'Python', slug: 'python', categoryId: categories[2].id } }),
    prisma.skill.upsert({ where: { slug: 'flutter' }, update: {}, create: { name: 'Flutter', slug: 'flutter', categoryId: categories[6].id } }),
    prisma.skill.upsert({ where: { slug: 'react-native' }, update: {}, create: { name: 'React Native', slug: 'react-native', categoryId: categories[6].id } }),
    prisma.skill.upsert({ where: { slug: 'after-effects' }, update: {}, create: { name: 'After Effects', slug: 'after-effects', categoryId: categories[5].id } }),
  ])
  console.log(`✅ ${skills.length} habilidades criadas`)

  // Usuário Admin
  const adminPassword = await bcrypt.hash('Admin@MeuFreelas2024', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@meufreelas.com.br' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@meufreelas.com.br',
      password: adminPassword,
      role: UserRole.ADMIN,
      isVerified: true,
      image: null,
    },
  })
  console.log(`✅ Admin criado: ${admin.email}`)

  // Usuário Cliente Demo
  const clientPassword = await bcrypt.hash('Cliente@123', 12)
  const client = await prisma.user.upsert({
    where: { email: 'cliente@demo.com.br' },
    update: {},
    create: {
      name: 'Rafael Leite',
      email: 'cliente@demo.com.br',
      password: clientPassword,
      role: UserRole.CLIENT,
      isVerified: true,
      city: 'São Paulo',
      state: 'SP',
      clientProfile: { create: { companyName: 'Tech Solutions Ltda', industry: 'Tecnologia' } },
    },
  })
  console.log(`✅ Cliente demo criado: ${client.email}`)

  // Usuário Freelancer Demo
  const freelancerPassword = await bcrypt.hash('Freelancer@123', 12)
  const freelancer = await prisma.user.upsert({
    where: { email: 'freelancer@demo.com.br' },
    update: {},
    create: {
      name: 'Lincoln Tamashiro',
      email: 'freelancer@demo.com.br',
      password: freelancerPassword,
      role: UserRole.FREELANCER,
      isVerified: true,
      city: 'Rio de Janeiro',
      state: 'RJ',
      bio: 'Desenvolvedor Full Stack com 5 anos de experiência em React, Node.js e desenvolvimento mobile.',
      rating: 4.8,
      reviewCount: 24,
      freelancerProfile: {
        create: {
          headline: 'Desenvolvedor Full Stack | React | Node.js | Flutter',
          hourlyRate: 150,
          availability: true,
          experienceYears: 5,
          slug: 'lincoln-tamashiro',
          completedJobs: 48,
          successRate: 98,
        },
      },
    },
  })
  console.log(`✅ Freelancer demo criado: ${freelancer.email}`)

  // Testemunhos
  await prisma.testimonial.createMany({
    skipDuplicates: true,
    data: [
      { name: 'Rafael Leite', role: 'Empresário', content: 'Muito bom site para quem busca profissionais de diversos segmentos e especialização. Depois que você faz um projeto com esse site, você se pergunta: como eu trabalhava sem esse site? Valeu muito a pena!', rating: 5, sortOrder: 1 },
      { name: 'Lincoln Tamashiro', role: 'Desenvolvedor', content: 'Dentre as plataformas de freelas, a 99 foi a que tem a maior base de respostas entre propostas de freelas. O nível da base de dados de profissionais disponíveis é muito acima do esperado. Sobre a plataforma, é necessário apenas alguns ajustes de respostas nas informações. Mas a plataforma é limpa e objetiva. Parabéns ao MeuFreelas.', rating: 5, sortOrder: 2 },
      { name: 'Mariana Santos', role: 'Designer', content: 'Plataforma excelente! Consegui meus melhores clientes por aqui. O sistema de pagamento seguro dá total confiança para trabalhar.', rating: 5, sortOrder: 3 },
      { name: 'Carlos Mendes', role: 'Gerente de Marketing', content: 'Encontrei excelentes freelancers para minha empresa. O processo é simples e rápido. Recomendo muito!', rating: 4, sortOrder: 4 },
    ],
  })

  // FAQs
  await prisma.fAQ.createMany({
    skipDuplicates: true,
    data: [
      { question: 'Como funciona o MeuFreelas?', answer: 'O MeuFreelas é uma plataforma que conecta clientes a freelancers. O cliente publica um projeto, freelancers enviam propostas, o cliente escolhe o melhor e o pagamento é feito com segurança pela plataforma.', category: 'geral', sortOrder: 1 },
      { question: 'Como faço para publicar um projeto?', answer: 'Basta se cadastrar como cliente, clicar em "Publicar Projeto" e preencher as informações do seu projeto como título, descrição, orçamento e prazo.', category: 'cliente', sortOrder: 2 },
      { question: 'Como funciona o pagamento seguro?', answer: 'O valor é retido pela plataforma assim que você aprova uma proposta. O freelancer só recebe o pagamento após você confirmar a conclusão do projeto.', category: 'pagamento', sortOrder: 3 },
      { question: 'Qual a taxa cobrada pela plataforma?', answer: 'A plataforma cobra 10% sobre o valor de cada projeto concluído. Esta taxa cobre os serviços de pagamento seguro, suporte e garantia.', category: 'pagamento', sortOrder: 4 },
      { question: 'Como me cadastro como freelancer?', answer: 'Clique em "Cadastre-se", escolha a opção "Freelancer", preencha seu perfil com suas habilidades, portfólio e experiências. Após verificação, você pode começar a enviar propostas.', category: 'freelancer', sortOrder: 5 },
      { question: 'Como funciona a avaliação?', answer: 'Após a conclusão de um projeto, tanto o cliente quanto o freelancer podem se avaliar mutuamente. As avaliações ficam visíveis no perfil e ajudam a construir reputação na plataforma.', category: 'geral', sortOrder: 6 },
    ],
  })

  // Configurações do site
  await prisma.siteSettings.createMany({
    skipDuplicates: true,
    data: [
      { key: 'projects_completed', value: '136877', description: 'Total de projetos concluídos' },
      { key: 'freelancers_registered', value: '3409198', description: 'Total de freelancers cadastrados' },
      { key: 'total_paid', value: '26456081.44', description: 'Total pago aos freelancers (R$)' },
      { key: 'platform_fee', value: '10', description: 'Taxa da plataforma (%)' },
      { key: 'min_project_value', value: '50', description: 'Valor mínimo de projeto (R$)' },
      { key: 'site_name', value: 'MeuFreelas', description: 'Nome da plataforma' },
      { key: 'site_email', value: 'contato@meufreelas.com.br', description: 'Email de contato' },
      { key: 'site_phone', value: '(11) 3456-7890', description: 'Telefone de contato' },
    ],
  })

  console.log('✅ Seed concluído com sucesso!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
