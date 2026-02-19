# 🌱 EarthFirst — Sustainable Fashion E-Commerce

Plataforma de e-commerce desenvolvida com **React.js + Vite**, estruturada com arquitetura moderna baseada em **Supabase (PostgreSQL)** e integração com **Resend API** para envio de e-mails transacionais.

O projeto foi concebido com foco em **alta performance, escalabilidade, segurança e experiência mobile-first**, aplicando princípios sólidos de engenharia de software, componentização avançada e boas práticas de arquitetura frontend/backend.

🌍 **Produção:**  
https://ecommpedro.netlify.app

---

## 🚀 Stack Tecnológica

### 🖥️ Frontend

- **React 19** — Arquitetura baseada em componentes reutilizáveis e composição declarativa.
- **Vite** — Build tool com HMR ultrarrápido e otimização de bundles.
- **Tailwind CSS** — Design system utilitário com responsividade mobile-first.
- **Lucide React** — Biblioteca de ícones vetoriais leves.
- **Context API + Hooks customizados** — Gerenciamento de estado desacoplado e escalável.

---

### 🔥 Backend & Infraestrutura

- **Supabase**
  - Autenticação JWT-based
  - Banco relacional PostgreSQL
  - Row Level Security (RLS)
  - Storage
  - Edge Functions (quando necessário)

- **PostgreSQL**
  - Modelagem relacional normalizada
  - Constraints e integridade referencial
  - Queries otimizadas
  - Índices estratégicos para performance

- **Resend API**
  - E-mails transacionais automatizados
  - Confirmação de pedidos
  - Fluxo de comunicação com o usuário

- **Netlify**
  - Deploy contínuo (CI/CD)
  - Ambiente de produção otimizado
  - HTTPS automático
  - CDN global

---

## 🏗️ Arquitetura do Sistema

O projeto segue uma arquitetura desacoplada baseada em:

```
Client (React SPA)
        ↓
Supabase (Auth + Database + Storage)
        ↓
Resend API (Serviço de E-mail)
```

### Princípios Aplicados

- Separação clara de responsabilidades (SoC)
- Componentização granular
- Controle de acesso baseado em políticas (RLS)
- Persistência relacional segura
- Gerenciamento de sessão via JWT
- Environment variables para isolamento de credenciais
- Estrutura preparada para escalabilidade horizontal

---

## ✨ Funcionalidades

### 🔐 Autenticação Segura

- Cadastro e login com Supabase Auth
- Persistência de sessão
- Proteção de rotas privadas
- Recuperação de senha por e-mail
- Controle de acesso por usuário autenticado

---

### 🛍️ Catálogo de Produtos

- Carrossel touch-first otimizado
- Scroll snapping para UX fluida
- Grid responsivo de categorias
- Página de produto com:
  - Galeria com thumbnails
  - Seleção dinâmica de tamanho e cor
  - Sistema de avaliações persistido no banco
  - Accordions informativos

---

### 🛒 Carrinho e Checkout

- Sidebar dinâmica e responsiva
- Gerenciamento de quantidade em tempo real
- Persistência de pedidos no PostgreSQL
- Criação de registros transacionais
- Envio automático de e-mail via Resend
- Fluxo estruturado de revisão → pagamento → confirmação

---

### 👤 Perfil do Usuário

- Dashboard com histórico de pedidos
- Consulta de dados persistidos
- Integração direta com banco relacional
- Isolamento de dados via RLS

---

### 🌎 Conteúdo Institucional

- Modais informativos sobre sustentabilidade
- Sistema de assinatura
- Integração com e-mail marketing

---

## 🔐 Segurança e Boas Práticas

- Row Level Security configurado
- Queries protegidas por autenticação
- Variáveis de ambiente isoladas
- Estrutura pronta para produção
- Tratamento de erros e validações robustas
- Código modular e escalável

---

## 📱 Mobile First & Performance

- Layout 100% responsivo
- Cards compactos otimizados para telas pequenas
- Touch targets ampliados
- Tipografia adaptativa
- Scroll snapping para alinhamento perfeito
- Otimização de renderização
- Redução de re-renders desnecessários

---

## 📦 Como Rodar Localmente

1. Instale as dependências:

```bash
npm install
```

2. Configure as variáveis de ambiente:

```
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
VITE_RESEND_API_KEY=your_key
```

3. Rode o servidor:

```bash
npm run dev
```

4. Acesse:

```
http://localhost:5173
```

---

## 🎯 Objetivo Técnico

Desenvolver uma aplicação de e-commerce com:

- Arquitetura profissional
- Backend real e escalável
- Banco relacional robusto
- Segurança baseada em políticas
- Código limpo e componentizado
- Experiência fluida em dispositivos móveis
- Estrutura preparada para crescimento

---

*Projeto desenvolvido com foco em engenharia moderna, escalabilidade e padrões profissionais de mercado.*
