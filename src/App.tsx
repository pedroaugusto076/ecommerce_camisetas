import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCarousel } from './components/ProductCarousel';
import { CategoryGrid } from './components/CategoryGrid';
import { ImpactBanner } from './components/ImpactBanner';
import { RewardsSection } from './components/RewardsSection';
import { Footer } from './components/Footer';
import { ProductDetail } from './components/ProductDetail';
import { CartSidebar } from './components/CartSidebar';
import { CategoryPage } from './components/CategoryPage';
import { LoginModal } from './components/LoginModal';
import { InfoModal } from './components/InfoModal';
import type { InfoModalType } from './components/InfoModal';
import { SubscriptionModal } from './components/SubscriptionModal';
import { NEW_ARRIVALS, BESTSELLERS, CATEGORIES, ALL_PRODUCTS } from './constants';
import type { Product, CartItem, User, Order } from './types';
import { getSession, saveSession, clearSession, saveOrder } from './utils/storage';

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Login State
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginInitialView, setLoginInitialView] = useState<'login' | 'register'>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Modal States
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [infoModalKey, setInfoModalKey] = useState<string>('impact'); // Chave para identificar o conteúdo
  const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);

  // Inicializar sessão
  useEffect(() => {
    const session = getSession();
    if (session) {
        setCurrentUser(session);
    }
  }, []);

  const handleProductClick = (product: Product) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedProduct(product);
  };

  const handleNavigateToCategory = (category: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedCategory(category);
    setSelectedProduct(null); // Fecha detalhe do produto se estiver aberto
  };

  const handleBackToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedProduct(null);
    setSelectedCategory(null);
  };

  const handleAddToCart = (product: Product, size: string) => {
    setCartItems(prev => {
        const cartId = `${product.id}-${size}`;
        const existingItem = prev.find(item => item.cartId === cartId);

        if (existingItem) {
            return prev.map(item => 
                item.cartId === cartId 
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
        }

        return [...prev, { ...product, cartId, selectedSize: size, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (cartId: string) => {
      setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
      setCartItems(prev => prev.map(item => {
          if (item.cartId === cartId) {
              const newQuantity = Math.max(1, item.quantity + delta);
              return { ...item, quantity: newQuantity };
          }
          return item;
      }));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Funções de Login / Cadastro
  const handleOpenLogin = () => {
    setLoginInitialView('login');
    setIsLoginOpen(true);
  };

  const handleOpenRegister = () => {
    setLoginInitialView('register');
    setIsLoginOpen(true);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    saveSession(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    clearSession();
  };

  const handleCheckoutSuccess = (items: CartItem[], total: number) => {
      if (!currentUser) return;
      
      const newOrder: Order = {
          id: crypto.randomUUID(),
          date: new Date().toLocaleDateString('pt-BR'),
          total: total,
          items: items,
          status: 'Aprovado'
      };
      
      saveOrder(currentUser.email, newOrder);
  };

  // Funções de Informação (Modal Genérico)
  const handleOpenInfo = (key: string) => {
    setInfoModalKey(key);
    setInfoModalOpen(true);
  };

  // Helper para obter conteúdo do modal
  const getModalContent = (key: string): { title: string, type: InfoModalType, content: React.ReactNode } => {
      switch (key) {
        case 'impact':
            return {
                title: "Nosso Impacto Ambiental",
                type: 'impact',
                content: (
                    <div className="space-y-4">
                        <p className="font-medium text-lg text-brand-green">1 Camiseta = 10 Árvores Plantadas.</p>
                        <p>Em parceria com ONGs de reflorestamento ao redor do mundo, garantimos que cada compra sua ajude a recuperar áreas degradadas na Amazônia, Indonésia e África Subsaariana.</p>
                        <h4 className="font-bold text-gray-900 mt-4">Por que plantar árvores?</h4>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Absorção de CO2 e combate ao aquecimento global.</li>
                            <li>Recuperação da biodiversidade e habitat animal.</li>
                            <li>Proteção de bacias hidrográficas e solo.</li>
                            <li>Geração de renda para comunidades locais.</li>
                        </ul>
                    </div>
                )
            };
        case 'cotton':
            return {
                title: "Algodão Orgânico Certificado",
                type: 'cotton',
                content: (
                    <div className="space-y-4">
                        <p className="font-medium text-lg text-[#8b4513]">O toque mais suave que você já sentiu.</p>
                        <p>Nossas camisetas são produzidas com Algodão Orgânico Certificado GOTS (Global Organic Textile Standard). Isso significa pureza desde a semente até a costura.</p>
                        <h4 className="font-bold text-gray-900 mt-4">Diferenciais do nosso Algodão:</h4>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Zero Pesticidas:</strong> Cultivo livre de químicos tóxicos, seguro para o solo e para os agricultores.</li>
                            <li><strong>Economia de Água:</strong> O solo orgânico retém mais água, reduzindo o consumo em até 91% comparado ao algodão convencional.</li>
                            <li><strong>Hipoalergênico:</strong> Perfeito para peles sensíveis, pois não contém resíduos químicos.</li>
                            <li><strong>Durabilidade:</strong> As fibras naturais não danificadas por processos químicos duram muito mais.</li>
                        </ul>
                    </div>
                )
            };
        case 'virtual_forest':
            return {
                title: "Sua Floresta Virtual",
                type: 'forest',
                content: (
                    <div className="space-y-4">
                        <p>Bem-vindo à gamificação do bem! Ao criar uma conta na EarthFirst, cada árvore que você planta através de suas compras aparece na sua <strong>Floresta Virtual</strong>.</p>
                        <ul className="list-disc pl-5 space-y-2 mt-4">
                            <li><strong>Acompanhe o Crescimento:</strong> Veja sua ilha digital ficar mais verde a cada pedido.</li>
                            <li><strong>Espécies Reais:</strong> As árvores na sua floresta virtual correspondem às espécies reais plantadas pelos nossos parceiros.</li>
                            <li><strong>Conquistas e Badges:</strong> Desbloqueie medalhas como "Guardião da Amazônia" ou "Plantador Mestre" ao atingir marcos de plantio.</li>
                        </ul>
                        <p className="mt-4 text-sm bg-green-50 p-4 rounded border border-green-200">
                            Crie sua conta agora e ganhe suas primeiras 5 árvores digitais de bônus!
                        </p>
                    </div>
                )
            };
        // --- SUPORTE ---
        case 'contact':
            return { title: "Fale Conosco", type: 'support', content: <div className="space-y-4"><p>Estamos aqui para ajudar! Nosso time atende de Seg a Sex, das 9h às 18h.</p><p><strong>E-mail:</strong> contato@earthfirst.com.br</p><p><strong>WhatsApp:</strong> (11) 99999-9999</p></div> };
        case 'help_center':
            return { title: "Central de Ajuda", type: 'support', content: <div className="space-y-4"><p>Encontre tutoriais rápidos sobre:</p><ul className="list-disc pl-5"><li>Como cuidar da sua peça de algodão orgânico.</li><li>Como resgatar seus pontos de fidelidade.</li><li>Como acompanhar a entrega.</li></ul></div> };
        case 'shipping':
            return { title: "Política de Envio", type: 'support', content: <div className="space-y-4"><p>Enviamos para todo o Brasil.</p><ul className="list-disc pl-5"><li>Frete Grátis em pedidos acima de R$ 300,00.</li><li>Prazo de entrega: 3 a 7 dias úteis (Sudeste) e 7 a 15 dias úteis (outras regiões).</li><li>Embalagens 100% biodegradáveis e sem plástico.</li></ul></div> };
        case 'returns':
            return { title: "Trocas e Devoluções", type: 'support', content: <div className="space-y-4"><p>Queremos que você ame sua peça. Se não servir, trocamos fácil.</p><p>Você tem <strong>30 dias</strong> corridos após o recebimento para solicitar a troca ou devolução gratuita, desde que a peça não tenha sido usada ou lavada.</p></div> };
        case 'faq':
            return { title: "Perguntas Frequentes", type: 'support', content: <div className="space-y-4"><p><strong>As camisetas encolhem?</strong><br/>Nossas peças são pré-encolhidas, mas como é algodão 100%, recomendamos não usar secadora em alta temperatura.</p><p><strong>Onde as árvores são plantadas?</strong><br/>Atualmente focamos em projetos no Brasil (Mata Atlântica), Madagascar e Indonésia.</p></div> };
        
        // --- EMPRESA ---
        case 'find_store':
            return { title: "Encontrar Loja", type: 'company', content: <div className="space-y-4"><p>Nascemos no digital, mas estamos expandindo! Visite nosso showroom sustentável:</p><p>Rua da Natureza, 123 - Pinheiros, São Paulo - SP</p></div> };
        case 'size_guide':
            return { title: "Guia de Tamanhos", type: 'company', content: <div className="space-y-4"><p>Nossa modelagem é Regular Fit.</p><ul className="list-disc pl-5"><li><strong>P:</strong> Altura 70cm / Largura 50cm</li><li><strong>M:</strong> Altura 72cm / Largura 52cm</li><li><strong>G:</strong> Altura 74cm / Largura 54cm</li><li><strong>GG:</strong> Altura 76cm / Largura 56cm</li></ul></div> };
        case 'trade_program':
            return { title: "Programa de Troca", type: 'company', content: <div className="space-y-4"><p>Sua camiseta EarthFirst ficou velha? Não jogue fora!</p><p>Envie de volta para nós para reciclagem têxtil e ganhe R$ 20 de crédito na compra de uma nova. Fechamos o ciclo.</p></div> };
        case 'reseller':
            return { title: "Seja um Revendedor", type: 'company', content: <div className="space-y-4"><p>Leve a EarthFirst para sua loja multimarca.</p><p>Oferecemos condições especiais para atacado a partir de 20 peças. Cadastre seu CNPJ entrando em contato pelo e-mail atacado@earthfirst.com.br.</p></div> };
        case 'corporate':
            return { title: "Pedidos Corporativos", type: 'company', content: <div className="space-y-4"><p>Uniformes sustentáveis para sua empresa.</p><p>Personalizamos nossas camisetas com a sua marca. Mostre o compromisso da sua empresa com o meio ambiente.</p></div> };
        case 'careers':
            return { title: "Trabalhe Conosco", type: 'company', content: <div className="space-y-4"><p>Estamos sempre buscando talentos que queiram mudar o mundo.</p><p>Vagas abertas:</p><ul className="list-disc pl-5"><li>Desenvolvedor Front-end</li><li>Designer de Moda Sustentável</li><li>Especialista em Logística Verde</li></ul><p>Envie seu CV para rh@earthfirst.com.br</p></div> };
        
        default:
            return { title: "Informação", type: 'company', content: <p>Conteúdo não encontrado.</p> };
      }
  };

  const currentModalContent = getModalContent(infoModalKey);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Filtro de produtos baseado na categoria selecionada
  let categoryProducts: Product[] = [];
  
  if (selectedCategory) {
      if (selectedCategory === 'Todos os Produtos') {
          categoryProducts = ALL_PRODUCTS;
      } else {
          categoryProducts = ALL_PRODUCTS.filter(p => 
              p.category === selectedCategory || 
              selectedCategory.includes(p.category) || 
              p.category.includes(selectedCategory)
          );
      }
  }
  
  const displayProducts = categoryProducts.length > 0 ? categoryProducts : ALL_PRODUCTS;

  return (
    <div className="min-h-screen bg-white font-sans text-brand-dark antialiased">
      <Header 
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)}
        onNavigate={handleNavigateToCategory}
        onLogoClick={handleBackToHome}
        onLoginClick={handleOpenLogin}
        currentUser={currentUser}
      />
      
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        currentUser={currentUser}
        onLoginRequest={() => {
            setIsCartOpen(false); // Fecha o carrinho para abrir o login
            setTimeout(handleOpenLogin, 300);
        }}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
        onLogout={handleLogout}
        currentUser={currentUser}
        initialView={loginInitialView}
      />

      {/* Modal Genérico de Informações */}
      <InfoModal 
        isOpen={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
        title={currentModalContent.title}
        type={currentModalContent.type}
        content={currentModalContent.content}
      />

      {/* Modal de Assinatura */}
      <SubscriptionModal 
        isOpen={subscriptionModalOpen}
        onClose={() => setSubscriptionModalOpen(false)}
      />

      <main>
        {selectedProduct ? (
          <ProductDetail 
            product={selectedProduct} 
            onBack={selectedCategory ? () => setSelectedProduct(null) : handleBackToHome} 
            onAddToCart={handleAddToCart}
            currentUser={currentUser}
            onOpenLogin={handleOpenLogin}
          />
        ) : selectedCategory ? (
            <CategoryPage 
                category={selectedCategory}
                products={displayProducts}
                onProductClick={handleProductClick}
                onBack={handleBackToHome}
            />
        ) : (
          <>
            <Hero 
              onViewAll={() => handleNavigateToCategory('Todos os Produtos')} 
            />
            <ProductCarousel 
              title="Novidades" 
              products={NEW_ARRIVALS} 
              onProductClick={handleProductClick}
              onCategoryClick={handleNavigateToCategory}
            />
            <CategoryGrid 
              categories={CATEGORIES} 
              onCategoryClick={handleNavigateToCategory}
            />
            <ImpactBanner 
                onImpactClick={() => handleOpenInfo('impact')}
                onCottonClick={() => handleOpenInfo('cotton')}
            />
            <RewardsSection 
              onRegister={handleOpenRegister}
              onLogin={handleOpenLogin}
            />
            <ProductCarousel 
              title="Mais Vendidos" 
              products={BESTSELLERS} 
              onProductClick={handleProductClick}
              onCategoryClick={handleNavigateToCategory}
            />
          </>
        )}
      </main>
      <Footer 
        onOpenLink={handleOpenInfo}
        onOpenSubscription={() => setSubscriptionModalOpen(true)}
      />
    </div>
  );
}

export default App;