import type { User, Order, Review } from '../types';

const USERS_KEY = 'earthfirst_users';
const ORDERS_KEY = 'earthfirst_orders';
const CURRENT_USER_KEY = 'earthfirst_current_session';
const REVIEWS_KEY = 'earthfirst_reviews';

// --- USUÁRIOS ---

export const saveUser = (user: User) => {
  const users = getUsers();
  if (users.find(u => u.email === user.email)) {
    throw new Error('E-mail já cadastrado.');
  }
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return user;
};

export const authenticateUser = (email: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    const { password, ...userWithoutPass } = user;
    return userWithoutPass as User;
  }
  return null;
};

export const getUsers = (): User[] => {
  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : [];
};

// --- SESSÃO ---

export const saveSession = (user: User) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const getSession = (): User | null => {
  const stored = localStorage.getItem(CURRENT_USER_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const clearSession = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

// --- PEDIDOS ---

export const saveOrder = (userEmail: string, order: Order) => {
  const allOrders = getAllOrders();
  if (!allOrders[userEmail]) {
    allOrders[userEmail] = [];
  }
  allOrders[userEmail].push(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(allOrders));
};

export const getUserOrders = (userEmail: string): Order[] => {
  const allOrders = getAllOrders();
  return allOrders[userEmail] || [];
};

const getAllOrders = (): Record<string, Order[]> => {
  const stored = localStorage.getItem(ORDERS_KEY);
  return stored ? JSON.parse(stored) : {};
};

// --- AVALIAÇÕES (REVIEWS) ---

const INITIAL_REVIEWS: Review[] = [
    { id: 'r1', productId: '1', userName: 'Maria Silva', rating: 5, comment: 'A melhor camiseta que já comprei! O algodão é incrivelmente macio.', date: '10/02/2024' },
    { id: 'r2', productId: '1', userName: 'Joana D.', rating: 4, comment: 'Linda, mas achei a modelagem um pouco pequena. Recomendo pegar um tamanho maior.', date: '12/02/2024' },
    { id: 'r3', productId: '6', userName: 'Carlos B.', rating: 5, comment: 'Qualidade absurda e ainda ajuda o planeta. Vou comprar de outras cores.', date: '15/02/2024' }
];

export const getProductReviews = (productId: string): Review[] => {
    const stored = localStorage.getItem(REVIEWS_KEY);
    let allReviews: Review[] = stored ? JSON.parse(stored) : [];
    
    // Se for a primeira vez e não tiver nada salvo, usa os iniciais para demo
    if (allReviews.length === 0 && !stored) {
        allReviews = INITIAL_REVIEWS;
        localStorage.setItem(REVIEWS_KEY, JSON.stringify(allReviews));
    }

    return allReviews.filter(r => r.productId === productId);
};

export const addReview = (review: Review) => {
    const stored = localStorage.getItem(REVIEWS_KEY);
    const allReviews: Review[] = stored ? JSON.parse(stored) : [...INITIAL_REVIEWS];
    allReviews.push(review);
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(allReviews));
};