import React, { useState } from 'react';
import { ClipboardList, Search, Ticket } from 'lucide-react';
import { formatPKR, getStatusBadgeClass } from '../../utils/helpers';

/**
 * CustomerOrdersTab Component
 * Location: src/components/dashboard/CustomerOrdersTab.jsx
 * Functionality: Full pre-orders list with search filtering, status tabs, and ticket modal triggers.
 */
export default function CustomerOrdersTab({ orders = [], onOpenTicket }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredOrders = orders.filter((o) => {
    const searchMatch = o.id.toLowerCase().includes(search.toLowerCase()) ||
                        o.farmer.toLowerCase().includes(search.toLowerCase()) ||
                        o.items.toLowerCase().includes(search.toLowerCase());
    const statusMatch = statusFilter === 'ALL' || o.status.toUpperCase() === statusFilter;
    return searchMatch && statusMatch;
  });

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-5">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-lg font-extrabold text-gray-900">My Harvest Pre-Orders</h2>
          <p className="text-xs text-gray-500">View reserved produce tickets and collection slot passes</p>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['ALL', 'PENDING', 'CONFIRMED', 'PROCESSING', 'READY FOR PICKUP', 'COMPLETED', 'CANCELLED'].map((st) => (
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
          placeholder="Search pre-orders by ticket ID, farmer, or produce items..."
          className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="p-8 text-center text-xs text-gray-500 bg-gray-50 rounded-2xl">
            No pre-orders found matching your search.
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="p-4 bg-gray-50/70 rounded-2xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-green-700">{order.id}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeClass(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm">{order.farmer}</h3>
                <p className="text-gray-600">{order.items}</p>
                <p className="text-[11px] text-gray-500">{order.market} • {order.pickupSlot}</p>
              </div>

              <div className="flex sm:flex-col items-end justify-between gap-2 shrink-0">
                <span className="text-base font-extrabold text-green-700">{formatPKR(order.total)}</span>
                <button
                  type="button"
                  onClick={() => onOpenTicket(order)}
                  className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Ticket size={14} />
                  <span>View Pass</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
