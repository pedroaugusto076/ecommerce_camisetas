import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface FooterProps {
  onOpenLink: (key: string) => void;
  onOpenSubscription: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLink, onOpenSubscription }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
        setIsSubscribed(true);
        setEmail('');
    }
  };

  return (
    <footer className="bg-[#f9f9f9] pt-12 md:pt-16 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-16">
            <div className="flex flex-col gap-6">
                <div className="space-y-4">
                    <h5 className="font-bold text-sm text-gray-900 uppercase tracking-wide">Sua Floresta</h5>
                    <p className="text-sm text-gray-600 leading-relaxed">Registre árvores e ganhe sua própria ilha de floresta virtual que muda conforme você planta.</p>
                    <button 
                        onClick={() => onOpenLink('virtual_forest')}
                        className="text-sm underline font-medium hover:text-brand-green text-left inline-block"
                    >
                        Saiba mais →
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-2 opacity-80">
                     <div className="h-10 border border-gray-300 flex items-center justify-center text-[9px] uppercase tracking-wider text-center p-1 rounded font-bold text-gray-500">Empresa B</div>
                     <div className="h-10 border border-gray-300 flex items-center justify-center text-[9px] uppercase tracking-wider text-center p-1 rounded font-bold text-gray-500">Carbono Neutro</div>
                </div>
            </div>

            <div>
                <h4 className="font-bold text-sm uppercase tracking-widest mb-4 md:mb-6 text-brand-dark">Suporte</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                    <li><button onClick={() => onOpenLink('contact')} className="hover:text-brand-green text-left w-full py-1">Contato</button></li>
                    <li><button onClick={() => onOpenLink('help_center')} className="hover:text-brand-green text-left w-full py-1">Central de Ajuda</button></li>
                    <li><button onClick={() => onOpenLink('shipping')} className="hover:text-brand-green text-left w-full py-1">Envio</button></li>
                    <li><button onClick={() => onOpenLink('returns')} className="hover:text-brand-green text-left w-full py-1">Trocas e Devoluções</button></li>
                    <li><button onClick={() => onOpenLink('faq')} className="hover:text-brand-green text-left w-full py-1">Perguntas Frequentes</button></li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-sm uppercase tracking-widest mb-4 md:mb-6 text-brand-dark">Empresa</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                    <li><button onClick={() => onOpenLink('find_store')} className="hover:text-brand-green text-left w-full py-1">Encontrar Loja</button></li>
                    <li><button onClick={() => onOpenLink('size_guide')} className="hover:text-brand-green text-left w-full py-1">Guia de Tamanhos</button></li>
                    <li><button onClick={() => onOpenLink('trade_program')} className="hover:text-brand-green text-left w-full py-1">Programa de Troca</button></li>
                    <li><button onClick={() => onOpenLink('reseller')} className="hover:text-brand-green text-left w-full py-1">Seja um Revendedor</button></li>
                    <li><button onClick={() => onOpenLink('corporate')} className="hover:text-brand-green text-left w-full py-1">Pedidos Corporativos</button></li>
                    <li><button onClick={() => onOpenLink('careers')} className="hover:text-brand-green text-left w-full py-1">Carreiras</button></li>
                </ul>
            </div>

            <div>
                 <h4 className="font-bold text-sm uppercase tracking-widest mb-3 text-brand-dark">Plantio Mensal</h4>
                 <p className="text-sm text-gray-600 mb-3 leading-relaxed">Plante árvores automaticamente para ajudar o planeta.</p>
                 <button 
                    onClick={onOpenSubscription}
                    className="text-sm font-bold underline mb-8 block hover:text-brand-green text-left"
                 >
                    Assine Agora →
                 </button>

                 <h4 className="font-bold text-sm uppercase tracking-widest mb-3 text-brand-dark">Newsletter</h4>
                 <p className="text-sm text-gray-600 mb-3">Ganhe 15% de desconto na primeira compra!</p>
                 
                 {isSubscribed ? (
                     <div className="bg-green-50 border border-green-200 rounded p-4 animate-fade-in">
                        <div className="flex items-center gap-2 text-green-800 font-bold text-sm mb-1">
                            <CheckCircle className="w-4 h-4" /> Inscrito!
                        </div>
                        <p className="text-xs text-green-700">
                            Confira seu e-mail em breve.
                        </p>
                     </div>
                 ) : (
                     <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                         <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Seu e-mail" 
                            className="flex-1 min-w-0 border border-gray-300 px-3 py-3 text-sm focus:outline-none focus:border-brand-green rounded-sm" 
                         />
                         <button 
                            type="submit"
                            className="bg-[#3e5c46] text-white px-4 py-3 text-xs font-bold uppercase hover:bg-[#2d4433] transition-colors rounded-sm"
                         >
                            OK
                         </button>
                     </form>
                 )}
            </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500 text-center md:text-left">
            <p className="max-w-md">
                Reconhecemos que nossa empresa opera em territórios ancestrais.
            </p>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <button onClick={() => onOpenLink('privacy')} className="hover:underline">Política de Privacidade</button>
                <button onClick={() => onOpenLink('terms')} className="hover:underline">Termos e Condições</button>
                <span>© 2026 Loja EarthFirst</span>
            </div>
        </div>
      </div>
    </footer>
  );
};