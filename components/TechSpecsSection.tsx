
import React from 'react';
import { useInView } from 'react-intersection-observer';

const TechSpecsSection: React.FC = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    const specs = [
        { title: 'Fabric Blend', value: '78% Poly / 22% Spandex', icon: '🧬', area: 'col-span-2' },
        { title: 'Weight', value: '85 Grams', icon: '⚖️', area: 'col-span-1' },
        { title: 'UPF Rating', value: '50+', icon: '☀️', area: 'col-span-1' },
        { title: 'Sweatband', value: 'Quad-Core Wick', icon: '💧', area: 'col-span-2' },
        { title: 'Structure', value: '6-Panel Laser Cut', icon: '✂️', area: 'col-span-2 md:col-span-1' },
        { title: 'Closure', value: 'Micro-Adjust V2', icon: '⚙️', area: 'col-span-2 md:col-span-1' },
    ];
  return (
    <section id="tech" className="bg-black py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10" style={{backgroundImage: 'linear-gradient(#ff4500 1px, transparent 1px), linear-gradient(to right, #ff4500 1px, black 1px)', backgroundSize: '50px 50px'}}></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-anton text-4xl sm:text-5xl md:text-7xl uppercase tracking-wider">The Anatomy of a Legend</h2>
          <p className="text-neutral-400 mt-4 max-w-2xl mx-auto">Uncompromising performance, down to the last detail.</p>
        </div>
        
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            {specs.map((spec, index) => (
                <div 
                    key={spec.title} 
                    className={`${spec.area} bg-white/5 backdrop-blur-lg rounded-2xl p-6 flex flex-col justify-between border border-white/10 transition-all duration-700 ease-out min-h-[150px]`}
                    style={{
                        transitionDelay: `${index * 100}ms`,
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'scale(1)' : 'scale(0.9)',
                    }}
                >
                    <div>
                        <span className="text-3xl sm:text-4xl">{spec.icon}</span>
                        <p className="text-neutral-400 mt-2 text-sm sm:text-base">{spec.title}</p>
                    </div>
                    <p className="font-roboto-mono text-xl sm:text-2xl md:text-3xl font-bold text-white text-right">{spec.value}</p>
                </div>
            ))}
            <div className="col-span-2 md:col-span-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-8 flex items-center justify-center text-center transition-all duration-700 ease-out"
              style={{
                transitionDelay: '600ms',
                opacity: inView ? 1 : 0,
                transform: inView ? 'scale(1)' : 'scale(0.9)',
              }}
            >
              <button className="font-anton text-2xl sm:text-3xl md:text-4xl tracking-wider hover:scale-105 transition-transform duration-300">
                360° PRODUCT VIEW
              </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default TechSpecsSection;