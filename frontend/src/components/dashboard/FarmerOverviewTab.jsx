import React from 'react';
import { ShoppingBag, ClipboardList, DollarSign, Star, Plus } from 'lucide-react';
import { formatPKR, getStatusBadgeClass } from '../../utils/helpers';

/**
 * FarmerOverviewTab Component
 * Location: src/components/dashboard/FarmerOverviewTab.jsx
 * Functionality: Main farmer dashboard overview with earnings, incoming pre-orders preview, and stock stats.
 */
export default function FarmerOverviewTab({ products = [], orders = [], reviews = [], onOpenAddProduct, onUpdateOrderStatus }) {
  const farmerOrders = orders;
  const pendingOrders = farmerOrders.filter(o => o.status === 'Pending').length;
  const totalEarnings = farmerOrders
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + (Number(o.total) || 0), 0);

  return (
    <div className="space-y-6">
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Estimated Cash Earnings</span>
          <div className="text-2xl font-extrabold text-gray-900">{formatPKR(totalEarnings)}</div>
          <p className="text-[11px] text-green-700 font-semibold">Payable at market stall</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Pending Pre-Orders</span>
          <div className="text-2xl font-extrabold text-gray-900">{pendingOrders}</div>
          <p className="text-[11px] text-amber-700 font-semibold">Awaiting collection confirmation</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Active Stock Items</span>
          <div className="text-2xl font-extrabold text-gray-900">{products.length}</div>
          <p className="text-[11px] text-gray-500">Listed produce items</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Shopper Rating</span>
          <div className="text-2xl font-extrabold text-gray-900 flex items-center gap-1">
            <Star size={20} className="fill-yellow-400 text-yellow-500" />
            <span>4.9</span>
          </div>
          <p className="text-[11px] text-gray-500">Based on {reviews.length || 12} reviews</p>
        </div>
      </div>

      {/* Incoming Orders Preview Table */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-gray-900">Recent Incoming Pre-Orders</h3>
            <p className="text-xs text-gray-500">Customers who reserved produce for market pickup</p>
          </div>
          <button
            type="button"
            onClick={onOpenAddProduct}
            className="text-xs bg-green-600 hover:bg-green-700 text-white font-bold px-3 py-2 rounded-xl transition shadow-xs cursor-pointer"
          >
            + Add Produce Item
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
              <tr>
                <th className="p-3">Ticket ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Items Reserved</th>
                <th className="p-3">Pickup Slot</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {farmerOrders.slice(0, 5).map((o) => (
                <tr key={o.id} className="hover:bg-gray-50/60">
                  <td className="p-3 font-mono font-bold text-green-700">{o.id}</td>
                  <td className="p-3 font-semibold text-gray-900">{o.customer}</td>
                  <td className="p-3">{o.items}</td>
                  <td className="p-3 text-[11px] text-gray-500">{o.pickupSlot}</td>
                  <td className="p-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeClass(o.status)}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <select
                      value={o.status}
                      onChange={(e) => onUpdateOrderStatus(o.id, e.target.value)}
                      className="text-[11px] bg-white border border-gray-300 rounded-lg p-1 font-medium cursor-pointer"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Ready for Pickup">Ready for Pickup</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
