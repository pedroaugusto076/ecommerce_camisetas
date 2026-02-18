import React from 'react';

interface RewardsSectionProps {
  onRegister: () => void;
  onLogin: () => void;
}

export const RewardsSection: React.FC<RewardsSectionProps> = ({ onRegister, onLogin }) => {
  return (
    <section className="bg-[#3e5c46] text-white py-12 md:py-16 relative overflow-hidden z-10">
        <svg className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,100 Q200,50 400,100 T800,100" stroke="white" fill="none" strokeWidth="2" />
            <path d="M0,200 Q200,150 400,200 T800,200" stroke="white" fill="none" strokeWidth="2" />
        </svg>

        <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-2xl">
                <h2 className="text-2xl md:text-4xl font-serif mb-4">Seja Recompensado por Fazer o Bem</h2>
                <p className="text-white/80 max-w-lg mx-auto lg:mx-0 text-sm md:text-base leading-relaxed">
                    Participe do nosso Programa de Recompensas para ganhar pontos que podem ser usados como dinheiro em compras futuras.
                </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                 <button 
                    onClick={onRegister}
                    className="bg-white text-[#3e5c46] px-8 py-4 md:py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors w-full sm:min-w-[160px] shadow-lg"
                 >
                    Criar Conta
                </button>
                 <button 
                    onClick={onLogin}
                    className="bg-transparent border border-white text-white px-8 py-4 md:py-3 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-[#3e5c46] transition-colors w-full sm:min-w-[160px]"
                 >
                    Entrar para Ver Pontos
                </button>
            </div>
        </div>
    </section>
  );
};