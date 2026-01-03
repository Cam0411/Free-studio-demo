
import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import ProductSlider from './components/ProductSlider';
import FeaturesSection from './components/FeaturesSection';
import LifestyleSection from './components/LifestyleSection';
import ProductSpotlight from './components/ProductSpotlight';
import TechSpecsSection from './components/TechSpecsSection';
import Footer from './components/Footer';
import { Product } from './types';
import QuickViewModal from './components/QuickViewModal';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
  };


  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="bg-black relative">
      <Header />
      <main>
        <HeroSection />
        <ProductSlider onQuickView={handleQuickView} />
        <FeaturesSection />
        <LifestyleSection />
        <ProductSpotlight />
        <TechSpecsSection />
      </main>
      <Footer />
      {selectedProduct && <QuickViewModal product={selectedProduct} onClose={closeQuickView} />}
    </div>
  );
};

const LoadingScreen: React.FC = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="fixed inset-0 bg-black flex flex-col justify-center items-center z-[100]">
      <div className="relative w-48 h-48 mb-8">
        <img src="https://ik.imagekit.io/39wvgoqre/1%20(4).jpg" alt="Loading Cap" className="animate-spin" style={{animationDuration: '8s'}} />
      </div>
      <div className="w-64">
        <div className="relative pt-1">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-neutral-800">
            <div style={{ width: `${percentage}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
          </div>
        </div>
        <p className="text-center font-anton tracking-wider">LOADING STYLE... {percentage}%</p>
      </div>
    </div>
  );
};


const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-black/50 backdrop-blur-md py-4' : 'py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="font-anton text-2xl tracking-widest">FREE STUDIO</div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#arsenal" className="hover:text-yellow-400 transition-colors">THE COLLECTION</a>
            <a href="#features" className="hover:text-yellow-400 transition-colors">DETAILS</a>
            <a href="#tech" className="hover:text-yellow-400 transition-colors">SPECS</a>
          </nav>
          <div className="hidden md:block">
            <button className="px-6 py-2 border border-white/50 rounded-full hover:bg-white hover:text-black transition-all duration-300">
              CONTACT
            </button>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="z-50 relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
          </div>
        </div>
      </header>
      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black/90 backdrop-blur-lg z-40 transition-transform duration-500 ease-in-out transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} md:hidden`}>
        <nav className="flex flex-col items-center justify-center h-full space-y-8 text-2xl font-anton tracking-wider">
          <a href="#arsenal" onClick={toggleMenu} className="hover:text-yellow-400 transition-colors">THE COLLECTION</a>
          <a href="#features" onClick={toggleMenu} className="hover:text-yellow-400 transition-colors">DETAILS</a>
          <a href="#tech" onClick={toggleMenu} className="hover:text-yellow-400 transition-colors">SPECS</a>
          <button onClick={toggleMenu} className="px-8 py-3 text-lg border border-white/50 rounded-full hover:bg-white hover:text-black transition-all duration-300">
            CONTACT
          </button>
        </nav>
      </div>
    </>
  );
}


export default App;