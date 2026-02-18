import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, Menu, X, Globe, ChevronRight } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onNavigate: (category: string) => void;
  onLogoClick: () => void;
  onLoginClick: () => void;
  currentUser: { name: string; email: string } | null;
}

export const Header: React.FC<HeaderProps> = ({ 
  cartCount, 
  onCartClick, 
  onNavigate, 
  onLogoClick,
  onLoginClick,
  currentUser
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (label: string) => {
    onNavigate(label);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className="bg-[#525252] text-white text-[10px] sm:text-xs text-center py-2 px-4 font-medium tracking-wide truncate">
        PONTOS EM DOBRO
        <span className="mx-2 opacity-50">|</span>
        FRETE GRÁTIS ACIMA DE R$ 500
        <div className="hidden md:flex absolute top-0 right-4 h-full items-center gap-2 cursor-pointer hover:opacity-80">
            <span className="flex items-center gap-1">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg" alt="Brasil" className="w-4 h-auto rounded-sm" />
                 BRL <span className="text-[8px]">▼</span>
            </span>
        </div>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-white py-4'}`}>
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3 md:gap-4">
            <button className="lg:hidden p-1 -ml-1" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="w-6 h-6 text-brand-dark" />
            </button>
            <button onClick={onLogoClick} className="flex items-center gap-1 group">
               <div className="font-serif text-2xl md:text-3xl font-bold tracking-tighter flex items-center">
                 10
               </div>
            </button>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.label)}
                className="text-xs uppercase font-semibold tracking-widest hover:underline underline-offset-4 decoration-2 decoration-brand-green transition-all"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4 sm:gap-6 text-brand-dark">
            <button className="hover:scale-110 transition-transform"><Search className="w-5 h-5 stroke-[1.5]" /></button>
            
            <button 
                onClick={onLoginClick}
                className="hidden sm:flex hover:scale-110 transition-transform items-center gap-2"
            >
                {currentUser ? (
                    <div className="flex items-center gap-2">
                         <div className="w-6 h-6 bg-brand-green text-white rounded-full flex items-center justify-center text-xs font-serif font-bold">
                            {currentUser.name.charAt(0)}
                         </div>
                         <span className="text-xs font-bold max-w-[80px] truncate">{currentUser.name.split(' ')[0]}</span>
                    </div>
                ) : (
                    <User className="w-5 h-5 stroke-[1.5]" />
                )}
            </button>

            <button 
              className="relative hover:scale-110 transition-transform"
              onClick={onCartClick}
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-green text-white text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded-full animate-fade-in">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-[60] transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          
          <div className={`absolute top-0 left-0 w-[85%] max-w-sm h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            
            <div className="p-5 flex justify-between items-center border-b border-gray-100">
                <span className="font-serif text-2xl font-bold">10</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-gray-50 rounded-full">
                    <X className="w-5 h-5 text-gray-500" />
                </button>
            </div>
            
            <div className="p-5 bg-gray-50 border-b border-gray-100">
                <div 
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => {
                        onLoginClick();
                        setMobileMenuOpen(false);
                    }}
                >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${currentUser ? 'bg-brand-green text-white' : 'bg-white text-gray-400 border border-gray-200'}`}>
                        {currentUser ? <span className="font-serif font-bold text-lg">{currentUser.name.charAt(0)}</span> : <User className="w-6 h-6" />}
                    </div>
                    <div className="flex-1">
                        <p className="font-bold text-gray-900">{currentUser ? currentUser.name : 'Olá, Visitante'}</p>
                        <p className="text-xs text-brand-green font-bold uppercase tracking-wide flex items-center gap-1">
                            {currentUser ? 'Ver Minha Conta' : 'Entrar / Cadastrar'} 
                            <ChevronRight className="w-3 h-3" />
                        </p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto p-5 py-6 flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <button 
                  key={item.label} 
                  onClick={() => handleNavClick(item.label)} 
                  className="flex justify-between items-center w-full text-left py-4 border-b border-gray-50 text-lg font-medium text-gray-800 hover:text-brand-green transition-colors group"
                >
                  {item.label}
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-brand-green" />
                </button>
              ))}
            </nav>

            <div className="p-5 bg-gray-50 text-sm text-gray-500 space-y-4">
                <div className="flex items-center gap-2">
                     <Globe className="w-4 h-4"/> Brasil (BRL)
                </div>
                <div className="text-xs opacity-60">
                    © 2026 Loja EarthFirst
                </div>
            </div>
          </div>
      </div>
    </>
  );
};