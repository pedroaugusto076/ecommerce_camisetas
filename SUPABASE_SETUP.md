# Configuração do Supabase

## 1. Criar projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta (se necessário).
2. Crie um novo projeto.
3. Anote a **URL** e a **chave anônima (anon key)** em: **Project Settings → API**.

## 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto (copie de `.env.example`):

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
```

## 3. Executar o schema do banco

No Supabase Dashboard, vá em **SQL Editor** e execute o conteúdo do arquivo:

`supabase/migrations/001_initial_schema.sql`

Isso criará as tabelas `profiles`, `orders` e `reviews`, além das políticas de segurança (RLS).

## 4. (Opcional) Desativar confirmação de e-mail

Para ambiente de desenvolvimento, você pode desativar a confirmação de e-mail:

1. **Authentication → Providers → Email**
2. Desative **Confirm email**

Assim, novos usuários podem logar imediatamente após o cadastro.

## 5. Rodar o projeto

```bash
npm run dev
```

---

## Erro: "Email address X is invalid"

Se aparecer esse erro ao cadastrar com um email válido (ex: pedro@gmail.com):

1. **Authentication → Providers → Email** – verifique:
   - Se existe **"Mailer allow list"** ou **"Email domain allowlist"**: se estiver preenchida, só domínios listados são aceitos. Para aceitar Gmail/qualquer email, deixe vazia ou adicione `gmail.com`.
   - Se **"Block disposable email addresses"** está bloqueando o domínio.

2. **Authentication → Users → Add user** – tente criar o usuário manualmente com o mesmo email. Se falhar no dashboard, o bloqueio vem da configuração do Supabase.

3. **Logs** – em **Logs → Auth** veja a mensagem de erro detalhada.
