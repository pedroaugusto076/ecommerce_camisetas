import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User as UserIcon, ArrowRight, LogOut, Package, ShoppingBag, ArrowLeft, AlertCircle } from 'lucide-react';
import type { User, Order } from '../types';
import { authenticateUser, saveUser, getUserOrders } from '../utils/storage';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
  onLogout: () => void;
  currentUser: User | null;
  initialView?: 'login' | 'register';
}

type ViewState = 'login' | 'register' | 'profile' | 'orders';

export const LoginModal: React.FC<LoginModalProps> = ({ 
  isOpen, 
  onClose, 
  onLogin, 
  onLogout,
  currentUser,
  initialView = 'login'
}) => {
  const [view, setView] = useState<ViewState>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);

  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // Resetar visualização ao abrir
  useEffect(() => {
    if (isOpen) {
      if (currentUser) {
        setView('profile');
        setOrders(getUserOrders(currentUser.email));
      } else {
        // Usa a prop initialView para decidir se abre em login ou registro
        setView(initialView);
      }
      setError('');
      setEmail('');
      setPassword('');
      setName('');
    }
  }, [isOpen, currentUser, initialView]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
        try {
            if (view === 'register') {
                const newUser = saveUser({ name, email, password });
                onLogin(newUser);
                setView('profile');
            } else {
                const user = authenticateUser(email, password);
                if (!user) throw new Error('E-mail ou senha inválidos.');
                onLogin(user);
                setOrders(getUserOrders(user.email));
                setView('profile');
            }
            onClose(); // Opcional: fechar ao logar, ou manter aberto no perfil
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, 800);
  };

  const handleLogoutClick = () => {
    onLogout();
    setView('login');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
             {view === 'orders' && (
                 <button onClick={() => setView('profile')} className="p-1 -ml-2 hover:bg-gray-100 rounded-full mr-1">
                     <ArrowLeft className="w-5 h-5 text-gray-500" />
                 </button>
             )}
             <h2 className="font-serif text-2xl font-medium text-brand-dark">
                {view === 'profile' && 'Sua Conta'}
                {view === 'orders' && 'Meus Pedidos'}
                {view === 'login' && 'Entrar'}
                {view === 'register' && 'Criar Conta'}
             </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto">
          {/* =========== VIEW: PERFIL =========== */}
          {view === 'profile' && currentUser && (
            <div className="flex flex-col items-center text-center space-y-6 animate-fade-in">
               <div className="w-24 h-24 bg-brand-lightGreen rounded-full flex items-center justify-center mb-2 shadow-inner">
                  <span className="font-serif text-3xl text-brand-green font-bold">
                    {currentUser.name.charAt(0)}
                  </span>
               </div>
               <div>
                 <h3 className="text-xl font-bold text-brand-dark">{currentUser.name}</h3>
                 <p className="text-gray-500">{currentUser.email}</p>
               </div>
               
               <div className="w-full space-y-3 pt-4">
                 <button 
                    onClick={() => setView('orders')}
                    className="w-full py-4 border border-gray-200 text-gray-700 font-bold text-sm uppercase tracking-widest hover:border-brand-dark hover:text-brand-dark transition-colors rounded flex items-center justify-center gap-3"
                 >
                    <Package className="w-4 h-4" /> Meus Pedidos
                 </button>
                 <button 
                    onClick={handleLogoutClick}
                    className="w-full py-4 bg-gray-100 text-red-600 font-bold text-sm uppercase tracking-widest hover:bg-red-50 transition-colors rounded flex items-center justify-center gap-3"
                 >
                    <LogOut className="w-4 h-4" /> Sair da Conta
                 </button>
               </div>
            </div>
          )}

          {/* =========== VIEW: MEUS PEDIDOS =========== */}
          {view === 'orders' && (
              <div className="animate-fade-in space-y-4">
                  {orders.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                          <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-20" />
                          <p>Você ainda não fez nenhum pedido.</p>
                      </div>
                  ) : (
                      orders.slice().reverse().map((order) => (
                          <div key={order.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                              <div className="flex justify-between items-start mb-3 pb-3 border-b border-gray-200">
                                  <div>
                                      <p className="text-xs text-gray-500">Pedido #{order.id.slice(0, 8)}</p>
                                      <p className="text-xs font-bold text-gray-700">{order.date}</p>
                                  </div>
                                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-bold uppercase tracking-wider">
                                      {order.status}
                                  </span>
                              </div>
                              <div className="space-y-2 mb-3">
                                  {order.items.map((item, idx) => (
                                      <div key={idx} className="flex justify-between text-sm">
                                          <span className="text-gray-600">{item.quantity}x {item.name}</span>
                                          <span className="font-medium">R$ {(item.salePrice || item.price).toFixed(2)}</span>
                                      </div>
                                  ))}
                              </div>
                              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                  <span className="text-sm font-bold text-brand-dark">Total</span>
                                  <span className="text-lg font-bold text-brand-dark">R$ {order.total.toFixed(2)}</span>
                              </div>
                          </div>
                      ))
                  )}
              </div>
          )}

          {/* =========== VIEW: LOGIN / REGISTER =========== */}
          {(view === 'login' || view === 'register') && (
            <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
              
              {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {error}
                  </div>
              )}

              {view === 'register' && (
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-600">Nome Completo</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-300 p-3 pl-10 rounded text-sm focus:outline-none focus:border-brand-green transition-all"
                      placeholder="Seu nome"
                    />
                    <UserIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-600">E-mail</label>
                <div className="relative">
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 p-3 pl-10 rounded text-sm focus:outline-none focus:border-brand-green transition-all"
                    placeholder="seu@email.com"
                  />
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <label className="text-xs font-bold uppercase text-gray-600">Senha</label>
                  {view === 'login' && (
                    <a href="#" className="text-xs text-gray-500 underline hover:text-brand-green">Esqueceu?</a>
                  )}
                </div>
                <div className="relative">
                  <input 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 p-3 pl-10 rounded text-sm focus:outline-none focus:border-brand-green transition-all"
                    placeholder="••••••••"
                  />
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-brand-dark text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-colors flex justify-center items-center gap-2 mt-4 rounded disabled:opacity-70"
              >
                {isLoading ? 'Processando...' : (view === 'register' ? 'Criar Conta' : 'Entrar')} 
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}
        </div>

        {/* Footer Toggle */}
        {(view === 'login' || view === 'register') && (
          <div className="p-6 bg-gray-50 text-center border-t border-gray-100">
            <p className="text-sm text-gray-600">
              {view === 'register' ? 'Já tem uma conta?' : 'Ainda não tem conta?'}
              <button 
                type="button"
                onClick={() => {
                    setView(view === 'login' ? 'register' : 'login');
                    setError('');
                }}
                className="ml-2 font-bold text-brand-dark underline hover:text-brand-green transition-colors"
              >
                {view === 'register' ? 'Fazer Login' : 'Cadastre-se'}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};