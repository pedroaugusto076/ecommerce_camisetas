import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, Trash2, ArrowRight, ArrowLeft, CreditCard, Lock, Calendar, CheckCircle, ShieldCheck, LogIn } from 'lucide-react';
import type { CartItem, User } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (cartId: string) => void;
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onClearCart: () => void;
  currentUser: User | null;
  onLoginRequest: () => void;
  onCheckoutSuccess: (items: CartItem[], total: number) => void;
}

type CheckoutStep = 'cart' | 'payment' | 'success';

export const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
  currentUser,
  onLoginRequest,
  onCheckoutSuccess
}) => {
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep('cart');
        setIsProcessing(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const subtotal = items.reduce((acc, item) => {
    const price = item.salePrice || item.price;
    return acc + (price * item.quantity);
  }, 0);

  const handleStartCheckout = () => {
    if (!currentUser) {
        onLoginRequest();
    } else {
        setStep('payment');
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      onCheckoutSuccess(items, subtotal);
      onClearCart();
    }, 2000);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      />

      <div 
        className={`fixed top-0 right-0 h-full w-full sm:max-w-md bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {step === 'cart' && (
          <>
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white">
              <h2 className="font-serif text-xl font-medium text-brand-dark">Sua Sacola ({items.reduce((acc, i) => acc + i.quantity, 0)})</h2>
              <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
                  <span className="text-4xl">🍂</span>
                  <p className="font-medium text-lg">Sua sacola está vazia</p>
                  <p className="text-sm text-gray-500 max-w-xs">Parece um bom momento para começar a plantar árvores com suas escolhas.</p>
                  <button onClick={handleClose} className="mt-4 text-brand-green font-bold underline underline-offset-4 p-2">
                    Continuar Comprando
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.cartId} className="flex gap-4 animate-fade-in">
                    <div className="w-24 h-32 flex-shrink-0 bg-gray-100 overflow-hidden rounded-sm">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="font-medium text-brand-dark text-sm leading-tight pr-4">{item.name}</h3>
                            <button 
                            onClick={() => onRemoveItem(item.cartId)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1 -mt-1 -mr-1"
                            >
                            <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">Tam: <span className="font-bold">{item.selectedSize}</span></p>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <div className="flex items-center border border-gray-200 rounded-sm">
                          <button 
                            onClick={() => onUpdateQuantity(item.cartId, -1)}
                            className="p-2 hover:bg-gray-50 text-gray-600 disabled:opacity-30"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.cartId, 1)}
                            className="p-2 hover:bg-gray-50 text-gray-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-medium text-sm">
                          R$ {((item.salePrice || item.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50 pb-8 sm:pb-6">
                <div className="flex justify-between items-center mb-4 text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold text-lg">R$ {subtotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 mb-4 text-center">
                  Frete e impostos calculados no checkout.
                </p>
                <button 
                  onClick={handleStartCheckout}
                  className={`w-full py-4 font-bold uppercase tracking-widest text-xs transition-colors flex justify-center items-center gap-2 shadow-md rounded-sm ${
                    currentUser 
                    ? 'bg-brand-dark text-white hover:bg-gray-800' 
                    : 'bg-brand-green text-white hover:bg-[#2d4433]'
                  }`}
                >
                   {currentUser ? (
                       <>Finalizar Compra <ArrowRight className="w-4 h-4" /></>
                   ) : (
                       <>Login para Finalizar <LogIn className="w-4 h-4" /></>
                   )}
                </button>
              </div>
            )}
          </>
        )}

        {step === 'payment' && (
          <>
             <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <button onClick={() => setStep('cart')} className="p-1 hover:bg-gray-100 rounded-full">
                    <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                <h2 className="font-serif text-xl font-medium text-brand-dark">Pagamento</h2>
              </div>
              <div className="flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-1 rounded-full">
                <Lock className="w-3 h-3" /> Seguro
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 bg-gray-50/50">
                <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Total a Pagar</span>
                        <span className="text-xl font-bold text-brand-dark">R$ {subtotal.toFixed(2)}</span>
                    </div>
                </div>

                <form id="payment-form" onSubmit={handlePaymentSubmit} className="space-y-5 animate-fade-in">
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-600 mb-2">Nome no Cartão</label>
                        <input 
                            required
                            type="text" 
                            placeholder="Como aparece no cartão" 
                            className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-600 mb-2">Número do Cartão</label>
                        <div className="relative">
                            <input 
                                required
                                type="text" 
                                placeholder="0000 0000 0000 0000" 
                                pattern="\d*"
                                maxLength={19}
                                className="w-full border border-gray-300 rounded p-3 pl-10 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all"
                            />
                            <CreditCard className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-600 mb-2">Validade</label>
                            <div className="relative">
                                <input 
                                    required
                                    type="text" 
                                    placeholder="MM/AA" 
                                    maxLength={5}
                                    className="w-full border border-gray-300 rounded p-3 pl-10 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all"
                                />
                                <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-600 mb-2">CVV</label>
                            <div className="relative">
                                <input 
                                    required
                                    type="password" 
                                    placeholder="123" 
                                    maxLength={4}
                                    className="w-full border border-gray-300 rounded p-3 pl-10 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all"
                                />
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
                        <ShieldCheck className="w-4 h-4 text-brand-green" />
                        <span>Dados criptografados de ponta a ponta.</span>
                    </div>
                </form>
            </div>

            <div className="p-6 border-t border-gray-100 bg-white pb-8 sm:pb-6">
                <button 
                  form="payment-form"
                  disabled={isProcessing}
                  className="w-full bg-brand-green text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-[#2d4433] transition-colors flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed rounded-sm shadow-md"
                >
                  {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processando...
                      </span>
                  ) : (
                      `Pagar R$ ${subtotal.toFixed(2)}`
                  )}
                </button>
            </div>
          </>
        )}

        {step === 'success' && (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-fade-in bg-white">
             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-[bounce_1s_infinite]">
                <CheckCircle className="w-10 h-10 text-brand-green" />
             </div>
             
             <h2 className="text-2xl font-serif font-medium text-brand-dark mb-2">Pedido Recebido!</h2>
             <p className="text-gray-500 mb-8 max-w-xs">
                Seu pedido foi confirmado e salvo em sua conta.
             </p>

             <div className="bg-brand-lightGreen p-4 rounded-lg w-full mb-8">
                <p className="text-brand-green font-medium text-sm flex items-center justify-center gap-2">
                    🌱 +{Math.max(10, items.reduce((acc, i) => acc + (i.quantity * 10), 0))} árvores plantadas!
                </p>
             </div>

             <button 
                onClick={handleClose}
                className="w-full bg-brand-dark text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-colors rounded-sm"
             >
                Continuar Comprando
             </button>
          </div>
        )}

      </div>
    </>
  );
};