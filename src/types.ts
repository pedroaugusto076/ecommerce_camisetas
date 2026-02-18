export interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  currency: string;
  image: string;
  colors: string[];
  reviews: number;
  rating: number;
  isNew?: boolean;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  link: string;
}

export interface NavItem {
  label: string;
  href: string;
  highlight?: boolean;
}

export interface CartItem extends Product {
  cartId: string;
  selectedSize: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  items: CartItem[];
  status: 'Aprovado' | 'Em Trânsito' | 'Entregue';
}

export interface User {
  name: string;
  email: string;
  password?: string; // Opcional apenas na interface de display, obrigatório no DB
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}