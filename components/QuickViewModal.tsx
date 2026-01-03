
import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(onClose, 300); // Match duration of closing animation
  };

  const animationClass = isClosing ? 'animate-fade-out-down' : 'animate-fade-in-up';

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      <style>{`
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        @keyframes fade-out-down {
            from { opacity: 1; transform: translateY(0) scale(1); }
            to { opacity: 0; transform: translateY(20px) scale(0.95); }
        }
        .animate-fade-out-down {
            animation: fade-out-down 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards;
        }
      `}</style>
      <div className={`relative w-full max-w-4xl bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden ${animationClass}`}>
        <button onClick={closeModal} className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors z-10">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Section */}
          <div className="relative p-8 flex items-center justify-center bg-black/20">
             <div className="absolute inset-0 z-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at center, var(--brand-yellow) 1px, transparent 1px), radial-gradient(circle at center, var(--brand-yellow) 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
            <img src={product.image} alt={product.name} className="w-full max-w-sm object-contain drop-shadow-2xl" />
          </div>

          {/* Details Section */}
          <div className="p-8 flex flex-col justify-center">
            <h2 className="font-anton text-4xl uppercase tracking-wider mb-2">{product.name}</h2>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-5 h-5 ${i < product.rating ? 'text-yellow-400' : 'text-neutral-600'}`} viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                  ))}
              </div>
              <span className="ml-2 text-sm text-neutral-400">({product.rating * 10 + 7} reviews)</span>
            </div>
            <p className="font-bold text-4xl mb-6 text-yellow-400">${product.price.toFixed(2)}</p>
            
            <p className="text-neutral-300 mb-6">The official on-field cap. Engineered with premium fabrics for a comfortable, structured fit and timeless style.</p>

            <div className="mb-6">
              <p className="text-sm text-neutral-400 mb-2">COLOR</p>
              <div className="flex space-x-2">
                  {product.colors.map(color => (
                      <button 
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-8 h-8 rounded-full border-2 transition-all duration-300 transform hover:scale-125 ${selectedColor === color ? 'border-yellow-400 scale-125' : 'border-neutral-700'}`}
                          style={{ backgroundColor: color }}
                      />
                  ))}
              </div>
            </div>

            <button className="w-full py-4 text-center bg-yellow-400 text-black rounded-full font-bold uppercase tracking-wider transition-all duration-300 hover:bg-yellow-500 transform hover:scale-105">
                Add to Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;