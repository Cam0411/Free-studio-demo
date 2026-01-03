
import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const HeroSection: React.FC = () => {
  const capRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;
    
    const handleMouseMove = (event: MouseEvent) => {
      if (capRef.current) {
        const { left, top, width, height } = capRef.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const deltaX = event.clientX - centerX;
        const deltaY = event.clientY - centerY;
        const rotateX = (deltaY / centerY) * -10;
        const rotateY = (deltaX / centerX) * 10;
        
        capRef.current.style.setProperty('--cap-rotate-x', `${rotateX}deg`);
        capRef.current.style.setProperty('--cap-rotate-y', `${rotateY}deg`);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const { ref: headlineRef, inView: headlineInView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const { ref: subheadlineRef, inView: subheadlineInView } = useInView({ triggerOnce: true, threshold: 0.5 });

  const headline = "TIMELESS STYLE. ICONIC TEAMS.";
  const subheadline = "Authentic headwear for the true fan. Up to 70% off selected styles.";

  return (
    <section className="min-h-screen h-screen w-full relative overflow-hidden flex items-center justify-center animate-morph-gradient grain-overlay">
      <div className="container mx-auto px-6 text-center z-10 relative flex flex-col items-center pt-20 sm:pt-0">
        
        <div ref={capRef} className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg mb-4 perspective-1000 animate-float-bounce">
          <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 bg-yellow-400 text-black font-anton px-4 py-2 sm:px-5 rounded-full text-sm sm:text-base -rotate-12 animate-pulse z-20">
            SALE 70%
          </div>
          <img 
            src="https://ik.imagekit.io/39wvgoqre/1%20(4).jpg"
            alt="LA Dodgers Cap" 
            className="w-full h-auto object-contain transition-transform duration-300 ease-out"
            style={{
              filter: 'drop-shadow(0 40px 40px rgba(0,0,0,0.6))',
              transform: `rotate3d(0, 1, 0, var(--cap-rotate-y, 0deg)) rotate3d(1, 0, 0, var(--cap-rotate-x, 0deg))`
            }} 
          />
        </div>

        <h1 ref={headlineRef} className="font-anton text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter text-white" style={{textShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)'}}>
          {headline.split('').map((letter, i) => (
            <span key={i} className={`inline-block transition-transform duration-500 ${headlineInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: `${i * 30}ms`, textShadow: '2px 2px 0px #000'}}>{letter === ' ' ? '\u00A0' : letter}</span>
          ))}
        </h1>

        <p ref={subheadlineRef} className={`text-sm sm:text-base md:text-xl text-neutral-300 max-w-2xl mx-auto mt-4 sm:mt-6 transition-all duration-1000 delay-500 ${subheadlineInView ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-md translate-y-5'}`}>
          {subheadlineInView && <Typewriter text={subheadline} speed={30} />}
        </p>

        <div className="mt-8 sm:mt-12">
          <button className="relative px-6 py-4 text-base sm:px-8 sm:py-5 sm:text-lg font-bold uppercase rounded-full bg-yellow-400 text-black overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-110 animate-cta-glow group">
            <span className="relative z-10 tracking-wider">Shop The Collection</span>
          </button>
        </div>
      </div>
       <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center space-y-2 hidden sm:flex">
            <span className="text-sm uppercase">Scroll</span>
            <div className="w-px h-16 bg-white/50 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full animate-bounce"></div>
            </div>
        </div>
    </section>
  );
};

const Typewriter: React.FC<{ text: string; speed: number }> = ({ text, speed }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prevText => prevText + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, speed]);

  return <>{displayText}</>;
};

export default HeroSection;