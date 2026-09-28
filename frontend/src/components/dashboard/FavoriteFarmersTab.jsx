import React, { useState } from 'react';
import { Heart, MapPin, Star, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * FavoriteFarmersTab Component
 * Location: src/components/dashboard/FavoriteFarmersTab.jsx
 * Functionality: Displays customer's saved favorite farmers and market stall contact details.
 */
export default function FavoriteFarmersTab({ farmers = [] }) {
  const [favoriteIds, setFavoriteIds] = useState(['FARM-101', 'FARM-102']);

  const toggleFavorite = (id) => {
    setFavoriteIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-5">
      
      <div className="border-b border-gray-100 pb-3">
        <h2 className="text-lg font-extrabold text-gray-900">Favorite Growers & Farmers</h2>
        <p className="text-xs text-gray-500">Quick access to your preferred stall vendors</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {farmers.map((farm) => {
          const isFav = favoriteIds.includes(farm.id);
          return (
            <div key={farm.id || farm.name} className="p-4 bg-gray-50/70 rounded-2xl border border-gray-200 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{farm.name}</h3>
                  <p className="text-xs text-green-700 font-semibold">{farm.farmName}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleFavorite(farm.id)}
                  className={`p-1.5 rounded-full transition cursor-pointer ${
                    isFav ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-400 hover:text-red-500'
                  }`}
                >
                  <Heart size={16} className={isFav ? 'fill-red-500' : ''} />
                </button>
              </div>

              <div className="text-xs text-gray-600 space-y-1">
                <p className="flex items-center gap-1">
                  <MapPin size={13} className="text-gray-400" />
                  <span>{farm.farmLocation}</span>
                </p>
                <p className="flex items-center gap-1">
                  <Phone size={13} className="text-gray-400" />
                  <span>{farm.phone}</span>
                </p>
              </div>

              <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-xs">
                <span className="flex items-center text-yellow-600 font-bold">
                  <Star size={13} className="fill-yellow-400 mr-1" />
                  {farm.rating || 4.9} Rating
                </span>
                <Link to="/products" className="text-green-700 font-bold hover:underline">
                  Browse Produce →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
