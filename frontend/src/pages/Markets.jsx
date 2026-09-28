import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Store, 
  Users, 
  Search, 
  ArrowRight, 
  Navigation, 
  ShoppingBag,
  ExternalLink,
  Sprout
} from 'lucide-react';

/**
 * Markets Page Component
 * Location: src/pages/Markets.jsx
 * Functionality: Public directory of regional farmers markets.
 * Features search filtering by market name or city, day filter buttons, and stall pickup details.
 */
export default function Markets() {
  const { markets, products } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDay, setSelectedDay] = useState('All');

  const daysList = ['All', 'Saturday', 'Sunday', 'Wednesday', 'Friday'];

  const filteredMarkets = markets.filter((market) => {
    const marketName = market.name || '';
    const marketLoc = market.location || '';
    const marketDay = market.day || market.schedule || '';

    const matchesSearch = marketName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          marketLoc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDay = selectedDay === 'All' || marketDay.toLowerCase().includes(selectedDay.toLowerCase());
    return matchesSearch && matchesDay;
  });

  return (
    <div className="bg-gray-50/50 min-h-screen pb-16 text-gray-800">
      
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold border border-green-200 mb-3">
                <MapPin size={14} />
                <span>Community Market Locations</span>
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Farmers Market Directory
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Explore local market schedules, stall layouts, and designated pre-order collection zones.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs bg-gray-100 text-gray-700 font-medium px-3 py-1.5 rounded-lg border border-gray-200">
                Active Locations: <strong className="text-gray-900">{markets.length} Regional Markets</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-2.5 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search markets by name or city location..."
              className="w-full pl-10 pr-4 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Day Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            <span className="text-xs font-semibold text-gray-400 mr-1 shrink-0">Filter Day:</span>
            {daysList.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDay(day)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                  selectedDay === day
                    ? 'bg-green-600 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

        </div>

        {/* Markets Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMarkets.length > 0 ? (
            filteredMarkets.map((market) => {
              const marketProductsCount = products.filter(p => p.marketId === market.id).length;

              return (
                <div
                  key={market.id}
                  className="bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 p-6 flex flex-col justify-between"
                >
                  <div>
                    
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                        <Calendar size={13} />
                        <span>{market.day}</span>
                      </span>

                      <span className="text-[11px] font-semibold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                        {market.statusBadge}
                      </span>
                    </div>

                    {/* Market Name & Tagline */}
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {market.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium mb-4">
                      {market.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-xs text-gray-600 leading-relaxed mb-5">
                      {market.description}
                    </p>

                    {/* Key Info Details Grid */}
                    <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-200/80 space-y-2.5 text-xs text-gray-700 mb-5">
                      
                      <div className="flex items-start gap-2.5">
                        <Clock size={15} className="text-gray-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-gray-900 block">Operating Hours</span>
                          <span className="text-gray-600">{market.hours}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <MapPin size={15} className="text-green-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-gray-900 block">Location & Address</span>
                          <span className="text-gray-600">{market.location} ({market.address})</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <Store size={15} className="text-gray-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-gray-900 block">Designated Pickup Zone</span>
                          <span className="text-green-700 font-semibold">{market.pickupZone}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-gray-200 text-[11px] text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users size={13} className="text-gray-400" />
                          <span>{market.stallsCount} Total Stalls ({market.activeFarmersCount} Active Farmers)</span>
                        </span>
                        <span className="font-semibold text-gray-700">{marketProductsCount} Produce Items Listed</span>
                      </div>

                    </div>

                    {/* Farmers attending tags */}
                    <div className="mb-4">
                      <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                        Attending Local Growers:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {market.farmers.map((farmer) => (
                          <span
                            key={farmer}
                            className="text-[11px] font-medium bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-lg border border-gray-200 flex items-center gap-1"
                          >
                            <Sprout size={11} className="text-green-600" />
                            <span>{farmer}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Card Actions */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(market.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-gray-900"
                    >
                      <Navigation size={13} />
                      <span>Directions</span>
                      <ExternalLink size={11} className="text-gray-400" />
                    </a>

                    <Link
                      to="/products"
                      className="inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-xs"
                    >
                      <ShoppingBag size={14} />
                      <span>View Market Produce</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>

                </div>
              );
            })
          ) : (
            <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-gray-200 p-8">
              <MapPin size={32} className="mx-auto text-gray-400 mb-3" />
              <h4 className="text-base font-bold text-gray-900">No markets found</h4>
              <p className="text-xs text-gray-500 mt-1">
                Try adjusting your search or day filter.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
