import React from 'react';
import { Users, MapPin, ShoppingBag, TrendingUp, ClipboardList, Star } from 'lucide-react';
import { formatPKR } from '../../utils/helpers';

/**
 * AdminOverviewTab Component
 * Location: src/components/dashboard/AdminOverviewTab.jsx
 * Functionality: Dynamic administrative metrics overview with live revenue, farmer breakdown, market stalls, organic stock, order statuses, and review ratings.
 */
export default function AdminOverviewTab({ farmers = [], markets = [], products = [], orders = [], reviews = [], onOpenAddFarmer }) {
  // Dynamic metrics calculations from live state
  const approvedFarmers = farmers.filter(f => f.status === 'approved').length;
  const pendingFarmers = farmers.filter(f => f.status === 'pending').length;
  const suspendedFarmers = farmers.filter(f => f.status === 'suspended').length;
  
  const activeOrders = orders.filter(o => o.status !== 'Cancelled');
  const totalRevenue = activeOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  
  const totalStalls = markets.reduce((sum, m) => sum + (Number(m.stallsCount) || 25), 0);
  const organicCount = products.filter(p => p.isOrganic).length;
  const totalStock = products.reduce((sum, p) => sum + (Number(p.stock) || 0), 0);

  const completedOrders = orders.filter(o => o.status === 'Completed').length;
  const readyOrders = orders.filter(o => o.status === 'Ready for Pickup').length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + (Number(r.rating) || 5), 0) / reviews.length) 
    : 4.9;

  return (
    <div className="space-y-6">
      
      {/* Dynamic Metrics Cards Grid (6 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Card 1: Total Platform Volume */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Platform Volume</span>
            <div className="w-8 h-8 rounded-lg bg-green-50 text-green-700 flex items-center justify-center font-bold">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-gray-900">{formatPKR(totalRevenue)}</div>
          <p className="text-[11px] text-green-700 font-semibold">{activeOrders.length} Active Orders • Cash on stall pickup</p>
        </div>

        {/* Card 2: Registered Farmers */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Registered Farmers</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <Users size={16} />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-gray-900">{farmers.length} Growers</div>
          <p className="text-[11px] text-gray-600 font-medium">
            <span className="text-green-700 font-bold">{approvedFarmers} Verified</span> • <span className="text-amber-700 font-bold">{pendingFarmers} Pending</span> • <span className="text-orange-700 font-bold">{suspendedFarmers} Suspended</span>
          </p>
        </div>

        {/* Card 3: Active Markets */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Markets</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <MapPin size={16} />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-gray-900">{markets.length} Locations</div>
          <p className="text-[11px] text-gray-500">{totalStalls} Total Stalls across regional markets</p>
        </div>

        {/* Card 4: Listed Produce Catalog */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Listed Produce</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <ShoppingBag size={16} />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-gray-900">{products.length} Produce Items</div>
          <p className="text-[11px] text-emerald-700 font-semibold">{organicCount} Organic Certified • {totalStock} Stock Units</p>
        </div>

        {/* Card 5: Pre-Orders Ticket Activity */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Order Reservations</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <ClipboardList size={16} />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-gray-900">{orders.length} Order Tickets</div>
          <p className="text-[11px] text-teal-700 font-semibold">{completedOrders} Completed • {readyOrders} Ready • {pendingOrders} Pending</p>
        </div>

        {/* Card 6: Shopper Satisfaction Rating */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Shopper Feedback</span>
            <div className="w-8 h-8 rounded-lg bg-yellow-50 text-yellow-700 flex items-center justify-center font-bold">
              <Star size={16} />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-gray-900 flex items-center gap-1.5">
            <Star size={20} className="fill-yellow-400 text-yellow-500" />
            <span>{avgRating.toFixed(1)} / 5.0</span>
          </div>
          <p className="text-[11px] text-gray-500">Based on {reviews.length} customer feedback reviews</p>
        </div>

      </div>

      {/* System Quick Overview Table */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-gray-900">Recent Pre-Orders Across Platform</h3>
            <p className="text-xs text-gray-500">Live order activity across all market stalls</p>
          </div>
          <button
            type="button"
            onClick={onOpenAddFarmer}
            className="text-xs bg-green-600 hover:bg-green-700 text-white font-bold px-3 py-2 rounded-xl transition shadow-xs cursor-pointer"
          >
            + Add New Farmer
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Farmer</th>
                <th className="p-3">Produce Reserved</th>
                <th className="p-3">Slot</th>
                <th className="p-3">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {orders.slice(0, 5).map(o => (
                <tr key={o.id} className="hover:bg-gray-50/60">
                  <td className="p-3 font-mono font-bold text-green-700">{o.id}</td>
                  <td className="p-3 font-semibold text-gray-900">{o.customer}</td>
                  <td className="p-3">{o.farmer}</td>
                  <td className="p-3">{o.items}</td>
                  <td className="p-3 text-[11px] text-gray-500">{o.pickupSlot}</td>
                  <td className="p-3 font-bold text-gray-900">{formatPKR(o.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
