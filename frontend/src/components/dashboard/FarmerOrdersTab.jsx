import React, { useState } from 'react';
import { ClipboardList, Search } from 'lucide-react';
import { formatPKR, getStatusBadgeClass } from '../../utils/helpers';

/**
 * FarmerOrdersTab Component
 * Location: src/components/dashboard/FarmerOrdersTab.jsx
 * Functionality: Incoming pre-orders management tab for farmers to search and update order status.
 */
export default function FarmerOrdersTab({ orders = [], onUpdateOrderStatus }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredOrders = orders.filter((o) => {
    const searchMatch = o.id.toLowerCase().includes(search.toLowerCase()) ||
                        o.customer.toLowerCase().includes(search.toLowerCase()) ||
                        o.items.toLowerCase().includes(search.toLowerCase());
    const statusMatch = statusFilter === 'All' || o.status === statusFilter;
    return searchMatch && statusMatch;
  });

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-5">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-lg font-extrabold text-gray-900">Incoming Pre-Order Reservations</h2>
          <p className="text-xs text-gray-500">Manage customer pickup tickets and collection status</p>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['All', 'Pending', 'Confirmed', 'Processing', 'Ready for Pickup', 'Completed', 'Cancelled'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition cursor-pointer ${
                statusFilter === st ? 'bg-green-600 text-white shadow-xs' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search pre-orders by ticket ID, customer name, or items..."
          className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="space-y-3">
        {filteredOrders.map((o) => (
          <div key={o.id} className="p-4 bg-gray-50/70 rounded-2xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-green-700">{o.id}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeClass(o.status)}`}>
                  {o.status}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-sm">{o.customer} ({o.phone || '0312-3456789'})</h3>
              <p className="text-gray-600">{o.items}</p>
              <p className="text-[11px] text-gray-500">Slot: <strong>{o.pickupSlot}</strong></p>
            </div>

            <div className="flex sm:flex-col items-end justify-between gap-2 shrink-0">
              <span className="text-base font-extrabold text-green-700">{formatPKR(o.total)}</span>
              <select
                value={o.status}
                onChange={(e) => onUpdateOrderStatus(o.id, e.target.value)}
                className="text-xs bg-white border border-gray-300 rounded-xl p-1.5 font-bold text-gray-800 cursor-pointer"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Processing">Processing</option>
                <option value="Ready for Pickup">Ready for Pickup</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
