# Configuração OAuth (Google e GitHub)

## Status Atual
- ✅ Sistema de autenticação por credenciais (email/senha) **FUNCIONANDO**
- ⚠️ OAuth Google e GitHub **DESABILITADOS** (aguardando configuração)

## Como Habilitar OAuth

### 1. Google OAuth

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Vá em "APIs & Services" > "Credentials"
4. Clique em "Create Credentials" > "OAuth 2.0 Client ID"
5. Configure a tela de consentimento se solicitado
6. Tipo de aplicação: **Web application**
7. Adicione as URIs autorizadas:
   - **Authorized JavaScript origins**: `http://localhost:3000` (dev) e `https://meufreelas.com.br` (prod)
   - **Authorized redirect URIs**: 
     - `http://localhost:3000/api/auth/callback/google` (dev)
     - `https://meufreelas.com.br/api/auth/callback/google` (prod)
8. Copie o **Client ID** e **Client Secret**
9. Adicione no `.env`:
   ```
   GOOGLE_CLIENT_ID="seu-client-id-aqui"
   GOOGLE_CLIENT_SECRET="seu-client-secret-aqui"
   ```

### 2. GitHub OAuth

1. Acesse [GitHub Developer Settings](https://github.com/settings/developers)
2. Clique em "New OAuth App"
3. Preencha:
   - **Application name**: MeuFreelas
   - **Homepage URL**: `https://meufreelas.com.br` (ou `http://localhost:3000` para dev)
   - **Authorization callback URL**: 
     - `http://localhost:3000/api/auth/callback/github` (dev)
     - `https://meufreelas.com.br/api/auth/callback/github` (prod)
4. Copie o **Client ID**
5. Gere um **Client Secret**
6. Adicione no `.env`:
   ```
   GITHUB_CLIENT_ID="seu-client-id-aqui"
   GITHUB_CLIENT_SECRET="seu-client-secret-aqui"
   ```

### 3. Reinicie o Servidor

Após adicionar as credenciais no `.env`, reinicie o servidor:
```bash
npm run dev
```

Os botões de login com Google e GitHub aparecerão automaticamente nas páginas de login e cadastro.

## Notas Importantes

- O sistema **detecta automaticamente** se as credenciais OAuth estão configuradas
- Se não estiverem configuradas, os providers OAuth não são carregados (evita erros)
- A autenticação por email/senha funciona independentemente do OAuth
- Para produção, sempre use HTTPS nas redirect URIs
- Mantenha as credenciais OAuth em segredo (nunca commite o arquivo `.env`)

## Testando

1. Configure as credenciais conforme acima
2. Reinicie o servidor
3. Acesse `/login` ou `/cadastro`
4. Os botões "Google" e "GitHub" devem aparecer
5. Clique para testar o fluxo OAuth
