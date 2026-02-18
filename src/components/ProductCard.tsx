import React from 'react';
import type { Product } from '../types';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div 
      onClick={() => onClick && onClick(product)}
      className="group min-w-[135px] sm:min-w-[180px] md:min-w-[240px] cursor-pointer flex-shrink-0 snap-start"
    >
      <div className="relative overflow-hidden bg-gray-100 mb-2 md:mb-4 aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.isNew && (
          <span className="absolute top-1.5 left-1.5 bg-white px-1.5 py-0.5 text-[8px] md:text-[10px] uppercase font-bold tracking-wider">
            Novo
          </span>
        )}
      </div>

      <div className="flex gap-1 md:gap-2 mb-1.5 md:mb-2">
        {product.colors.map((color, index) => (
          <div
            key={index}
            className={`w-2.5 h-2.5 md:w-4 md:h-4 rounded-full border border-gray-300 ring-1 ring-transparent hover:ring-gray-400 transition-all`}
            style={{ backgroundColor: color }}
          />
        ))}
        {product.colors.length > 4 && <span className="text-[9px] md:text-xs text-gray-500">+</span>}
      </div>

      <h3 className="text-[11px] md:text-sm font-medium text-gray-900 mb-0.5 md:mb-1 leading-tight line-clamp-2 min-h-[2.5em] md:min-h-0">{product.name}</h3>
      <div className="flex flex-wrap items-baseline gap-1.5 mb-1">
        {product.salePrice ? (
          <>
             <span className="text-xs md:text-sm font-medium text-brand-sale">R$ {product.salePrice.toFixed(2)}</span>
             <span className="text-[10px] md:text-xs text-gray-400 line-through">R$ {product.price.toFixed(2)}</span>
          </>
        ) : (
            <span className="text-xs md:text-sm font-medium text-gray-700">R$ {product.price.toFixed(2)}</span>
        )}
      </div>

      <div className="flex items-center gap-1">
        <div className="flex text-brand-dark">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-2 h-2 md:w-3 md:h-3 ${i < Math.floor(product.rating) ? 'fill-current text-brand-dark' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <span className="text-[9px] md:text-xs text-gray-500 ml-0.5 md:ml-1">({product.reviews})</span>
      </div>
    </div>
  );
};