
import React, { useState } from 'react';
import { Product } from '../types';
import { useInView } from 'react-intersection-observer';

type Particle = {
  id: number;
  style: React.CSSProperties;
};

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [particles, setParticles] = useState<Particle[]>([]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const width = card.offsetWidth;
    const height = card.offsetHeight;
    const newParticles: Particle[] = [];
    const numParticles = 20;

    for (let i = 0; i < numParticles; i++) {
        const angle = Math.random() * 360;
        const radius = Math.random() * 70 + 40; // How far particles travel
        const endX = Math.cos(angle * (Math.PI / 180)) * radius;
        const endY = Math.sin(angle * (Math.PI / 180)) * radius;

        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 0.8 + 0.5;
        const delay = Math.random() * 0.2;
        const colors = ['var(--brand-yellow)', '#FFFFFF'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        const side = Math.floor(Math.random() * 4);
        let startX = 0, startY = 0;
        switch (side) {
          case 0: startX = Math.random() * width; startY = 0; break;
          case 1: startX = width; startY = Math.random() * height; break;
          case 2: startX = Math.random() * width; startY = height; break;
          case 3: startX = 0; startY = Math.random() * height; break;
        }

        newParticles.push({
            id: Date.now() + i,
            style: {
                position: 'absolute',
                left: `${startX}px`,
                top: `${startY}px`,
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: '50%',
                background: color,
                '--end-x': `${endX}px`,
                '--end-y': `${endY}px`,
                animation: `particle-burst ${duration}s ease-out ${delay}s forwards`,
                opacity: 0,
            },
        });
    }
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1500); // Cleanup particles after animation
  };

  const CountUp: React.FC<{ end: number, duration?: number }> = ({ end, duration = 1500 }) => {
    const [count, setCount] = useState(0);

    React.useEffect(() => {
        if (!inView) return;
        let start = 0;
        const endVal = end;
        const startTime = Date.now();
        const timer = () => {
            const now = Date.now();
            const progress = Math.min(1, (now - startTime) / duration);
            const current = start + (endVal - start) * progress;
            setCount(current);
            if (progress < 1) requestAnimationFrame(timer);
        };
        requestAnimationFrame(timer);
    }, [end, duration, inView]);

    return <span>${count.toFixed(2)}</span>;
  };
  
  return (
    <div 
      ref={ref} 
      onMouseEnter={handleMouseEnter}
      className={`w-full max-w-md mx-auto h-[550px] sm:h-[600px] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-3xl p-6 relative shadow-2xl shadow-black/50 border border-white/10 transition-all duration-500 transform-style-3d group hover:-translate-y-4`}
    >
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-3xl">
          {particles.map(p => (<div key={p.id} style={p.style} />))}
        </div>
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-2 border-2 border-white/10 rounded-2xl pointer-events-none" />

        <div className="absolute top-6 left-6 bg-yellow-400/80 text-black font-bold px-3 py-1 text-xs sm:text-sm rounded-full">
            SALE
        </div>
        
        <div className="relative h-1/2 flex items-center justify-center perspective-800">
            <img 
                src={product.image} 
                alt={product.name} 
                className="w-full max-w-[280px] sm:max-w-xs object-contain transition-all duration-500 ease-out group-hover:scale-110"
                style={{filter: 'drop-shadow(0 25px 25px rgba(0,0,0,0.7))'}}
            />
        </div>

        <div className="relative z-10 pt-4">
            <h3 className="text-2xl sm:text-3xl font-anton tracking-wide text-white mb-2">{product.name}</h3>
            <div className="flex items-center justify-between mb-4">
                <p className="text-3xl sm:text-4xl font-bold text-yellow-400"><CountUp end={product.price} /></p>
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (<Star key={i} filled={i < product.rating} delay={i * 0.1} />))}
                </div>
            </div>

            <div className="mb-6">
                <p className="text-sm text-neutral-400 mb-2">COLOR</p>
                <div className="flex space-x-2">
                    {product.colors.map(color => (
                        <button 
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all duration-300 transform hover:scale-125 ${selectedColor === color ? 'border-yellow-400 scale-125' : 'border-neutral-700'}`}
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button 
                  onClick={() => onQuickView(product)}
                  className="flex-1 py-3 sm:py-4 text-center border-2 border-yellow-400 text-yellow-400 rounded-full font-bold uppercase tracking-wider transition-all duration-300 hover:bg-yellow-400 hover:text-black text-sm sm:text-base">
                    Quick View
                </button>
                <button className="flex-1 py-3 sm:py-4 text-center bg-white text-black rounded-full font-bold uppercase tracking-wider transition-all duration-300 hover:bg-yellow-400 transform hover:scale-105 text-sm sm:text-base">
                    Add to Bag
                </button>
            </div>
        </div>
    </div>
  );
};

const Star: React.FC<{ filled: boolean; delay: number }> = ({ filled, delay }) => {
    const { ref, inView } = useInView({ triggerOnce: true });
    return (
      <svg ref={ref} className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <linearGradient id="starGradient">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FFA500" />
          </linearGradient>
        </defs>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" className="text-neutral-700" fill={filled ? 'url(#starGradient)' : 'none'} style={{ transition: 'fill 1s', transitionDelay: `${delay}s`, fillOpacity: inView && filled ? 1 : 0 }}/>
      </svg>
    );
};

export default ProductCard;