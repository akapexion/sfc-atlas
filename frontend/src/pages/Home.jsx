import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CATEGORIES_LIST } from '../data/mockData';
import PreOrderModal from '../components/PreOrderModal';
import { 
  Sprout, 
  MapPin, 
  ShoppingBag, 
  Calendar, 
  Search, 
  CheckCircle, 
  Store, 
  Clock, 
  ArrowRight,
  Filter,
  Star
} from 'lucide-react';

/**
 * Home Page Component
 * Location: src/pages/Home.jsx
 * Functionality: Main public landing page for eGreen Basket MarketLink platform.
 * Displays hero banner, live product search & category filters, harvest highlights, and market schedule previews.
 */

export default function Home() {
  const { products, markets } = useApp();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePreOrderProduct, setActivePreOrderProduct] = useState(null);

  const handlePreOrderClick = (product) => {
    const isLoggedIn = Boolean(
      localStorage.getItem('marketlink_user_name') || 
      localStorage.getItem('marketlink_user_email')
    );

    if (!isLoggedIn) {
      navigate('/login?mode=login');
      return;
    }

    setActivePreOrderProduct(product);
  };

  // Filter products for homepage preview (limit to 6)
  const filteredProducts = products.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = !q || 
      (item.name && item.name.toLowerCase().includes(q)) ||
      (item.farmer && item.farmer.toLowerCase().includes(q)) ||
      (item.market && item.market.toLowerCase().includes(q)) ||
      (item.category && item.category.toLowerCase().includes(q)) ||
      (item.description && item.description.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  }).slice(0, 6);

  return (
    <div className="bg-gray-50/50 text-gray-800">
      
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl">
            
            {/* Project Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-semibold border border-green-200 mb-6">
              <Sprout size={15} />
              <span>eGreen Basket Initiative • Aptech Techwiz 7</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Fresh Local Produce, Pre-Ordered for Market Pickup
            </h1>

            <p className="mt-5 text-base sm:text-lg text-gray-600 leading-relaxed">
              MarketLink bridges the gap between local growers and community shoppers. 
              Browse live weekly harvest inventory, reserve items in advance, 
              and collect directly at your farmer stall on market day.
            </p>

            {/* Quick Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-xs transition hover:shadow"
              >
                <ShoppingBag size={18} />
                <span>Browse Weekly Harvest</span>
              </Link>

              <Link
                to="/markets"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold px-5 py-3 rounded-xl border border-gray-300 transition"
              >
                <MapPin size={18} />
                <span>Find Nearby Markets</span>
              </Link>

              {/* Commented out direct Farmer/Vendor Portal link for security access control:
              <Link
                to="/dashboard/home"
                className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold px-5 py-3 rounded-xl transition"
              >
                <Store size={18} />
                <span>Farmer / Vendor Portal</span>
              </Link>
              */}
            </div>

            {/* Simple highlights list */}
            <div className="mt-12 pt-6 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-600 shrink-0" />
                <span>Pay in cash at pickup — zero online gateway fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-600 shrink-0" />
                <span>Guaranteed reservation before items sell out</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-600 shrink-0" />
                <span>Support local family farms directly</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-green-700 block mb-1">
            Simple 3-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            How MarketLink Works
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Connecting community shoppers with fresh seasonal produce without middleman markups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs hover:border-gray-300 transition">
            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 border border-green-200 flex items-center justify-center font-extrabold text-lg mb-4">
              1
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">
              Find Your Local Market
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Discover upcoming farmers markets in your area, view operating hours, and see attending growers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs hover:border-gray-300 transition">
            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 border border-green-200 flex items-center justify-center font-extrabold text-lg mb-4">
              2
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">
              Browse & Pre-Order
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Review live produce stock listed by farmers. Reserve your items and select a pickup time window.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs hover:border-gray-300 transition">
            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 border border-green-200 flex items-center justify-center font-extrabold text-lg mb-4">
              3
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">
              Collect & Pay at Stall
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Visit the farmer stall on market day, show your pre-order ticket, inspect your harvest, and pay in person.
            </p>
          </div>

        </div>
      </section>

      {/* Weekly Products Catalog Section */}
      <section id="products" className="py-16 bg-white border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-green-700 block mb-1">
                Featured Produce
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                Browse Fresh Seasonal Produce
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Items currently listed by verified local growers for upcoming market pickup.
              </p>
            </div>

            {/* Product search box */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-2.5 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search produce or farm..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
            <Filter size={15} className="text-gray-400 mr-1 shrink-0" />
            {CATEGORIES_LIST.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-green-600 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Category & Available Stock */}
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="font-bold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-200">
                        {product.category}
                      </span>
                      <span className="text-gray-500 font-medium">
                        {product.stock} {product.unit} left
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 mb-1">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                      <span>Sold by <strong className="text-gray-700">{product.farmer}</strong></span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5 text-amber-600 font-medium">
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                        {product.farmerRating || 4.9}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed mb-4">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                      <MapPin size={13} className="text-green-600 shrink-0" />
                      <span className="truncate">{product.market}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-extrabold text-gray-900">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">/ {product.unit}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handlePreOrderClick(product)}
                        className="text-xs font-bold px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag size={14} />
                        <span>Pre-Order</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-xs text-gray-500">
                No produce found matching your criteria. Try adjusting your search query.
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-green-700 hover:text-green-800 bg-green-50 px-5 py-2.5 rounded-xl border border-green-200 hover:bg-green-100 transition"
            >
              <span>Explore All Produce Items ({products.length})</span>
              <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </section>

      {/* Local Markets Section */}
      <section id="markets" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-green-700 block mb-1">
              Community Locations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Upcoming Farmers Markets
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Check market schedules and find designated stall collection points.
            </p>
          </div>

          <Link
            to="/markets"
            className="text-xs font-bold text-green-700 hover:text-green-800 inline-flex items-center gap-1 shrink-0"
          >
            <span>View Full Market Directory ({markets.length})</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {markets.slice(0, 3).map((market) => (
            <div
              key={market.id}
              className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between shadow-xs hover:border-gray-300 hover:shadow-md transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <span className="flex items-center gap-1 text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-200">
                    <Calendar size={13} />
                    {market.day || market.schedule || 'Every Saturday'}
                  </span>
                  <span className="text-gray-500 font-normal">
                    {market.stallsCount || 35} Farmer Stalls
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {market.name}
                </h3>
                <p className="text-xs text-gray-500 mb-3">{market.tagline || 'Community Organic Harvest Gathering'}</p>

                <div className="space-y-2 text-xs text-gray-600 mb-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-gray-400 shrink-0" />
                    <span>{market.hours || market.timing || '08:00 AM - 01:00 PM'}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="text-green-600 shrink-0 mt-0.5" />
                    <span>{market.location}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Store size={14} className="text-gray-400 shrink-0 mt-0.5" />
                    <span className="font-medium text-gray-800">Pickup Zone: {market.pickupZone || 'Stall #A1-A12 Pre-Order Booth'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <Link
                  to="/products"
                  className="text-xs font-bold text-green-700 hover:text-green-800"
                >
                  View Produce →
                </Link>
                <span className="text-[11px] px-2.5 py-0.5 bg-blue-50 text-blue-800 font-semibold rounded-full border border-blue-200">
                  {market.statusBadge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Farmer CTA Banner */}
      <section className="bg-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Are you a local farmer or market vendor?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-green-100 leading-relaxed">
              List your weekly harvest stock, set up your stall schedule, and let community shoppers pre-order directly before market day. Reduce unsold waste and plan your harvest better.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Commented out direct unauthenticated dashboard access for security:
            <Link
              to="/dashboard/home"
              className="bg-white text-green-800 hover:bg-green-50 font-bold px-5 py-3 rounded-xl text-xs text-center shadow-xs transition"
            >
              Access Vendor Dashboard
            </Link>
            */}
            <Link
              to="/login"
              className="bg-white text-green-800 hover:bg-green-50 font-bold px-5 py-3 rounded-xl text-xs text-center shadow-xs transition"
            >
              Farmer Login / Register
            </Link>
            <Link
              to="/about"
              className="bg-green-800 hover:bg-green-900 text-white font-bold px-5 py-3 rounded-xl text-xs text-center border border-green-600 transition"
            >
              Learn More About Platform
            </Link>
          </div>
        </div>
      </section>

      {/* Pre-Order Modal */}
      {activePreOrderProduct && (
        <PreOrderModal
          product={activePreOrderProduct}
          onClose={() => setActivePreOrderProduct(null)}
        />
      )}

    </div>
  );
}