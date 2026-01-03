
import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const ProductSpotlight: React.FC = () => {
    const [offsetY, setOffsetY] = useState(0);
    const handleScroll = () => {
        if (window.innerWidth >= 1024) {
            setOffsetY(window.pageYOffset);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    const features = [
        { icon: <CrownIcon />, text: 'Structured 6-Panel Crown' },
        { icon: <FabricIcon />, text: 'Premium Cotton Twill' },
        { icon: <RulerIcon />, text: 'Adjustable Strapback Fit' }
    ];

    return (
        <section ref={ref} className="bg-black py-24 sm:py-32 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-5" style={{
                backgroundImage: `
                    radial-gradient(circle at 10% 20%, var(--brand-yellow), transparent 30%),
                    radial-gradient(circle at 80% 90%, #ffffff, transparent 30%)
                `,
                filter: 'blur(100px)',
            }} />
             <div className="absolute inset-y-0 left-0 w-1/2 opacity-10" style={{
                background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
            }}/>
            
            <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                {/* Image Section */}
                <div className="w-full lg:w-1/2">
                    <div className="relative" style={{ transform: `translateY(${offsetY * 0.05}px)` }}>
                         <div className="absolute -inset-8 bg-yellow-400/10 rounded-full blur-3xl" style={{ opacity: inView ? 1 : 0, transition: 'opacity 1s 0.5s' }}/>
                        <img 
                            src="https://ik.imagekit.io/39wvgoqre/2%20(2).jpg"
                            alt="NY Yankees Cap" 
                            className="relative z-10 w-full h-auto transition-transform duration-1000 ease-out"
                            style={{ 
                                filter: 'drop-shadow(0 30px 30px rgba(0,0,0,0.5))',
                                transform: inView ? 'scale(1) rotate(5deg)' : 'scale(0.9) rotate(0deg)',
                                opacity: inView ? 1 : 0,
                                transition: 'transform 1.2s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 1s'
                            }}
                        />
                    </div>
                </div>
                
                {/* Text Section */}
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                    <div className="overflow-hidden">
                        <span className="inline-block bg-yellow-400 text-black font-bold uppercase tracking-widest px-4 py-1 rounded-full mb-4 text-sm"
                         style={{ transform: inView ? 'translateY(0)' : 'translateY(100%)', opacity: inView ? 1 : 0, transition: 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) 0.2s' }}>
                            Featured Classic
                        </span>
                    </div>
                    <div className="overflow-hidden">
                        <h2 className="font-anton text-4xl sm:text-5xl md:text-7xl uppercase tracking-wider mb-6"
                         style={{ transform: inView ? 'translateY(0)' : 'translateY(100%)', opacity: inView ? 1 : 0, transition: 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) 0.4s' }}>
                            The 'Heritage' Cap
                        </h2>
                    </div>
                    <p className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-8"
                     style={{ opacity: inView ? 1 : 0, transition: 'opacity 1s 0.8s' }}>
                        An undisputed classic. The Heritage cap features the iconic script logo in detailed embroidery, offering a timeless look for the dedicated fan.
                    </p>
                    
                    <ul className="space-y-4 mb-10">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-center justify-center lg:justify-start gap-4"
                             style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-20px)', transition: `all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) ${1 + index * 0.2}s` }}>
                                <div className="text-yellow-400">{feature.icon}</div>
                                <span className="text-base sm:text-lg">{feature.text}</span>
                            </li>
                        ))}
                    </ul>
                    
                    <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'scale(1)' : 'scale(0.8)', transition: 'all 1s 1.6s' }}>
                        <button className="relative px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-bold uppercase rounded-full bg-white text-black overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-110 group">
                            <span className="relative z-10 tracking-wider group-hover:text-white transition-colors duration-300">Shop The Heritage</span>
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const CrownIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
    </svg>
);
const FabricIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
    </svg>
);
const RulerIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L3 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0L15.3 9"></path>
      <path d="M14.7 13.3l6-6"></path>
      <path d="M8 2v4"></path><path d="M12 2v4"></path><path d="M16 2v4"></path>
      <path d="M2 8h4"></path><path d="M2 12h4"></path><path d="M2 16h4"></path>
    </svg>
);

export default ProductSpotlight;