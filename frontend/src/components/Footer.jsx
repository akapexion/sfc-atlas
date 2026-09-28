import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ArrowUp, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center text-white">
                <Sprout size={18} />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Market<span className="text-green-500">Link</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Empowering local farmers and community shoppers through fresh harvest listings, advance pre-orders, and market stall coordination.
            </p>
            <p className="text-xs text-gray-500">
              Techwiz 7 • Theme: eGreen Basket • Category: End-to-End Web Solutions
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-white transition">Home</Link>
              </li>
              <li>
                <a href="/#markets" className="hover:text-white transition">Upcoming Markets</a>
              </li>
              <li>
                <a href="/#products" className="hover:text-white transition">Weekly Harvest Produce</a>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">About Project</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition">Account Portal / Login</Link>
              </li>
            </ul>
          </div>

          {/* Contact / Project Info */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">
              Project Support
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-green-500 shrink-0" />
                <span>info@marketlink.local</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-green-500 shrink-0" />
                <span>Central Market Square</span>
              </li>
              <li className="text-xs text-gray-500 pt-2">
                All pre-orders settled in cash at stall pickup.
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p className="mb-4 sm:mb-0">
            © {new Date().getFullYear()} MarketLink — Built by Team SFC-Atlas. All rights reserved.
          </p>

          <button 
            onClick={scrollToTop}
            type="button"
            className="flex items-center gap-1.5 text-gray-400 hover:text-white px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-md transition"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;