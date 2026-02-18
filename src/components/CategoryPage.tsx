import React from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ArrowLeft, Filter } from 'lucide-react';

interface CategoryPageProps {
  category: string;
  products: Product[];
  onProductClick: (product: Product) => void;
  onBack: () => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ category, products, onProductClick, onBack }) => {
  return (
    <div className="min-h-screen bg-white animate-fade-in">
      {/* Banner da Categoria */}
      <div className="bg-brand-beige py-12 md:py-20 mb-8">
        <div className="container mx-auto px-4 md:px-8">
           <button 
              onClick={onBack} 
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand-dark mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar para Início
            </button>
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-brand-dark mb-4">{category}</h1>
            <p className="text-gray-600 max-w-2xl">
              Explore nossa coleção sustentável de {category.toLowerCase()}. 
              Cada peça é feita com materiais éticos e cada compra planta 10 árvores.
            </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 pb-16">
        {/* Controles / Filtros (Visual apenas) */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
            <span className="text-sm text-gray-500">{products.length} produtos encontrados</span>
            <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-brand-green">
                <Filter className="w-4 h-4" /> Filtrar e Ordenar
            </button>
        </div>

        {/* Grid de Produtos */}
        {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((product) => (
                <ProductCard 
                key={product.id} 
                product={product} 
                onClick={onProductClick}
                />
            ))}
            </div>
        ) : (
            <div className="text-center py-20 bg-gray-50 rounded-lg">
                <p className="text-xl font-serif text-gray-500 mb-2">Nenhum produto encontrado nesta categoria.</p>
                <button onClick={onBack} className="text-brand-green font-bold underline">Voltar para ver tudo</button>
            </div>
        )}
      </div>
    </div>
  );
};