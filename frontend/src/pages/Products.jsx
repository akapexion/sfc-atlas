import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES_LIST } from '../data/mockData';
import PreOrderModal from '../components/PreOrderModal';
import AuthModal from '../components/AuthModal';
import { 
  Search, 
  Filter, 
  ShoppingBag, 
  MapPin, 
  Sprout, 
  Star, 
  Info,
  CheckCircle2
} from 'lucide-react';

/**
 * Products Page Component
 * Location: src/pages/Products.jsx
 * Functionality: Full harvest marketplace catalog with real-time live search, market location dropdown, price sorting, guest auth checks, and pre-order ticket modal triggers.
 */
export default function Products() {
  const { products, markets } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarketId, setSelectedMarketId] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [activePreOrderProduct, setActivePreOrderProduct] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  // Product waiting to be pre-ordered after the user logs in
  const [pendingProduct, setPendingProduct] = useState(null);

  const handlePreOrderClick = (product) => {
    const isLoggedIn = Boolean(
      localStorage.getItem('marketlink_user_name') ||
      localStorage.getItem('marketlink_user_email')
    );

    if (!isLoggedIn) {
      setPendingProduct(product);
      setAuthModalMode('login');
      setShowAuthModal(true);
      return;
    }

    setActivePreOrderProduct(product);
  };

  // Called after successful auth in the modal — open the pre-order for the pending product
  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    if (pendingProduct) {
      setActivePreOrderProduct(pendingProduct);
      setPendingProduct(null);
    }
  };

  // Filter & Sort Logic
  const filteredProducts = products.filter((product) => {
    const q = searchQuery.toLowerCase();
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = !q || 
      (product.name && product.name.toLowerCase().includes(q)) ||
      (product.farmer && product.farmer.toLowerCase().includes(q)) ||
      (product.market && product.market.toLowerCase().includes(q)) ||
      (product.category && product.category.toLowerCase().includes(q)) ||
      (product.description && product.description.toLowerCase().includes(q));
    const matchesMarket = selectedMarketId === 'All' || String(product.marketId) === String(selectedMarketId);

    return matchesCategory && matchesSearch && matchesMarket;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return b.id - a.id;
  });

  return (
    <div className="bg-gray-50/50 min-h-screen pb-16 text-gray-800">
      
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold border border-green-200 mb-3">
                <Sprout size={14} />
                <span>Weekly Produce Inventory</span>
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Fresh Harvest Marketplace
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Browse seasonal items from verified local farmers and reserve for market pickup.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs bg-gray-100 text-gray-700 font-medium px-3 py-1.5 rounded-lg border border-gray-200">
                Total Listed: <strong className="text-gray-900">{products.length} Items</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs mb-8 space-y-4">
          
          {/* Top Bar: Search, Market Selector & Sort */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            
            {/* Search Input */}
            <div className="relative md:col-span-6">
              <Search className="absolute left-3.5 top-2.5 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by produce name or farm (e.g. Tomatoes, Green Valley)..."
                className="w-full pl-10 pr-4 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Filter by Market */}
            <div className="md:col-span-3">
              <select
                value={selectedMarketId}
                onChange={(e) => setSelectedMarketId(e.target.value)}
                className="w-full text-xs py-2 px-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="All">All Farmers Markets</option>
                {markets.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full text-xs py-2 px-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

          </div>

          {/* Bottom Bar: Category Pill Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-gray-100">
            <span className="text-xs font-semibold text-gray-400 mr-2 shrink-0 flex items-center gap-1">
              <Filter size={13} />
              Category:
            </span>
            {CATEGORIES_LIST.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-green-600 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between relative group"
              >
                <div>
                  
                  {/* Product Image Thumbnail */}
                  <div className="relative h-44 w-full mb-3 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={product.image || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=500'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=500';
                      }}
                    />
                    <div className="absolute top-2 left-2 flex items-center gap-1">
                      <span className="text-[10px] font-bold text-green-800 bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-gray-200 shadow-xs">
                        {product.category}
                      </span>
                    </div>
                    {product.isOrganic && (
                      <div className="absolute top-2 right-2">
                        <span className="text-[10px] font-semibold text-emerald-800 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1 shadow-xs">
                          <CheckCircle2 size={11} className="text-emerald-600" />
                          <span>Organic</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title & Farmer */}
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-green-700 transition mb-1">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <span className="font-semibold text-gray-800">{product.farmer}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5 text-amber-600 font-medium">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      {product.farmerRating || 4.9}
                    </span>
                    <span>•</span>
                    <span className="text-gray-400">{product.farmerStall || 'Stall #A4'}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-2">
                    {product.description}
                  </p>

                </div>

                <div>
                  {/* Market info & stock */}
                  <div className="pt-3 border-t border-gray-100 mb-4 space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <MapPin size={13} className="text-green-600 shrink-0" />
                      <span className="truncate">{product.market}</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-gray-500">
                        <span>Harvest: {product.harvestDate}</span>
                        <span className={`font-semibold ${product.stock > 0 ? 'text-green-700' : 'text-red-600'}`}>
                          {product.stock > 0 ? `${product.stock} ${product.unit} in stock` : 'Out of stock'}
                        </span>
                      </div>
                      {product.stock > 0 && (
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${product.stock > 10 ? 'bg-green-500' : 'bg-amber-500'}`}
                            style={{ width: `${Math.min(100, (product.stock / 30) * 100)}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price & Action Button */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-2xl font-extrabold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-gray-500 ml-1">/ {product.unit}</span>
                    </div>

                    <button
                      type="button"
                      disabled={product.stock <= 0}
                      onClick={() => handlePreOrderClick(product)}
                      className="inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-xs hover:shadow cursor-pointer"
                    >
                      <ShoppingBag size={14} />
                      <span>{product.stock > 0 ? 'Pre-Order' : 'Sold Out'}</span>
                    </button>
                  </div>

                </div>

              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-gray-200 p-8">
              <Info size={32} className="mx-auto text-gray-400 mb-3" />
              <h4 className="text-base font-bold text-gray-900">No produce found</h4>
              <p className="text-xs text-gray-500 mt-1">
                Try clearing your search query or selecting a different produce category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedMarketId('All');
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold text-green-700 bg-green-50 rounded-xl hover:bg-green-100 transition"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Pre-Order Dialog Modal */}
      {activePreOrderProduct && (
        <PreOrderModal
          product={activePreOrderProduct}
          onClose={() => setActivePreOrderProduct(null)}
        />
      )}

      {/* Auth Modal — shown to guest users who click Pre-Order */}
      {showAuthModal && (
        <AuthModal
          initialMode={authModalMode}
          productName={pendingProduct?.name}
          onClose={() => { setShowAuthModal(false); setPendingProduct(null); }}
          onSuccess={handleAuthSuccess}
        />
      )}

    </div>
  );
}
