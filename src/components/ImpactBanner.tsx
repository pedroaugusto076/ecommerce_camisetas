import React from 'react';

interface ImpactBannerProps {
  onImpactClick?: () => void;
  onCottonClick?: () => void;
}

export const ImpactBanner: React.FC<ImpactBannerProps> = ({ onImpactClick, onCottonClick }) => {
  return (
    <div className="mt-8 relative z-10">
      {/* Barra de Contagem */}
      <div className="bg-[#3e5c46] text-white py-4 overflow-hidden relative shadow-lg">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-2">
            <div className="flex gap-8 text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-80">
                <span>Juntos Plantamos</span>
                <span className="hidden md:inline">Árvores</span>
            </div>
            <div className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-brand-lightGreen">
                117.846.160
            </div>
             <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest opacity-80">
                <span>Juntos Plantamos</span>
                <span>Árvores</span>
            </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="bg-[#f5f5f0]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Texto */}
            <div className="p-8 md:p-12 lg:p-24 flex flex-col justify-center items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
                <h2 className="text-3xl md:text-5xl font-serif font-medium text-brand-dark mb-6 leading-tight">
                    Cada Camiseta <br className="hidden md:block"/> Planta 10 Árvores
                </h2>
                <p className="text-gray-700 leading-relaxed mb-8 max-w-md text-sm md:text-base">
                    Junte-se a nós na missão de vestir o mundo de forma consciente. Nossas camisetas são feitas com algodão orgânico que economiza água e não usa pesticidas.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <button 
                        onClick={onImpactClick}
                        className="bg-[#3e5c46] text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#2d4433] transition-colors w-full sm:w-auto text-center shadow-md"
                    >
                        Nosso Impacto
                    </button>
                    <button 
                        onClick={onCottonClick}
                        className="bg-transparent border border-[#3e5c46] text-[#3e5c46] px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#3e5c46] hover:text-white transition-colors w-full sm:w-auto text-center"
                    >
                        Sobre o Algodão
                    </button>
                </div>
            </div>
            
            {/* Imagens */}
            <div className="relative h-[300px] md:h-[400px] lg:h-auto overflow-hidden order-1 lg:order-2">
                <div className="grid grid-cols-2 h-full">
                    <img 
                        src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=600" 
                        className="w-full h-full object-cover" 
                        alt="Mãos plantando árvore" 
                    />
                    <img 
                        src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=600" 
                        className="w-full h-full object-cover translate-y-4 md:translate-y-12" 
                        alt="Floresta Verde" 
                    />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};