import React, { useRef, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface Feature {
  title: string;
  description: string;
  icon: React.FC<any>;
}

const EmbroideryIcon = ({ inView }: { inView: boolean }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20v-8m0-4V4M8 12H4m16 0h-4" className={`transition-opacity duration-500 ${inView ? 'animate-draw-icon' : 'opacity-0'}`} stroke="var(--brand-yellow)" />
      <path d="M7.05 7.05l-2.12 2.12M19.07 19.07l-2.12-2.12" className={`transition-opacity duration-500 ${inView ? 'animate-draw-icon' : 'opacity-0'}`} stroke="var(--brand-yellow)" style={{ animationDelay: '0.2s' }} />
      <path d="M7.05 16.95l-2.12-2.12M19.07 4.93l-2.12 2.12" className={`transition-opacity duration-500 ${inView ? 'animate-draw-icon' : 'opacity-0'}`} stroke="var(--brand-yellow)" style={{ animationDelay: '0.4s' }} />
    </svg>
);

const CottonIcon = ({ inView }: { inView: boolean }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15.82 16.9a.9.9 0 01-1.27 0l-1.1-1.1a.9.9 0 010-1.27l3.18-3.18a.9.9 0 011.27 0l1.1 1.1a.9.9 0 010 1.27z" className={`transition-opacity duration-500 ${inView ? 'animate-draw-icon' : 'opacity-0'}`} stroke="var(--brand-yellow)" />
        <path d="M12 12a3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3z" className={`transition-opacity duration-500 ${inView ? 'animate-draw-icon' : 'opacity-0'}`} stroke="var(--brand-yellow)" style={{ animationDelay: '0.2s' }} />
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className={`transition-opacity duration-500 ${inView ? 'animate-draw-icon' : 'opacity-0'}`} stroke="var(--brand-yellow)" style={{ animationDelay: '0.4s' }} />
    </svg>
);

const BuckleIcon = ({ inView }: { inView: boolean }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 12.5a4 4 0 10-8 0 4 4 0 008 0z" className={`transition-opacity duration-500 ${inView ? 'animate-draw-icon' : 'opacity-0'}`} stroke="var(--brand-yellow)" />
        <path d="M12 22V17" className={`transition-opacity duration-500 ${inView ? 'animate-draw-icon' : 'opacity-0'}`} stroke="var(--brand-yellow)" style={{ animationDelay: '0.2s' }} />
        <path d="M12 7V2" className={`transition-opacity duration-500 ${inView ? 'animate-draw-icon' : 'opacity-0'}`} stroke="var(--brand-yellow)" style={{ animationDelay: '0.3s' }} />
        <path d="M18 12h5" className={`transition-opacity duration-500 ${inView ? 'animate-draw-icon' : 'opacity-0'}`} stroke="var(--brand-yellow)" style={{ animationDelay: '0.4s' }} />
        <path d="M1 12h5" className={`transition-opacity duration-500 ${inView ? 'animate-draw-icon' : 'opacity-0'}`} stroke="var(--brand-yellow)" style={{ animationDelay: '0.5s' }} />
    </svg>
);


const features: Feature[] = [
  {
    title: "Sharp Embroidered Logo",
    description: "High-density, 3D embroidery provides a premium, textured finish that stands out with crisp detail and lasting quality.",
    icon: EmbroideryIcon
  },
  {
    title: "Cool Cotton Fabric",
    description: "Made from 100% premium cotton twill, offering a soft, breathable fit for all-day comfort, indoors and out.",
    icon: CottonIcon
  },
  {
    title: "Stainless Steel Buckle",
    description: "A durable, non-rusting steel buckle closure allows for a perfect, adjustable fit that holds its place.",
    icon: BuckleIcon
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="relative bg-black py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#111] to-black"></div>
        <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16 sm:mb-20">
                <h2 className="font-anton text-4xl sm:text-5xl md:text-7xl uppercase tracking-wider">DETAILS THAT DELIVER</h2>
                <p className="text-neutral-400 mt-4 max-w-2xl mx-auto">Crafted for authenticity. Built to last.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 perspective-1200">
                {features.map((feature, index) => (
                    <FeatureCard key={feature.title} feature={feature} index={index} />
                ))}
            </div>
        </div>
    </section>
  );
}

const FeatureCard: React.FC<{ feature: Feature, index: number }> = ({ feature, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const { ref: inViewRef, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

    useEffect(() => {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        const currentRef = cardRef.current;
        if (!currentRef) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { left, top, width, height } = currentRef.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            currentRef.style.transform = `rotateY(${x * 15}deg) rotateX(${-y * 15}deg) scale(1.05)`;
        };

        const handleMouseLeave = () => {
            currentRef.style.transform = 'rotateY(0) rotateX(0) scale(1)';
        };

        currentRef.addEventListener('mousemove', handleMouseMove);
        currentRef.addEventListener('mouseleave', handleMouseLeave);

        // FIX: Corrected arrow function syntax for the cleanup function.
        return () => {
            if (currentRef) {
                currentRef.removeEventListener('mousemove', handleMouseMove);
                currentRef.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    return (
        <div 
            ref={cardRef}
            className="bg-neutral-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center transition-all duration-300 ease-out shadow-lg shadow-black/40" 
            style={{
                transition: `transform 0.1s ease-out, opacity 1s ${index * 0.2}s, transform 1s ${index * 0.2}s`,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(50px)'
            }}
        >
            <div ref={inViewRef} className="mb-6 flex justify-center items-center h-32 w-32 mx-auto sm:h-40 sm:w-40">
                <feature.icon inView={inView} />
            </div>
            <h3 className="text-xl sm:text-2xl font-anton tracking-wide mb-4 text-yellow-400">{feature.title}</h3>
            <p className="text-neutral-400 leading-relaxed text-sm sm:text-base">{feature.description}</p>
        </div>
    );
};

export default FeaturesSection;