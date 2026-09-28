import React, { useState } from 'react';
import { Users, Search, Check, Ban, Trash2, Edit, Plus, AlertTriangle } from 'lucide-react';
import { getStatusBadgeClass } from '../../utils/helpers';

// Admin management table for farmer approvals and account actions
export default function FarmerApprovalsTab({
  farmers = [],
  onApprove,
  onReject,
  onSuspend,
  onDelete,
  onEdit,
  onOpenAdd
}) {
  const [farmerSearch, setFarmerSearch] = useState('');
  const [farmerStatusFilter, setFarmerStatusFilter] = useState('All');

  const filteredFarmers = farmers.filter((f) => {
    const nameMatch = f.name.toLowerCase().includes(farmerSearch.toLowerCase()) ||
                      f.farmName.toLowerCase().includes(farmerSearch.toLowerCase()) ||
                      f.farmLocation.toLowerCase().includes(farmerSearch.toLowerCase());
    const statusMatch = farmerStatusFilter === 'All' || f.status === farmerStatusFilter.toLowerCase();
    return nameMatch && statusMatch;
  });

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-5">
      
      {/* Tab Header & Search Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-lg font-extrabold text-gray-900">Farmer Registration & Account Management</h2>
          <p className="text-xs text-gray-500">Review grower credentials, approve, suspend, reject, or manage farmer accounts</p>
        </div>

        <button
          type="button"
          onClick={onOpenAdd}
          className="inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition cursor-pointer shadow-xs"
        >
          <Plus size={16} />
          <span>Add Farmer Account</span>
        </button>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="relative sm:col-span-8">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={farmerSearch}
            onChange={(e) => setFarmerSearch(e.target.value)}
            placeholder="Search farmer by name, farm name, or location..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={farmerStatusFilter}
            onChange={(e) => setFarmerStatusFilter(e.target.value)}
            className="w-full text-xs py-2 px-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="All">All Statuses ({farmers.length})</option>
            <option value="pending">Pending Review</option>
            <option value="approved">Approved / Verified</option>
            <option value="suspended">Suspended Accounts</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Farmers Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
            <tr>
              <th className="p-3">Farmer Name</th>
              <th className="p-3">Farm Name & Location</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {filteredFarmers.map((f) => (
              <tr key={f.id} className="hover:bg-gray-50/60">
                <td className="p-3 font-semibold text-gray-900">{f.name}</td>
                <td className="p-3">
                  <div className="font-medium text-gray-800">{f.farmName}</div>
                  <div className="text-[10px] text-gray-500">{f.farmLocation}</div>
                </td>
                <td className="p-3 text-[11px] text-gray-500">
                  <div>{f.email}</div>
                  <div>{f.phone}</div>
                </td>
                <td className="p-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeClass(f.status)}`}>
                    {f.status.toUpperCase()}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-1.5 flex-wrap">
                    {f.status !== 'approved' && (
                      <button
                        type="button"
                        onClick={() => onApprove(f.id)}
                        className="px-2.5 py-1 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg font-bold flex items-center gap-1 cursor-pointer text-[11px]"
                        title="Approve / Re-Verify Farmer"
                      >
                        <Check size={13} />
                        <span>Approve</span>
                      </button>
                    )}

                    {f.status !== 'suspended' && (
                      <button
                        type="button"
                        onClick={() => onSuspend && onSuspend(f.id)}
                        className="px-2.5 py-1 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-lg font-bold flex items-center gap-1 cursor-pointer text-[11px]"
                        title="Suspend Account"
                      >
                        <AlertTriangle size={13} />
                        <span>Suspend</span>
                      </button>
                    )}

                    {f.status !== 'rejected' && (
                      <button
                        type="button"
                        onClick={() => onReject(f.id)}
                        className="px-2.5 py-1 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg font-bold flex items-center gap-1 cursor-pointer text-[11px]"
                        title="Reject Account"
                      >
                        <Ban size={13} />
                        <span>Reject</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => onEdit(f)}
                      className="p-1 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 cursor-pointer"
                      title="Edit Farmer Info"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(f.id)}
                      className="p-1 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 cursor-pointer"
                      title="Delete Account Permanently"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
