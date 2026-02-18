import React from 'react';

interface HeroProps {
  onViewAll: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onViewAll }) => {
  return (
    <div className="relative w-full h-[85vh] md:h-[600px] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=1920"
        alt="Camisetas Sustentáveis"
        className="absolute inset-0 w-full h-full object-cover object-center md:object-[center_30%]"
      />
      
      <div className="absolute inset-0 bg-black/40 md:bg-gradient-to-r md:from-black/60 md:to-transparent pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-center md:justify-start">
        <div className="container mx-auto px-4 md:px-8 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="max-w-xl text-white drop-shadow-lg animate-fade-in-up">
            <p className="uppercase text-xs md:text-xs font-bold tracking-[0.2em] mb-3 md:mb-4 text-brand-lightGreen">
              Nova Coleção Basic
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium leading-tight mb-4 md:mb-6">
              A Camiseta Perfeita <br/> Existe.
            </h1>
            <p className="text-sm md:text-base font-medium mb-8 max-w-xs md:max-w-md mx-auto md:mx-0 leading-relaxed text-gray-100">
              Feita com algodão 100% orgânico. Sinta o conforto na pele e o impacto positivo no planeta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button 
                onClick={onViewAll}
                className="bg-white text-brand-dark px-8 py-4 md:py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors w-full sm:w-auto shadow-xl"
              >
                Comprar Agora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};