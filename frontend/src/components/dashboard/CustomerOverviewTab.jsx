import React from 'react';
import { ClipboardList, MapPin, Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { formatPKR, getStatusBadgeClass } from '../../utils/helpers';
import { Link } from 'react-router-dom';

/**
 * CustomerOverviewTab Component
 * Location: src/components/dashboard/CustomerOverviewTab.jsx
 * Functionality: Main shopper dashboard overview displaying pre-order stats, active ticket vouchers, and favorite farm shortcuts.
 */
export default function CustomerOverviewTab({ orders = [], products = [], farmers = [], onOpenTicket }) {
  const activeOrders = orders.filter(o => o.status !== 'Cancelled' && o.status !== 'Completed');

  return (
    <div className="space-y-6">
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Active Pre-Orders</span>
          <div className="text-2xl font-extrabold text-gray-900">{activeOrders.length}</div>
          <p className="text-[11px] text-green-700 font-semibold">Reserved for upcoming market pickup</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Total Orders Placed</span>
          <div className="text-2xl font-extrabold text-gray-900">{orders.length}</div>
          <p className="text-[11px] text-gray-500">History across regional stalls</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Favorite Farms</span>
          <div className="text-2xl font-extrabold text-gray-900">{farmers.length}</div>
          <p className="text-[11px] text-gray-500">Verified local growers</p>
        </div>
      </div>

      {/* Active Pre-Order Tickets */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-gray-900">Your Active Pickup Vouchers</h3>
            <p className="text-xs text-gray-500">Click ticket to view printable pass & barcode</p>
          </div>
          <Link to="/products" className="text-xs text-green-700 font-bold hover:underline flex items-center gap-1">
            <span>Reserve Harvest</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {orders.slice(0, 4).map((order) => (
            <div
              key={order.id}
              onClick={() => onOpenTicket(order)}
              className="p-4 bg-gray-50/70 hover:bg-green-50/40 rounded-2xl border border-gray-200 transition cursor-pointer space-y-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono font-bold text-green-700 text-xs">{order.id}</span>
                  <p className="font-semibold text-gray-900 text-sm mt-0.5">{order.farmer}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeClass(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <p className="text-xs text-gray-600 line-clamp-1">{order.items}</p>

              <div className="pt-2 border-t border-gray-200/80 flex items-center justify-between text-xs">
                <span className="text-gray-500">{order.pickupSlot}</span>
                <span className="font-extrabold text-green-700">{formatPKR(order.total)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
