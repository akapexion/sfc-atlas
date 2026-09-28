import React from 'react';
import { Star } from 'lucide-react';

/**
 * FarmerReviewsTab Component
 * Location: src/components/dashboard/FarmerReviewsTab.jsx
 * Functionality: Displays customer feedback and ratings submitted for farmer's stall.
 */
export default function FarmerReviewsTab({ reviews = [] }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-5">
      
      <div className="border-b border-gray-100 pb-3">
        <h2 className="text-lg font-extrabold text-gray-900">Customer Stall Reviews & Ratings</h2>
        <p className="text-xs text-gray-500">Shopper feedback submitted after market pickup</p>
      </div>

      <div className="space-y-3">
        {reviews.map((rev) => (
          <div key={rev.id || rev.comment} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-1.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-900">{rev.customer}</span>
              <span className="flex items-center text-yellow-600 font-bold">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className={i < rev.rating ? 'fill-yellow-400 text-yellow-500' : 'text-gray-300'}
                  />
                ))}
              </span>
            </div>
            <p className="text-gray-700 italic">"{rev.comment}"</p>
            <p className="text-[10px] text-gray-400">Date: {rev.date || 'Recent pickup'}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
