# meufreelas Clone

Clone completo da plataforma [meufreelas.com.br](https://www.meufreelas.com.br), construído com Next.js 14, Prisma ORM, NextAuth.js e Tailwind CSS.

## Stack

- **Framework**: Next.js 14 (App Router)
- **ORM**: Prisma com MySQL (Hostinger)
- **Auth**: NextAuth.js v4
- **Estilização**: Tailwind CSS
- **Ícones**: lucide-react
- **Notificações**: react-hot-toast

## Estrutura do Projeto

```
├── app/
│   ├── (public)/              # Páginas públicas
│   │   ├── page.tsx           # Home
│   │   ├── freelancers/       # Lista e perfil de freelancers
│   │   ├── projetos/          # Lista e detalhe de projetos
│   │   ├── categorias/        # Categorias
│   │   ├── como-funciona/     # Como funciona
│   │   ├── publicar-projeto/  # Publicar projeto
│   │   ├── ajuda/             # Central de ajuda
│   │   ├── termos/            # Termos de uso
│   │   └── privacidade/       # Política de privacidade
│   ├── api/                   # API Routes
│   │   ├── auth/              # NextAuth
│   │   ├── projects/          # CRUD de projetos
│   │   ├── proposals/         # Propostas
│   │   ├── messages/          # Mensagens
│   │   ├── payments/          # Pagamentos
│   │   ├── notifications/     # Notificações
│   │   ├── users/             # Perfis de usuários
│   │   ├── categories/        # Categorias
│   │   └── admin/             # APIs admin
│   ├── dashboard/
│   │   ├── cliente/           # Dashboard do cliente
│   │   └── freelancer/        # Dashboard do freelancer
│   ├── admin/                 # Painel administrativo
│   └── login/ cadastro/       # Autenticação
├── components/
│   ├── dashboard/             # Componentes do dashboard
│   ├── admin/                 # Componentes admin
│   └── home/                  # Componentes da home
├── lib/
│   ├── prisma.ts              # Cliente Prisma
│   ├── auth.ts                # Configuração NextAuth
│   └── utils.ts               # Utilitários
└── prisma/
    ├── schema.prisma          # Schema do banco
    └── migration.sql          # Script SQL para Hostinger
```

## Instalação e Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Copie `.env.example` para `.env` e preencha:

```bash
cp .env.example .env
```

Preencha as variáveis:

```env
DATABASE_URL="mysql://usuario:senha@host:3306/nome_banco"
NEXTAUTH_URL="https://seudominio.com.br"
NEXTAUTH_SECRET="sua-chave-secreta-aqui"
```

> **Dica**: Gere o `NEXTAUTH_SECRET` com: `openssl rand -base64 32`

### 3. Configurar banco de dados

**Opção A — Prisma (recomendado para desenvolvimento):**
```bash
npx prisma db push
```

**Opção B — SQL direto (Hostinger MySQL):**
1. Acesse o painel da Hostinger → MySQL Databases
2. Abra o phpMyAdmin
3. Selecione seu banco de dados
4. Importe o arquivo `prisma/migration.sql`

### 4. Executar em desenvolvimento

```bash
npm run dev
```

### 5. Build para produção

```bash
npm run build
npm start
```

## Deploy na Hostinger

### Node.js App

1. Crie um app Node.js no painel da Hostinger
2. Configure as variáveis de ambiente no painel
3. Faça upload do código ou conecte via Git
4. Execute `npm install && npm run build`
5. Configure o start command: `npm start`

### Variáveis de Ambiente Obrigatórias

| Variável | Descrição |
|----------|-----------|
| `DATABASE_URL` | URL de conexão MySQL da Hostinger |
| `NEXTAUTH_URL` | URL completa do seu site |
| `NEXTAUTH_SECRET` | Chave secreta para JWT (min. 32 chars) |

## Funcionalidades

### Públicas
- ✅ Home com busca, categorias e CTAs
- ✅ Listagem de freelancers com filtros
- ✅ Listagem de projetos com filtros
- ✅ Perfil público de freelancers
- ✅ Detalhe de projetos
- ✅ Como Funciona
- ✅ Publicar Projeto
- ✅ Categorias
- ✅ Ajuda (FAQ)
- ✅ Termos e Privacidade

### Autenticação
- ✅ Login com e-mail/senha
- ✅ Cadastro (cliente/freelancer)
- ✅ Sessões seguras com NextAuth

### Dashboard Cliente
- ✅ Visão geral com estatísticas
- ✅ Gerenciar projetos
- ✅ Ver e gerenciar propostas (aceitar/rejeitar)
- ✅ Mensagens
- ✅ Pagamentos
- ✅ Editar perfil

### Dashboard Freelancer
- ✅ Visão geral com ganhos e avaliação
- ✅ Propostas enviadas
- ✅ Mensagens
- ✅ Portfólio
- ✅ Pagamentos recebidos
- ✅ Editar perfil

### Painel Admin
- ✅ Dashboard com estatísticas
- ✅ Gerenciar usuários (ativar/verificar)
- ✅ Gerenciar projetos
- ✅ Histórico de pagamentos
- ✅ Resolver disputas
- ✅ Gerenciar categorias
- ✅ Configurações da plataforma

## Criando o Admin inicial

Após configurar o banco, execute este SQL para criar um usuário admin:

```sql
INSERT INTO User (id, name, email, password, role, isActive, isVerified)
VALUES (
  UUID(),
  'Administrador',
  'admin@meufreelas.com.br',
  '$2b$12$HASH_BCRYPT_DA_SENHA', -- Use bcrypt para gerar o hash
  'ADMIN',
  true,
  true
);
```

Ou crie via cadastro normal e depois altere o role no banco:

```sql
UPDATE User SET role = 'ADMIN' WHERE email = 'seu@email.com';
```

## Licença

Este projeto é um clone educacional da plataforma meufreelas.com.br para fins de estudo e prática de desenvolvimento web.
