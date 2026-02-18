# EarthFirst - Loja de Moda Sustentável

Projeto de e-commerce desenvolvido com **React.js** e **Vite**, focado em performance, design minimalista e uma experiência de usuário (UX) otimizada para dispositivos móveis.

## 🚀 Tecnologias Utilizadas

*   **React 19:** Biblioteca principal para construção da interface.
*   **Vite:** Build tool rápida e leve.
*   **Tailwind CSS:** Framework de estilização utilitária para design responsivo.
*   **Lucide React:** Biblioteca de ícones leves e consistentes.
*   **Local Storage:** Persistência de dados (Carrinho, Usuário, Pedidos e Avaliações) sem necessidade de backend.

## ✨ Funcionalidades Implementadas

### 1. Navegação e Layout
*   **Header Responsivo:** Menu "hambúrguer" animado para mobile (estilo Drawer) e navegação completa para desktop.
*   **Hero Section:** Banner imersivo com call-to-action, adaptado para leitura em telas pequenas.
*   **Footer Organizado:** Links úteis, newsletter e certificações distribuídos em grid responsivo.

### 2. Catálogo de Produtos
*   **Carrossel de Produtos (Touch-first):**
    *   Scroll horizontal nativo para mobile (swipe).
    *   Setas de navegação para desktop.
    *   **Otimização de Card:** Ajuste de dimensões para exibir múltiplos produtos na tela do celular sem cortes excessivos (Visualização em grade compacta).
*   **Grid de Categorias:** Navegação visual rápida por departamentos.
*   **Página de Categoria:** Listagem completa com filtros visuais.
*   **Detalhes do Produto:**
    *   Galeria de imagens (Thumbnail scroll).
    *   Seletor de Tamanho e Cor.
    *   Sistema de Avaliações (Reviews) funcional.
    *   Informações expansíveis (Accordions).

### 3. Carrinho e Checkout
*   **Sidebar Interativo:** Carrinho desliza da direita (ocupa 100% da tela no mobile).
*   **Gestão de Itens:** Adicionar, remover e alterar quantidade.
*   **Checkout Simulado:** Fluxo de revisão -> pagamento (cartão de crédito) -> sucesso.

### 4. Autenticação e Perfil (Simulado)
*   **Login/Cadastro:** Modal integrado.
*   **Perfil do Usuário:** Visualização de dados e histórico de pedidos.
*   **Persistência:** O estado do usuário e pedidos ficam salvos no navegador.

### 5. Conteúdo Institucional
*   **Modais Informativos:** Explicações sobre impacto ambiental, algodão orgânico, guia de medidas, etc.
*   **Assinatura:** Modal para plano de assinatura de plantio de árvores.

## 📱 Otimizações de Responsividade (Mobile First)

Realizamos um trabalho detalhado para garantir a melhor experiência em celulares:

1.  **Cards Compactos:** Redução da largura mínima dos cards de produto (`135px` em mobile) para permitir a visualização de 2 itens por linha ou visualização completa do item sem necessidade de rolagem lateral excessiva.
2.  **Touch Targets:** Botões e áreas de clique aumentados para facilitar o toque (ex: botões de tamanho, menu).
3.  **Layout Fluido:** O carrinho de compras e menus laterais ocupam a largura total em telas pequenas para maximizar o espaço de conteúdo.
4.  **Tipografia Adaptativa:** Tamanhos de fonte ajustados (títulos menores, textos de apoio legíveis) para evitar quebras de linha indesejadas.
5.  **Scroll Snapping:** O carrossel de produtos possui "imã" (snap) para parar o produto perfeitamente alinhado ao rolar.

## 📦 Como Rodar o Projeto

1.  Instale as dependências:
    ```bash
    npm install
    ```
2.  Rode o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
3.  Acesse `http://localhost:5173` no seu navegador.

---
*Projeto desenvolvido com foco em Clean Code e componentização.*
