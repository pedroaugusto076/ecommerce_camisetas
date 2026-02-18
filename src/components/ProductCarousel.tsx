import React, { useRef } from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ProductCarouselProps {
  title: string;
  products: Product[];
  onProductClick?: (product: Product) => void;
  onCategoryClick?: (category: string) => void;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ title, products, onProductClick, onCategoryClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      if (typeof scrollRef.current.scrollBy === 'function') {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <section className="py-8 md:py-16 relative z-30 bg-white border-b border-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 md:mb-8 gap-3 md:gap-4">
            <div className="w-full md:w-auto">
            <h2 className="text-xl md:text-3xl font-serif font-medium text-brand-dark mb-3 md:mb-4">{title}</h2>
            
            <div className="flex gap-4 md:gap-6 text-xs font-bold uppercase tracking-widest text-gray-500 overflow-x-auto no-scrollbar pb-2 md:pb-0 w-full">
                <button 
                    onClick={() => onCategoryClick && onCategoryClick('Feminino')}
                    className="whitespace-nowrap hover:text-brand-dark transition-colors pb-1 hover:border-b-2 hover:border-brand-dark"
                >
                    Feminino
                </button>
                <button 
                    onClick={() => onCategoryClick && onCategoryClick('Masculino')}
                    className="whitespace-nowrap hover:text-brand-dark transition-colors pb-1 hover:border-b-2 hover:border-brand-dark"
                >
                    Masculino
                </button>
                <button 
                    onClick={() => onCategoryClick && onCategoryClick('Acessórios')}
                    className="whitespace-nowrap hover:text-brand-dark transition-colors pb-1 hover:border-b-2 hover:border-brand-dark"
                >
                    Acessórios
                </button>
            </div>
            </div>
            
            <div className="hidden md:flex gap-2">
            <button 
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600"
            >
                <ArrowLeft className="w-5 h-5" />
            </button>
            <button 
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600"
            >
                <ArrowRight className="w-5 h-5" />
            </button>
            </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-3 md:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar px-4 md:px-8 pb-4 md:pb-8"
      >
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onClick={onProductClick}
          />
        ))}
        <div className="w-1 flex-shrink-0" />
      </div>
    </section>
  );
};