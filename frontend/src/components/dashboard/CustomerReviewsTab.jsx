import React from 'react';
import { Star, Plus } from 'lucide-react';

/**
 * CustomerReviewsTab Component
 * Location: src/components/dashboard/CustomerReviewsTab.jsx
 * Functionality: Displays reviews submitted by customer and trigger for writing new review.
 */
export default function CustomerReviewsTab({ reviews = [], onOpenWriteReview }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-5">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-lg font-extrabold text-gray-900">My Ratings & Stall Reviews</h2>
          <p className="text-xs text-gray-500">Feedback submitted for local growers</p>
        </div>

        <button
          type="button"
          onClick={onOpenWriteReview}
          className="inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition cursor-pointer shadow-xs"
        >
          <Plus size={16} />
          <span>Write New Review</span>
        </button>
      </div>

      <div className="space-y-3">
        {reviews.length === 0 ? (
          <div className="p-8 text-center text-xs text-gray-500 bg-gray-50 rounded-2xl">
            No reviews submitted yet. Click "Write New Review" above!
          </div>
        ) : (
          reviews.map((rev) => (
            <div key={rev.id || rev.comment} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900 text-sm">{rev.farmer}</span>
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
              <p className="text-[10px] text-gray-400">Submitted on: {rev.date || 'Recent pickup'}</p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
