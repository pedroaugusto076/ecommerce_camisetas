import React, { useState } from 'react';
import { X, TreePine, Check, CreditCard, Lock, Calendar } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Plan = 'seed' | 'root' | 'forest';
type Step = 'select' | 'payment' | 'success';

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<Step>('select');
  const [selectedPlan, setSelectedPlan] = useState<Plan>('root');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const plans = {
    seed: { name: 'Semente', price: 19.90, trees: 5, color: 'bg-green-100' },
    root: { name: 'Raiz', price: 39.90, trees: 12, color: 'bg-green-200' },
    forest: { name: 'Floresta', price: 89.90, trees: 30, color: 'bg-green-300' }
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
        setIsProcessing(false);
        setStep('success');
    }, 2000);
  };

  const handleClose = () => {
      onClose();
      // Resetar estado após fechar (com delay visual)
      setTimeout(() => {
          setStep('select');
          setSelectedPlan('root');
      }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      <div className="relative bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">
        <div className="p-6 bg-[#3e5c46] text-white flex justify-between items-center">
           <div className="flex items-center gap-3">
              <TreePine className="w-6 h-6" />
              <h2 className="font-serif text-xl font-bold">Assinatura de Plantio</h2>
           </div>
           <button onClick={handleClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
             <X className="w-5 h-5" />
           </button>
        </div>

        <div className="p-6 overflow-y-auto">
            {step === 'select' && (
                <div className="space-y-6">
                    <p className="text-gray-600 text-sm text-center">
                        Escolha quantas árvores você quer plantar por mês automaticamente.
                    </p>

                    <div className="space-y-3">
                        {(Object.keys(plans) as Plan[]).map((key) => (
                            <div 
                                key={key}
                                onClick={() => setSelectedPlan(key)}
                                className={`border-2 rounded-lg p-4 cursor-pointer transition-all flex justify-between items-center ${selectedPlan === key ? 'border-brand-green bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
                            >
                                <div>
                                    <h3 className="font-bold text-brand-dark">Plano {plans[key].name}</h3>
                                    <p className="text-sm text-gray-500">{plans[key].trees} árvores / mês</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-brand-green">R$ {plans[key].price.toFixed(2)}</p>
                                    <p className="text-xs text-gray-400">mensal</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button 
                        onClick={() => setStep('payment')}
                        className="w-full bg-brand-dark text-white py-3 font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-colors"
                    >
                        Continuar para Pagamento
                    </button>
                </div>
            )}

            {step === 'payment' && (
                <form onSubmit={handlePayment} className="space-y-4">
                     <div className="bg-gray-50 p-4 rounded text-center mb-4">
                        <p className="text-xs text-gray-500 uppercase font-bold">Resumo</p>
                        <p className="text-lg font-bold text-brand-dark">Plano {plans[selectedPlan].name}</p>
                        <p className="text-brand-green">R$ {plans[selectedPlan].price.toFixed(2)} / mês</p>
                     </div>

                     <div>
                        <label className="text-xs font-bold uppercase text-gray-600">Número do Cartão</label>
                        <div className="relative mt-1">
                            <input required type="text" placeholder="0000 0000 0000 0000" className="w-full border p-2 pl-9 rounded text-sm outline-none focus:border-brand-green" />
                            <CreditCard className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                        </div>
                     </div>
                     
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold uppercase text-gray-600">Validade</label>
                            <div className="relative mt-1">
                                <input required type="text" placeholder="MM/AA" className="w-full border p-2 pl-9 rounded text-sm outline-none focus:border-brand-green" />
                                <Calendar className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold uppercase text-gray-600">CVV</label>
                            <div className="relative mt-1">
                                <input required type="text" placeholder="123" className="w-full border p-2 pl-9 rounded text-sm outline-none focus:border-brand-green" />
                                <Lock className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                            </div>
                        </div>
                     </div>

                     <button 
                        type="submit"
                        disabled={isProcessing}
                        className="w-full bg-brand-green text-white py-3 font-bold uppercase tracking-widest text-xs hover:bg-[#2d4433] transition-colors mt-4 flex justify-center items-center gap-2"
                    >
                        {isProcessing ? 'Processando...' : 'Assinar Agora'}
                    </button>
                     <button type="button" onClick={() => setStep('select')} className="w-full text-xs text-gray-500 hover:text-black">Voltar</button>
                </form>
            )}

            {step === 'success' && (
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-brand-green" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-brand-dark mb-2">Assinatura Confirmada!</h3>
                    <p className="text-gray-600 text-sm mb-6">
                        Obrigado por ajudar o planeta a respirar. Você receberá o certificado das suas primeiras árvores por e-mail em breve.
                    </p>
                    <button 
                        onClick={handleClose}
                        className="w-full bg-brand-dark text-white py-3 font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-colors"
                    >
                        Fechar
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};