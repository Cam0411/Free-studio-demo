
import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import ProductCard from './ProductCard';
import { Product } from '../types';

const products: Product[] = [
  {
    id: 1,
    name: "LA Dodgers '47 CLEAN UP",
    price: 35.70,
    rating: 5,
    quantity: 47,
    image: 'https://ik.imagekit.io/39wvgoqre/1%20(4).jpg',
    colors: ['#000000', '#005A9C'],
  },
  {
    id: 2,
    name: 'NY Yankees Heritage',
    price: 35.70,
    rating: 5,
    quantity: 23,
    image: 'https://ik.imagekit.io/39wvgoqre/2%20(2).jpg',
    colors: ['#000000', '#0C2340'],
  },
  {
    id: 3,
    name: 'LA Dodgers MLB Basic',
    price: 35.70,
    rating: 4,
    quantity: 81,
    image: 'https://ik.imagekit.io/39wvgoqre/6.jpg',
    colors: ['#000000', '#FFFFFF'],
  },
  {
    id: 4,
    name: "LA Dodgers '47 Blackout",
    price: 39.99,
    rating: 5,
    quantity: 12,
    image: 'https://ik.imagekit.io/39wvgoqre/1%20(4).jpg',
    colors: ['#1a1a1a', '#FFFFFF'],
  },
  {
    id: 5,
    name: 'Yankees Script Edition',
    price: 39.99,
    rating: 4,
    quantity: 55,
    image: 'https://ik.imagekit.io/39wvgoqre/2%20(2).jpg',
    colors: ['#000000', '#C0C0C0'],
  },
];

const SectionTitle: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const title = "THE COLLECTION";

  return (
    <div ref={ref} className="text-center mb-12 sm:mb-16">
      <h2 className="font-anton text-5xl sm:text-6xl md:text-8xl uppercase tracking-wider relative inline-block">
        {title.split('').map((char, index) => (
          <span key={index} className="inline-block relative overflow-hidden" style={{ animation: inView ? `reveal 0.5s ${index * 0.1}s forwards` : 'none' }}>
            <span className="opacity-0">{char}</span>
            <span className="absolute top-0 left-0" style={{ animation: inView ? `flip-in 1s ${index * 0.1}s forwards ease-out` : 'none' }}>{char}</span>
          </span>
        ))}
        <style>{`
            @keyframes reveal { from { opacity: 0; } to { opacity: 1; } }
            @keyframes flip-in {
                0% { transform: translateY(100%) rotateX(-90deg); opacity: 0; }
                50% { transform: translateY(0%) rotateX(0deg); opacity: 1; }
                100% { opacity: 1; }
            }
        `}</style>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent transform-origin-left" style={{ animation: inView ? `draw-underline 1s 1s forwards cubic-bezier(0.4, 0, 0.2, 1)` : 'none', transform: 'scaleX(0)'}} />
      </h2>
    </div>
  )
}

interface ProductSliderProps {
  onQuickView: (product: Product) => void;
}

const ProductSlider: React.FC<ProductSliderProps> = ({ onQuickView }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === products.length - 1 ? 0 : prev + 1));
  };
  
  return (
    <section id="arsenal" className="bg-black py-24 sm:py-32 overflow-hidden relative">
      <div className="absolute inset-0 z-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at center, var(--brand-yellow) 1px, transparent 1px), radial-gradient(circle at center, var(--brand-yellow) 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-yellow-400/5 rounded-full blur-3xl animate-pulse -z-10"></div>
      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle />
        <div className="relative flex items-center justify-center">
            <button onClick={handlePrev} className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110 disabled:opacity-50 sm:-translate-x-1/2">
                &lt;
            </button>
            <div className="w-full max-w-7xl relative h-[580px] sm:h-[650px] perspective-0 md:perspective-1500">
                {products.map((product, index) => {
                    const offset = index - currentIndex;
                    let transform = '';
                    let opacity = 0;
                    let zIndex = 0;
                    
                    if(offset === 0) {
                        transform = 'translateX(0) scale(1)';
                        opacity = 1;
                        zIndex = 10;
                    } else if (offset === 1) {
                        transform = 'translateX(100%) scale(0.85) rotateY(-30deg)';
                        opacity = 0;
                        zIndex = 5;
                    } else if (offset === -1) {
                        transform = 'translateX(-100%) scale(0.85) rotateY(30deg)';
                        opacity = 0;
                        zIndex = 5;
                    } else if (offset > 1) {
                         transform = 'translateX(100%) scale(0.7)';
                         opacity = 0;
                    } else {
                         transform = 'translateX(-100%) scale(0.7)';
                         opacity = 0;
                    }

                    // Override for medium screens and up
                    if (window.innerWidth >= 768) {
                      if (offset === 1) {
                          transform = 'translateX(50%) scale(0.85) rotateY(-30deg)';
                          opacity = 0.5;
                      } else if (offset === -1) {
                          transform = 'translateX(-50%) scale(0.85) rotateY(30deg)';
                          opacity = 0.5;
                      }
                    }
                    
                    return (
                        <div key={product.id} className="absolute w-full h-full top-0 left-0 transition-transform duration-700 ease-out"
                         style={{ transform, opacity, zIndex }}>
                            <ProductCard product={product} onQuickView={onQuickView} />
                        </div>
                    )
                })}
            </div>

            <button onClick={handleNext} className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110 disabled:opacity-50 sm:translate-x-1/2">
                &gt;
            </button>
        </div>
        <div className="flex justify-center mt-8 sm:mt-12 space-x-3">
          {products.map((_, index) => (
            <button key={index} onClick={() => setCurrentIndex(index)} className="w-10 h-1 rounded-full transition-colors duration-300"
              style={{ background: currentIndex === index ? 'var(--brand-yellow)' : 'rgba(255,255,255,0.2)'}}>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;