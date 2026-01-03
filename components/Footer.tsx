
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 text-center md:text-left">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="font-anton text-2xl tracking-wider mb-4 inline-block md:inline">LIMITLESS</h3>
            <p className="text-neutral-400">Redefining the limits of performance headwear.</p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-wider text-neutral-400 mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-300 hover:text-orange-500 transition-colors">The Arsenal</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-orange-500 transition-colors">Technology</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-orange-500 transition-colors">About Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-wider text-neutral-400 mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-300 hover:text-orange-500 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-orange-500 transition-colors">Contact</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-orange-500 transition-colors">Returns</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-wider text-neutral-400 mb-4">Join The Movement</h4>
            <div className="flex max-w-sm mx-auto md:max-w-none">
              <input type="email" placeholder="Enter your email" className="bg-neutral-800 border border-neutral-700 rounded-l-md px-4 py-2 w-full focus:outline-none focus:border-orange-500 text-sm" />
              <button className="bg-orange-500 px-4 rounded-r-md hover:bg-orange-600 transition-colors">&rarr;</button>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 text-center text-neutral-500">
          &copy; {new Date().getFullYear()} LIMITLESS Industries. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;