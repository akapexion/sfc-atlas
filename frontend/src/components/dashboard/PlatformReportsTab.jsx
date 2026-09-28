import React from 'react';
import { FileText, Download, Printer, TrendingUp } from 'lucide-react';
import { formatPKR } from '../../utils/helpers';

/**
 * PlatformReportsTab Component
 * Location: src/components/dashboard/PlatformReportsTab.jsx
 * Functionality: Executive analytics summary and printable platform reports.
 */
export default function PlatformReportsTab({ farmers = [], markets = [], orders = [] }) {
  const totalVolume = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + (Number(o.total) || 0), 0);

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-lg font-extrabold text-gray-900">Platform Analytics & Executive Reports</h2>
          <p className="text-xs text-gray-500">Aptech Techwiz 7 eGreen Basket Operational Summary</p>
        </div>

        <button
          type="button"
          onClick={handlePrintReport}
          className="inline-flex items-center gap-1.5 bg-gray-900 hover:bg-black text-white text-xs font-bold px-4 py-2.5 rounded-xl transition cursor-pointer shadow-xs"
        >
          <Printer size={16} />
          <span>Print Executive Summary</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-green-50/60 rounded-2xl border border-green-200 space-y-1 text-xs">
          <span className="text-gray-500 font-semibold">Pre-Order Gross Volume</span>
          <p className="text-2xl font-extrabold text-green-700">{formatPKR(totalVolume)}</p>
          <p className="text-[10px] text-green-800">Across {orders.length} reserved order tickets</p>
        </div>

        <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-200 space-y-1 text-xs">
          <span className="text-gray-500 font-semibold">Grower Network</span>
          <p className="text-2xl font-extrabold text-blue-700">{farmers.length} Farmers</p>
          <p className="text-[10px] text-blue-800">Direct field-to-stall collection model</p>
        </div>

        <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-200 space-y-1 text-xs">
          <span className="text-gray-500 font-semibold">Active Markets</span>
          <p className="text-2xl font-extrabold text-purple-700">{markets.length} Locations</p>
          <p className="text-[10px] text-purple-800">Lahore & Punjab regional markets</p>
        </div>
      </div>

    </div>
  );
}
