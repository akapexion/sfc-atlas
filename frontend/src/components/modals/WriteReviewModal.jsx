import React, { useState } from 'react';
import { Star, X } from 'lucide-react';

/**
 * WriteReviewModal Component
 * Location: src/components/modals/WriteReviewModal.jsx
 * Functionality: Modal form for shoppers to write reviews and rate farmers (1 to 5 stars).
 */
export default function WriteReviewModal({ farmers = [], userName, onSubmit, onClose }) {
  const [reviewFarmer, setReviewFarmer] = useState(farmers[0]?.name || 'Chaudhry Tariq Ahmed');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    onSubmit({
      customer: userName,
      farmer: reviewFarmer,
      rating: Number(reviewRating),
      comment: reviewComment.trim(),
      date: new Date().toLocaleDateString('en-PK')
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-gray-200 space-y-4 text-xs">
        
        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-yellow-500 text-white flex items-center justify-center font-bold">
              <Star size={16} />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-gray-900">Write a Farmer Review</h3>
              <p className="text-[10px] text-gray-500">Share your stall pickup feedback</p>
            </div>
          </div>

          <button 
            type="button" 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-700 p-1.5 rounded-xl hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Select Farmer *</label>
            <select
              value={reviewFarmer}
              onChange={(e) => setReviewFarmer(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {farmers.map(f => (
                <option key={f.id || f.name} value={f.name}>
                  {f.name} ({f.farmName || 'Local Farm'})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Rating Score (1-5 Stars) *</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setReviewRating(star)}
                  className={`p-2 rounded-xl border flex items-center gap-1 cursor-pointer transition ${
                    reviewRating >= star 
                      ? 'bg-yellow-50 border-yellow-300 text-yellow-600 font-bold' 
                      : 'bg-gray-50 border-gray-200 text-gray-400'
                  }`}
                >
                  <Star size={16} className={reviewRating >= star ? 'fill-yellow-400 text-yellow-500' : ''} />
                  <span>{star}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Your Review Feedback *</label>
            <textarea
              required
              rows={3}
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Freshness of produce, stall arrangement, friendliness..."
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-xs transition"
            >
              Submit Review
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
