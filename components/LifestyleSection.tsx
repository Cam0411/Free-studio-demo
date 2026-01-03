
import React from 'react';
import { useInView } from 'react-intersection-observer';

const LifestyleSection: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

  const headline = "THE ICON OF THE STREETS";

  return (
    <section className="relative bg-black min-h-screen flex flex-col lg:flex-row">
      <div className="relative w-full h-[60vh] lg:w-1/2 lg:h-screen">
        <video
          className="w-full h-full object-cover"
          src="https://assets.mixkit.co/videos/preview/mixkit-man-walking-on-a-suspension-bridge-4379-large.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/50 lg:to-black"></div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div ref={ref} className="p-8 sm:p-16 text-center lg:text-left">
          <h2 className="font-anton text-4xl sm:text-5xl md:text-7xl uppercase tracking-wider mb-8">
            {headline.split(' ').map((word, wordIndex) => (
              <span key={wordIndex} className="block overflow-hidden">
                <span
                  className="inline-block"
                  style={{
                    transition: `transform 0.8s cubic-bezier(0.19, 1, 0.22, 1) ${wordIndex * 0.1}s, opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1) ${wordIndex * 0.1}s`,
                    transform: inView ? 'translateY(0)' : 'translateY(100%)',
                    opacity: inView ? 1 : 0,
                  }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-6"
            style={{ transition: `opacity 1s 0.5s, transform 1s 0.5s`, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)' }}>
            More than just a cap, it's a statement. A symbol of loyalty and a staple of style recognized globally.
          </p>
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-10"
            style={{ transition: `opacity 1s 0.7s, transform 1s 0.7s`, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)' }}>
            From the ballpark to the city sidewalks, wear your pride with designs that have defined generations.
          </p>
          <div style={{ transition: `opacity 1s 0.9s, transform 1s 0.9s`, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)' }}>
            <button className="relative group overflow-hidden px-6 py-3 sm:px-8 sm:py-4 border-2 border-yellow-400 rounded-full text-base sm:text-lg uppercase font-bold tracking-wider text-yellow-400">
              <span className="absolute inset-0 bg-yellow-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
              <span className="relative z-10 group-hover:text-black transition-colors duration-500">Explore Heritage</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifestyleSection;