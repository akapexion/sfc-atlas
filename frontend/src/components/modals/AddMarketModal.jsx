import React, { useState } from 'react';
import { X } from 'lucide-react';

/**
 * AddMarketModal Component
 * Location: src/components/modals/AddMarketModal.jsx
 * Functionality: Admin modal form to create a new farmers market location.
 */
export default function AddMarketModal({ onSubmit, onClose }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [schedule, setSchedule] = useState('Every Saturday & Sunday');
  const [timing, setTiming] = useState('07:00 AM - 02:00 PM');
  const [stallsCount, setStallsCount] = useState('35');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !location) return;

    onSubmit({
      name,
      location,
      schedule,
      timing,
      stallsCount: Number(stallsCount) || 35
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-200 space-y-4 text-xs">
        
        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
          <h3 className="text-sm font-extrabold text-gray-900">Add New Farmers Market</h3>
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
              placeholder="e.g. Model Town Sunday Farmers Market"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">City & Location Address *</label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Model Town Park Grounds, Lahore"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Operating Days</label>
              <input
                type="text"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                placeholder="Every Sunday"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Operating Hours</label>
              <input
                type="text"
                value={timing}
                onChange={(e) => setTiming(e.target.value)}
                placeholder="07:00 AM - 02:00 PM"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Available Stalls Capacity</label>
            <input
              type="number"
              value={stallsCount}
              onChange={(e) => setStallsCount(e.target.value)}
              placeholder="35"
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
              Create Market Location
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
