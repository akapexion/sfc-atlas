import React, { useState } from 'react';
import { Store, CheckCircle } from 'lucide-react';

/**
 * MarketStallTab Component
 * Location: src/components/dashboard/MarketStallTab.jsx
 * Functionality: Settings form for editing market stall number and collection location notes.
 */
export default function MarketStallTab() {
  const [stallNumber, setStallNumber] = useState('Stall #A4');
  const [stallLocationNote, setStallLocationNote] = useState('West Pavilion - Near Central Plaza Fountain');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-5">
      
      <div className="border-b border-gray-100 pb-3">
        <h2 className="text-lg font-extrabold text-gray-900">Market Stall Information</h2>
        <p className="text-xs text-gray-500">Update your stall number and pickup pavilion guidance for shoppers</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl text-xs">
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Assigned Stall Number *</label>
          <input
            type="text"
            required
            value={stallNumber}
            onChange={(e) => setStallNumber(e.target.value)}
            className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 font-bold text-gray-900"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Stall Location Description</label>
          <textarea
            rows={3}
            value={stallLocationNote}
            onChange={(e) => setStallLocationNote(e.target.value)}
            className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {savedNotice && (
          <div className="p-3 bg-green-100 text-green-800 rounded-xl font-medium flex items-center gap-2">
            <CheckCircle size={16} className="text-green-700" />
            <span>Stall details updated successfully!</span>
          </div>
        )}

        <button
          type="submit"
          className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition cursor-pointer"
        >
          Save Stall Settings
        </button>
      </form>

    </div>
  );
}
