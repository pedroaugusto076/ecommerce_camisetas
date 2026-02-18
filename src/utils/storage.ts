import { supabase } from '../lib/supabase';
import type { User, Order, Review } from '../types';

const isSupabaseConfigured = () =>
  !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY;

function normalizeEmail(email: string): string {
  return email
    .trim()
    .toLowerCase()
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/\s/g, '');
}

function sessionToUser(session: { user: { id: string; email?: string; user_metadata?: { name?: string } } }): User {
  const u = session.user;
  return {
    id: u.id,
    name: (u.user_metadata?.name as string) || u.email?.split('@')[0] || 'Usuário',
    email: u.email || '',
  };
}

export const signUp = async (name: string, email: string, password: string): Promise<User> => {
  if (!isSupabaseConfigured()) throw new Error('Supabase não configurado. Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env');
  const normalizedEmail = normalizeEmail(email);
  const { data, error } = await supabase.auth.signUp({
    email: normalizedEmail,
    password,
    options: { data: { name } },
  });
  if (error) {
    if (error.message?.toLowerCase().includes('invalid') && error.message?.toLowerCase().includes('email')) {
      throw new Error('E-mail inválido. Verifique o formato (ex: nome@dominio.com).');
    }
    if (error.message?.toLowerCase().includes('rate limit') || error.message?.toLowerCase().includes('rate_limit')) {
      throw new Error('Limite de cadastros atingido. Aguarde alguns minutos ou peça ao administrador configurar Custom SMTP no Supabase (veja SUPABASE_SETUP.md).');
    }
    throw new Error(error.message);
  }
  if (!data.user) throw new Error('Erro ao criar conta.');
  return sessionToUser({ user: data.user });
};

export const signIn = async (email: string, password: string): Promise<User> => {
  if (!isSupabaseConfigured()) throw new Error('Supabase não configurado. Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env');
  const normalizedEmail = normalizeEmail(email);
  const { data, error } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });
  if (error) {
    if (error.message?.toLowerCase().includes('rate limit') || error.message?.toLowerCase().includes('rate_limit')) {
      throw new Error('Limite de tentativas atingido. Aguarde alguns minutos ou configure Custom SMTP no Supabase.');
    }
    throw new Error(error.message);
  }
  if (!data.user) throw new Error('E-mail ou senha inválidos.');
  return sessionToUser({ user: data.user });
};

export const signOut = async () => {
  await supabase.auth.signOut();
};

export const getSession = async (): Promise<User | null> => {
  const { data } = await supabase.auth.getSession();
  if (!data.session?.user) return null;
  return sessionToUser({ user: data.session.user });
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ? sessionToUser({ user: session.user }) : null);
  });
};

export const saveSession = (_user: User) => {};
export const clearSession = () => {};

export const saveUser = async (user: { name: string; email: string; password: string }) => {
  return signUp(user.name, user.email, user.password);
};

export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  try {
    return await signIn(email, password);
  } catch {
    return null;
  }
};

export const saveOrder = async (userId: string, order: Order) => {
  const { error } = await supabase.from('orders').insert({
    id: order.id,
    user_id: userId,
    date: order.date,
    total: order.total,
    items: order.items,
    status: order.status,
  });
  if (error) throw new Error(error.message);
};

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select('id, date, total, items, status')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data || []).map((row) => ({
    id: row.id,
    date: row.date,
    total: Number(row.total),
    items: row.items as Order['items'],
    status: row.status as Order['status'],
  }));
};

const INITIAL_REVIEWS: Review[] = [
  { id: 'r1', productId: '1', userName: 'Maria Silva', rating: 5, comment: 'A melhor camiseta que já comprei! O algodão é incrivelmente macio.', date: '10/02/2024' },
  { id: 'r2', productId: '1', userName: 'Joana D.', rating: 4, comment: 'Linda, mas achei a modelagem um pouco pequena. Recomendo pegar um tamanho maior.', date: '12/02/2024' },
  { id: 'r3', productId: '6', userName: 'Carlos B.', rating: 5, comment: 'Qualidade absurda e ainda ajuda o planeta. Vou comprar de outras cores.', date: '15/02/2024' },
];

export const getProductReviews = async (productId: string): Promise<Review[]> => {
  const { data, error } = await supabase
    .from('reviews')
    .select('id, product_id, user_name, rating, comment, date')
    .eq('product_id', productId)
    .order('created_at', { ascending: false });
  if (error) {
    if (error.code === '42P01' || error.message?.includes('relation')) {
      return INITIAL_REVIEWS.filter((r) => r.productId === productId);
    }
    throw new Error(error.message);
  }
  if (!data || data.length === 0) {
    return INITIAL_REVIEWS.filter((r) => r.productId === productId);
  }
  return data.map((row) => ({
    id: row.id,
    productId: row.product_id,
    userName: row.user_name,
    rating: row.rating,
    comment: row.comment,
    date: row.date,
  }));
};

export const addReview = async (review: Omit<Review, 'id'> & { id?: string }) => {
  const { data: { user } } = await supabase.auth.getUser();
  const { error } = await supabase.from('reviews').insert({
    id: review.id || crypto.randomUUID(),
    product_id: review.productId,
    user_id: user?.id ?? null,
    user_name: review.userName,
    rating: review.rating,
    comment: review.comment,
    date: review.date,
  });
  if (error) throw new Error(error.message);
};
