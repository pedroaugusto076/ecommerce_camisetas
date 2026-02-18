import React from 'react';
// Removidos Phone e Truck que não estavam sendo usados
import { X, Sprout, Shirt, HelpCircle, TreePine, FileText, MapPin } from 'lucide-react';

export type InfoModalType = 'impact' | 'cotton' | 'forest' | 'support' | 'company' | 'legal';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: InfoModalType;
  content: React.ReactNode;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, title, type, content }) => {
  if (!isOpen) return null;

  const getHeaderStyle = () => {
    switch (type) {
      case 'impact': return 'bg-[#3e5c46]';
      case 'cotton': return 'bg-[#d2b48c]';
      case 'forest': return 'bg-[#2d4433]';
      default: return 'bg-gray-800';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'impact': return <Sprout className="w-6 h-6" />;
      case 'cotton': return <Shirt className="w-6 h-6" />;
      case 'forest': return <TreePine className="w-6 h-6" />;
      case 'support': return <HelpCircle className="w-6 h-6" />;
      case 'company': return <MapPin className="w-6 h-6" />;
      default: return <FileText className="w-6 h-6" />;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">
        <div className={`p-6 flex justify-between items-center text-white ${getHeaderStyle()}`}>
           <div className="flex items-center gap-3">
              {getIcon()}
              <h2 className="font-serif text-xl md:text-2xl font-bold">{title}</h2>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
             <X className="w-6 h-6" />
           </button>
        </div>

        <div className="p-8 overflow-y-auto leading-relaxed text-gray-700">
            {content}
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 text-right">
            <button 
                onClick={onClose}
                className="px-6 py-3 font-bold uppercase text-xs tracking-widest text-gray-600 hover:text-black border border-gray-300 hover:border-black transition-colors"
            >
                Fechar
            </button>
        </div>
      </div>
    </div>
  );
};