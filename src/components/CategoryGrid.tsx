import React from 'react';
import type { Category } from '../types';
import { ArrowRight } from 'lucide-react';

interface CategoryGridProps {
  categories: Category[];
  onCategoryClick: (categoryName: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onCategoryClick }) => {
  return (
    <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-8">
             <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl md:text-3xl font-serif font-medium text-brand-dark">Categorias Mais Populares</h2>
                 <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600">
                        <ArrowRight className="w-5 h-5 rotate-180" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600">
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
             </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((cat) => (
                    <div 
                        key={cat.id} 
                        onClick={() => onCategoryClick(cat.name)}
                        className="group block cursor-pointer"
                    >
                        <div className="relative aspect-[3/4] overflow-hidden mb-3">
                            <img 
                                src={cat.image} 
                                alt={cat.name} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <h4 className="text-xs md:text-sm font-medium text-gray-800 group-hover:text-brand-green transition-colors leading-tight">
                            {cat.name}
                        </h4>
                         <span className="text-brand-green text-xs mt-1 inline-block opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                            Comprar Agora →
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};