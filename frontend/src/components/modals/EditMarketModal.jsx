import React, { useState } from 'react';
import { X } from 'lucide-react';

/**
 * EditMarketModal Component
 * Location: src/components/modals/EditMarketModal.jsx
 * Functionality: Admin modal form to update an existing market's schedule and details.
 */
export default function EditMarketModal({ market, onSubmit, onClose }) {
  if (!market) return null;

  const [name, setName] = useState(market.name || '');
  const [location, setLocation] = useState(market.location || '');
  const [schedule, setSchedule] = useState(market.schedule || '');
  const [timing, setTiming] = useState(market.timing || '');
  const [stallsCount, setStallsCount] = useState(market.stallsCount || 35);
  const [status, setStatus] = useState(market.status || 'Active');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(market.id, {
      name,
      location,
      schedule,
      timing,
      stallsCount: Number(stallsCount),
      status
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-200 space-y-4 text-xs">
        
        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
          <h3 className="text-sm font-extrabold text-gray-900">Edit Market Details</h3>
          <button 
            type="button" 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Market Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Schedule</label>
              <input
                type="text"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Timing</label>
              <input
                type="text"
                value={timing}
                onChange={(e) => setTiming(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Active">Active</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Location & Address *</label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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
              Save Changes
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
