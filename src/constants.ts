import type { Product, Category, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Masculino', href: '#' },
  { label: 'Feminino', href: '#' },
  { label: 'Estampadas', href: '#' },
  { label: 'Básicas', href: '#' },
  { label: 'Packs', href: '#' },
];

export const NEW_ARRIVALS: Product[] = [
  {
    id: '1',
    name: 'Camiseta Essential Organic',
    price: 89.00,
    salePrice: 79.90,
    currency: 'BRL',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
    colors: ['#FFFFFF', '#000000', '#AEC6CF'],
    reviews: 45,
    rating: 4.8,
    isNew: true,
    category: 'Feminino'
  },
  {
    id: '2',
    name: 'T-Shirt Gola V Classic',
    price: 79.00,
    currency: 'BRL',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=800',
    colors: ['#36516d', '#CFCFC4'],
    reviews: 28,
    rating: 4.5,
    isNew: true,
    category: 'Masculino'
  },
  {
    id: '3',
    name: 'Camiseta Vintage Wash',
    price: 98.00,
    currency: 'BRL',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800',
    colors: ['#1a1a1a', '#808080'],
    reviews: 112,
    rating: 4.9,
    isNew: true,
    category: 'Masculino'
  },
  {
    id: '4',
    name: 'Camiseta Estampa Floresta',
    price: 109.00,
    salePrice: 89.00,
    currency: 'BRL',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800',
    colors: ['#F5F5DC', '#1a1a1a'],
    reviews: 65,
    rating: 4.7,
    category: 'Estampadas'
  },
  {
    id: '5',
    name: 'Baby Look Soft Cotton',
    price: 69.00,
    salePrice: 59.00,
    currency: 'BRL',
    image: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&q=80&w=800',
    colors: ['#8b4513', '#FFFFFF'],
    reviews: 89,
    rating: 4.6,
    category: 'Feminino'
  },
  {
    id: '6',
    name: 'Camiseta TreeBlend Logo',
    price: 85.00,
    currency: 'BRL',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800',
    colors: ['#2e8b57', '#ffffff'],
    reviews: 227,
    rating: 4.9,
    category: 'Estampadas'
  }
];

export const CATEGORIES: Category[] = [
  { id: '1', name: "Feminino", image: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&q=80&w=600', link: '#' },
  { id: '2', name: "Masculino", image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600', link: '#' },
  { id: '3', name: "Estampadas", image: 'https://images.unsplash.com/photo-1503341455253-b2e72333dbdb?auto=format&fit=crop&q=80&w=600', link: '#' },
  { id: '4', name: "Básicas", image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=600', link: '#' },
  { id: '5', name: "Manga Longa", image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=600', link: '#' },
  { id: '6', name: "Edição Limitada", image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=600', link: '#' },
];

export const BESTSELLERS: Product[] = [
  {
    id: '7',
    name: 'Camiseta Heavy Weight',
    price: 119.00,
    currency: 'BRL',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=800',
    colors: ['#d2b48c', '#000000'],
    reviews: 54,
    rating: 4.8,
    category: 'Masculino'
  },
  {
    id: '8',
    name: 'Camiseta Save The Ocean',
    price: 95.00,
    salePrice: 85.00,
    currency: 'BRL',
    image: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&q=80&w=800',
    colors: ['#006400', '#1a1a1a', '#ffffff'],
    reviews: 179,
    rating: 4.9,
    category: 'Estampadas'
  },
  {
    id: '9',
    name: 'Camiseta Cropped Hemp',
    price: 75.00,
    currency: 'BRL',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800',
    colors: ['#808080', '#FFFFFF'],
    reviews: 42,
    rating: 4.5,
    category: 'Feminino'
  },
  {
    id: '10',
    name: 'Camiseta Bolso Frontal',
    price: 89.00,
    currency: 'BRL',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800',
    colors: ['#1a1a1a', '#AEC6CF'],
    reviews: 89,
    rating: 4.7,
    category: 'Básicas'
  },
   {
    id: '11',
    name: 'Camiseta Manga Longa Stripe',
    price: 129.00,
    salePrice: 99.00,
    currency: 'BRL',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
    colors: ['#556b2f', '#000000'],
    reviews: 35,
    rating: 4.6,
    category: 'Feminino'
  }
];

// Lista consolidada de produtos para filtro
export const ALL_PRODUCTS = [...NEW_ARRIVALS, ...BESTSELLERS];