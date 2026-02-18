import React, { useState, useEffect } from 'react';
import type { Product, User, Review } from '../types';
import { Star, Truck, RefreshCw, Ruler, Plus, Minus, Sprout, ArrowLeft, AlertCircle, MessageSquare, Send } from 'lucide-react';
import { getProductReviews, addReview } from '../utils/storage';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, size: string) => void;
  currentUser: User | null;
  onOpenLogin?: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart, currentUser, onOpenLogin }) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [mainImage, setMainImage] = useState(product.image);
  const [openSection, setOpenSection] = useState<string | null>('details');
  const [showError, setShowError] = useState(false);
  
  // Review State
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Carregar reviews e resetar imagem ao montar ou mudar produto
  useEffect(() => {
    setReviews(getProductReviews(product.id));
    setMainImage(product.image); // Atualiza a imagem principal se o produto mudar
    setNewComment('');
    setNewRating(5);
    setSelectedSize('');
    setShowError(false);
  }, [product.id, product.image]);

  // Simular galeria de imagens baseada na imagem principal
  const images = [
    product.image,
    `https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&q=80&w=400`,
    `https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=400`,
    `https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=400`,
  ];

  const sizes = ['PP', 'P', 'M', 'G', 'GG'];

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
        setShowError(true);
        // Scroll to size selector if needed
        return;
    }
    setShowError(false);
    onAddToCart(product, selectedSize);
  };

  const handleSizeSelect = (size: string) => {
      setSelectedSize(size);
      setShowError(false);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
      e.preventDefault();
      if (!currentUser || !newComment.trim()) return;

      setIsSubmittingReview(true);
      
      // Simula delay de rede
      setTimeout(() => {
          const review: Review = {
              id: crypto.randomUUID(),
              productId: product.id,
              userName: currentUser.name,
              rating: newRating,
              comment: newComment,
              date: new Date().toLocaleDateString('pt-BR')
          };

          addReview(review);
          setReviews(prev => [...prev, review]); // Atualiza lista localmente
          setNewComment('');
          setNewRating(5);
          setIsSubmittingReview(false);
      }, 600);
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-6 md:py-8 animate-fade-in">
      {/* Breadcrumb e Voltar */}
      <button 
        onClick={onBack} 
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand-dark mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar para Loja
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Coluna Esquerda: Galeria */}
        <div className="flex flex-col-reverse md:flex-row gap-4 items-start">
          {/* Thumbnails - Horizontal scroll on mobile */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible no-scrollbar w-full md:w-auto pb-2 md:pb-0">
            {images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setMainImage(img)}
                className={`min-w-[70px] w-[70px] h-[90px] md:w-20 md:h-24 border rounded-sm ${mainImage === img ? 'border-brand-dark ring-1 ring-brand-dark' : 'border-gray-200'} hover:border-gray-400 transition-all flex-shrink-0`}
              >
                <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          {/* Imagem Principal */}
          <div className="flex-1 bg-gray-100 relative w-full lg:max-w-lg rounded-sm overflow-hidden">
            <div className="aspect-[3/4] w-full">
               <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {product.salePrice && (
                 <span className="absolute top-2 left-2 bg-brand-sale text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
                     Oferta
                 </span>
             )}
          </div>
        </div>

        {/* Coluna Direita: Informações */}
        <div className="flex flex-col">
          <div className="flex justify-between items-start mb-2">
             <span className="text-xs text-gray-500 uppercase tracking-widest bg-gray-100 px-2 py-1 rounded">Sustentável</span>
             <div className="flex items-center text-brand-dark">
                <Star className="w-4 h-4 fill-current text-brand-dark" />
                <span className="ml-1 text-xs font-bold">{product.rating}</span>
                <span className="mx-2 text-gray-300">|</span>
                <span className="text-xs underline cursor-pointer hover:text-brand-green" onClick={() => toggleSection('reviews')}>{reviews.length > 0 ? reviews.length : product.reviews} Avaliações</span>
             </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-serif font-medium text-brand-dark mb-2 leading-tight">{product.name}</h1>
          
          <div className="text-xl mb-6 flex items-center gap-3">
             {product.salePrice ? (
               <>
                 <span className="text-brand-sale font-bold">R$ {product.salePrice.toFixed(2)}</span>
                 <span className="text-gray-400 line-through text-lg">R$ {product.price.toFixed(2)}</span>
               </>
             ) : (
               <span className="font-bold">R$ {product.price.toFixed(2)}</span>
             )}
          </div>

          {/* Seleção de Cor */}
          <div className="mb-6">
            <span className="text-sm font-bold mb-2 block">Cor: <span className="font-normal text-gray-600">Multicolor</span></span>
            <div className="flex gap-3">
              {product.colors.map((color, idx) => (
                <button 
                  key={idx}
                  className="w-9 h-9 rounded-full border border-gray-300 ring-2 ring-transparent hover:ring-gray-300 focus:ring-brand-dark transition-all shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Seleção de Tamanho */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${showError ? 'text-red-600' : ''}`}>Tamanho</span>
                    {showError && <span className="text-xs text-red-600 font-medium animate-pulse flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Obrigatório</span>}
                </div>
                <button className="flex items-center gap-1 text-xs text-gray-500 underline">
                    <Ruler className="w-3 h-3" /> Guia de Medidas
                </button>
            </div>
            <div className="flex gap-3 flex-wrap">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className={`w-12 h-12 flex items-center justify-center border text-sm transition-all rounded-sm
                    ${selectedSize === size 
                      ? 'bg-brand-dark text-white border-brand-dark shadow-md transform scale-105' 
                      : showError 
                        ? 'bg-red-50 text-red-600 border-red-300 hover:border-red-400'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-brand-dark'
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {showError && <p className="text-xs text-red-500 mt-2">Por favor, selecione um tamanho para continuar.</p>}
          </div>

          {/* Botão de Compra - Sticky on mobile bottom if wanted, but here keeping generic */}
          <button 
            onClick={handleAddToCart}
            className="w-full bg-brand-green text-white py-4 uppercase text-sm font-bold tracking-widest hover:bg-[#2d4433] transition-colors mb-4 flex justify-center items-center gap-2 shadow-lg rounded-sm"
          >
            Adicionar à Sacola
          </button>
          
          <div className="bg-[#f5f5f0] p-3 flex items-center justify-center gap-2 text-xs font-bold text-brand-green uppercase tracking-wide mb-8 rounded-sm">
             <Sprout className="w-4 h-4" />
             Cada camiseta planta 10 árvores
          </div>

          {/* Accordions */}
          <div className="border-t border-gray-200">
            {/* Detalhes */}
            <div className="border-b border-gray-200">
                <button 
                    onClick={() => toggleSection('details')}
                    className="w-full py-4 flex justify-between items-center text-left hover:text-brand-green transition-colors"
                >
                    <span className="font-serif font-medium">Detalhes do Produto</span>
                    {openSection === 'details' ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>
                {openSection === 'details' && (
                    <div className="pb-4 text-sm text-gray-600 leading-relaxed animate-fade-in">
                        <p>A camiseta essencial para o seu guarda-roupa. Com um caimento clássico e toque super macio, esta peça é feita para durar e acompanhar você em todos os momentos.</p>
                        <ul className="list-disc list-inside mt-4 space-y-1 pl-1">
                            <li>100% Algodão Orgânico Certificado</li>
                            <li>Pré-encolhida para manter o tamanho</li>
                            <li>Costuras reforçadas</li>
                            <li>Produção ética e sustentável</li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Envio */}
            <div className="border-b border-gray-200">
                <button 
                    onClick={() => toggleSection('shipping')}
                    className="w-full py-4 flex justify-between items-center text-left hover:text-brand-green transition-colors"
                >
                    <span className="font-serif font-medium">Envio e Devoluções</span>
                    {openSection === 'shipping' ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>
                {openSection === 'shipping' && (
                    <div className="pb-4 text-sm text-gray-600 leading-relaxed">
                        <div className="flex items-center gap-2 mb-2">
                            <Truck className="w-4 h-4" /> <span>Frete Grátis acima de R$ 300</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <RefreshCw className="w-4 h-4" /> <span>Devolução gratuita em até 30 dias</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Avaliações */}
            <div className="border-b border-gray-200">
                <button 
                    onClick={() => toggleSection('reviews')}
                    className="w-full py-4 flex justify-between items-center text-left hover:text-brand-green transition-colors"
                >
                    <div className="flex items-center gap-2">
                        <span className="font-serif font-medium">Avaliações</span>
                        <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full font-bold">{reviews.length}</span>
                    </div>
                    {openSection === 'reviews' ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>
                
                {openSection === 'reviews' && (
                    <div className="pb-6 animate-fade-in">
                        
                        {/* Lista de Comentários */}
                        {reviews.length > 0 ? (
                            <div className="space-y-6 mb-8">
                                {reviews.map((review) => (
                                    <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-bold text-sm text-brand-dark">{review.userName}</h4>
                                                <span className="text-xs text-gray-400">{review.date}</span>
                                            </div>
                                            <div className="flex text-brand-green">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-200 fill-gray-200'}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 italic">"{review.comment}"</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 italic mb-6">Seja o primeiro a avaliar este produto!</p>
                        )}

                        {/* Formulário de Novo Comentário */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-bold text-sm text-brand-dark mb-3 flex items-center gap-2">
                                <MessageSquare className="w-4 h-4" /> Deixe sua avaliação
                            </h4>
                            
                            {currentUser ? (
                                <form onSubmit={handleSubmitReview}>
                                    <div className="mb-3">
                                        <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Sua Nota</label>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button 
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setNewRating(star)}
                                                    className="focus:outline-none transition-transform hover:scale-110 p-1"
                                                >
                                                    <Star className={`w-6 h-6 ${star <= newRating ? 'text-brand-green fill-current' : 'text-gray-300'}`} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Seu Comentário</label>
                                        <textarea
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            required
                                            placeholder="O que você achou do tecido e caimento?"
                                            className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:border-brand-green min-h-[80px]"
                                        />
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={isSubmittingReview || !newComment.trim()}
                                        className="bg-brand-dark text-white px-4 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-50 w-full justify-center rounded-sm"
                                    >
                                        {isSubmittingReview ? 'Enviando...' : 'Publicar Avaliação'}
                                        {!isSubmittingReview && <Send className="w-3 h-3" />}
                                    </button>
                                </form>
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-sm text-gray-600 mb-3">Você precisa estar logado para avaliar.</p>
                                    <button 
                                        onClick={onOpenLogin}
                                        className="text-brand-green font-bold text-xs uppercase underline hover:text-brand-dark p-2"
                                    >
                                        Entrar na conta
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};