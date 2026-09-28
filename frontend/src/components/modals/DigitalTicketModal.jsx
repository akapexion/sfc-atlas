import React from 'react';
import { Ticket, X, MapPin, Calendar, Clock, Printer, CheckCircle } from 'lucide-react';
import { formatPKR } from '../../utils/helpers';

/**
 * DigitalTicketModal Component
 * Location: src/components/modals/DigitalTicketModal.jsx
 * Functionality: Renders printable digital pre-order pickup ticket voucher with simulated barcode.
 */
export default function DigitalTicketModal({ order, userName, onClose }) {
  if (!order) return null;

  const handlePrintTicket = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-gray-200 space-y-4 text-xs">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-green-600 text-white flex items-center justify-center font-bold">
              <Ticket size={16} />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-gray-900">Digital Pickup Ticket</h3>
              <p className="text-[10px] text-gray-500">MarketLink Stall Collection Pass</p>
            </div>
          </div>

          <button 
            type="button" 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-700 p-1.5 rounded-xl hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Ticket Voucher Box with Perforated Cut-Line */}
        <div className="relative p-5 bg-gradient-to-b from-green-50/70 to-emerald-50/30 rounded-2xl border border-green-300 shadow-sm space-y-4 overflow-hidden">
          
          {/* Side Ticket Notches */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-green-300" />
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-green-300" />

          {/* Simulated Barcode */}
          <div className="text-center py-2.5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-1">
            <div className="font-mono text-xl font-extrabold tracking-widest text-gray-800 select-none">
              ||| | ||||| ||| |||| |||| |||
            </div>
            <p className="font-mono text-xs font-extrabold text-green-700 tracking-wider">TICKET #{order.id}</p>
          </div>

          {/* Perforated Divider */}
          <div className="border-b-2 border-dashed border-green-300 my-2" />

          {/* Ticket Details */}
          <div className="space-y-2 pt-1">
            <div className="flex justify-between border-b border-green-100/80 pb-1.5">
              <span className="text-gray-500 font-semibold">Customer Name:</span>
              <span className="font-bold text-gray-900">{userName}</span>
            </div>

            <div className="flex justify-between border-b border-green-100/80 pb-1.5">
              <span className="text-gray-500 font-semibold">Farmer & Stall:</span>
              <span className="font-bold text-gray-900 text-right">{order.farmer} (Stall #A4)</span>
            </div>

            <div className="flex justify-between border-b border-green-100/80 pb-1.5">
              <span className="text-gray-500 font-semibold">Market Location:</span>
              <span className="font-bold text-gray-900 text-right">{order.market}</span>
            </div>

            <div className="flex justify-between border-b border-green-100/80 pb-1.5">
              <span className="text-gray-500 font-semibold">Pickup Time Window:</span>
              <span className="font-bold text-green-800 bg-green-100 px-2 py-0.5 rounded-md">{order.pickupSlot}</span>
            </div>

            <div className="flex justify-between border-b border-green-100/80 pb-1.5">
              <span className="text-gray-500 font-semibold">Reserved Produce Items:</span>
              <span className="font-bold text-gray-900 text-right max-w-[200px]">{order.items}</span>
            </div>

            <div className="flex justify-between pt-1">
              <span className="text-gray-700 font-bold text-sm">Total Payable at Stall:</span>
              <span className="font-extrabold text-base text-green-700">{formatPKR(order.total)}</span>
            </div>
          </div>

          <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-[10px] text-amber-800 flex items-center gap-1.5">
            <CheckCircle size={14} className="text-amber-600 shrink-0" />
            <span>Show this ticket pass at market stall #A4 upon arrival. Pay cash after inspection.</span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handlePrintTicket}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-xs transition flex items-center gap-1.5"
          >
            <Printer size={15} />
            <span>Print Ticket</span>
          </button>
        </div>

      </div>
    </div>
  );
}
