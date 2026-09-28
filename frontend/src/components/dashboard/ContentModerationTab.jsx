import React, { useState } from 'react';
import { ShieldCheck, Star, CheckCircle, Trash2 } from 'lucide-react';

/**
 * ContentModerationTab Component
 * Location: src/components/dashboard/ContentModerationTab.jsx
 * Functionality: Moderation panel for customer review feedback and flagged comments.
 */
export default function ContentModerationTab({ reviews = [], onDeleteReview }) {
  const [filter, setFilter] = useState('flagged');
  const [resolvedIds, setResolvedIds] = useState([]);

  const flaggedList = reviews.filter(r => {
    if (filter === 'flagged') return r.rating <= 3 && !resolvedIds.includes(r.id);
    if (filter === 'resolved') return resolvedIds.includes(r.id);
    return true;
  });

  const handleResolve = (id) => {
    setResolvedIds(prev => [...prev, id]);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-5">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-lg font-extrabold text-gray-900">Content Moderation & Review Complaints</h2>
          <p className="text-xs text-gray-500">Monitor shopper feedback and handle low-rating stall complaints</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilter('flagged')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition ${
              filter === 'flagged' ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Flagged (≤ 3 Stars)
          </button>
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition ${
              filter === 'all' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-gray-100 text-gray-600'
            }`}
          >
            All Reviews ({reviews.length})
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {flaggedList.length === 0 ? (
          <div className="p-8 text-center text-xs text-gray-500 bg-gray-50 rounded-2xl">
            No flagged complaints requiring moderation attention at this time.
          </div>
        ) : (
          flaggedList.map((rev) => (
            <div key={rev.id || rev.comment} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">{rev.customer}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">Farmer: <strong>{rev.farmer}</strong></span>
                  <span className="flex items-center text-yellow-600 font-bold ml-2">
                    <Star size={13} className="fill-yellow-400 mr-0.5" />
                    {rev.rating} / 5
                  </span>
                </div>
                <p className="text-gray-700 italic">"{rev.comment}"</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {!resolvedIds.includes(rev.id) && (
                  <button
                    type="button"
                    onClick={() => handleResolve(rev.id)}
                    className="px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 rounded-xl font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCircle size={14} />
                    Resolve Issue
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onDeleteReview(rev.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                  title="Remove Review"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
