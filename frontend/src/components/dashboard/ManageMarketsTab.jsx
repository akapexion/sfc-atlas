import React, { useState } from 'react';
import { MapPin, Search, Plus, Edit, Trash2 } from 'lucide-react';

/**
 * ManageMarketsTab Component
 * Location: src/components/dashboard/ManageMarketsTab.jsx
 * Functionality: Management interface for adding, editing, and deleting farmers market locations.
 */
export default function ManageMarketsTab({ markets = [], onOpenAdd, onEdit, onDelete }) {
  const [search, setSearch] = useState('');

  const filteredMarkets = markets.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-5">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-lg font-extrabold text-gray-900">Farmers Market Directory Management</h2>
          <p className="text-xs text-gray-500">Configure regional market locations, stall allocations, and weekly schedules</p>
        </div>

        <button
          type="button"
          onClick={onOpenAdd}
          className="inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition cursor-pointer shadow-xs"
        >
          <Plus size={16} />
          <span>Add Market Location</span>
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search markets by name or city..."
          className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMarkets.map((m) => (
          <div key={m.id || m.name} className="p-4 bg-gray-50/60 rounded-2xl border border-gray-200 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">{m.name}</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                  <MapPin size={13} className="text-green-600 shrink-0" />
                  <span>{m.location}</span>
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onEdit(m)}
                  className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-white rounded-lg transition"
                >
                  <Edit size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(m.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-200/80 flex items-center justify-between text-xs text-gray-600">
              <span>Days: <strong>{m.schedule || 'Weekend'}</strong></span>
              <span>Timing: <strong>{m.timing || '07:00 AM - 02:00 PM'}</strong></span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
