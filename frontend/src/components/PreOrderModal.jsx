import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ShoppingBag, 
  MapPin, 
  Store, 
  Clock, 
  CheckCircle2, 
  Phone, 
  User, 
  ShieldCheck, 
  Plus, 
  Minus 
} from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * PreOrderModal Component
 * Location: src/components/PreOrderModal.jsx
 * Functionality: Interactive pre-order reservation modal dialog.
 * Enables shoppers to pick item quantity, select pickup time slots (09:00 AM - 07:00 PM), enter contact info, and generate digital pre-order pickup ticket vouchers.
 */
export default function PreOrderModal({ product, onClose, onSuccess }) {
  if (!product) return null;

  const { addPreOrder } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupTimeSlot, setPickupTimeSlot] = useState('09:00 AM - 11:00 AM (Morning)');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');

  const totalPrice = (product.price * quantity).toFixed(2);

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = addPreOrder({
      id: generatedId,
      product,
      quantity,
      totalPrice,
      customerName,
      customerPhone,
      pickupTimeSlot
    });

    setOrderId(generatedId);
    setIsSubmitted(true);

    if (onSuccess) {
      onSuccess(newOrder);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center">
              <ShoppingBag size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 leading-tight">
                {isSubmitted ? 'Pre-Order Confirmation' : 'Reserve Produce for Pickup'}
              </h3>
              <p className="text-xs text-gray-500">
                {isSubmitted ? 'Your reservation receipt' : 'Direct from local farmer stall'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-200 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            
            {/* Product Summary Box */}
            <div className="p-4 rounded-xl bg-green-50/60 border border-green-200/80 flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-green-700 bg-green-100 px-2 py-0.5 rounded">
                  {product.category}
                </span>
                <h4 className="text-base font-bold text-gray-900 mt-1">
                  {product.name}
                </h4>
                <p className="text-xs text-gray-600 mt-0.5">
                  Sold by <strong className="text-gray-800">{product.farmer}</strong> • {product.farmerStall || 'Stall #A4'}
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <MapPin size={12} className="text-green-600" />
                  <span>{product.market}</span>
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-lg font-extrabold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xs text-gray-500 block">/ {product.unit}</span>
                <span className="text-[10px] text-green-700 bg-green-100 px-1.5 py-0.5 rounded mt-1 inline-block font-medium">
                  {product.stock} {product.unit} available
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-200">
              <div>
                <label className="text-xs font-bold text-gray-800 block">
                  Select Quantity ({product.unit})
                </label>
                <span className="text-[11px] text-gray-500">
                  Total: <strong className="text-green-700 font-semibold">${totalPrice}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  className="w-8 h-8 rounded-lg bg-white border border-gray-300 text-gray-700 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40 transition"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center text-sm font-bold text-gray-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  disabled={quantity >= product.stock}
                  className="w-8 h-8 rounded-lg bg-white border border-gray-300 text-gray-700 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40 transition"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Customer Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                  <User size={13} className="text-gray-400" />
                  <span>Your Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Asad Khan"
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                    <Phone size={13} className="text-gray-400" />
                    <span>Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="0300-1234567"
                    className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                    <Clock size={13} className="text-gray-400" />
                    <span>Pickup Time Window</span>
                  </label>
                  <select
                    value={pickupTimeSlot}
                    onChange={(e) => setPickupTimeSlot(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="09:00 AM - 11:00 AM (Morning Window)">09:00 AM - 11:00 AM (Morning Window)</option>
                    <option value="11:00 AM - 01:00 PM (Mid-Day Window)">11:00 AM - 01:00 PM (Mid-Day Window)</option>
                    <option value="01:00 PM - 03:00 PM (Afternoon Window)">01:00 PM - 03:00 PM (Afternoon Window)</option>
                    <option value="03:00 PM - 05:00 PM (Late Afternoon Window)">03:00 PM - 05:00 PM (Late Afternoon Window)</option>
                    <option value="05:00 PM - 07:00 PM (Evening Window)">05:00 PM - 07:00 PM (Evening Window)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Zero Gateway Fee Callout */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 flex items-start gap-2">
              <ShieldCheck size={16} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">No online card required:</span> Pay{' '}
                <strong className="font-extrabold text-amber-900">${totalPrice}</strong> in cash or QR directly at{' '}
                <span className="underline">{product.farmer}</span>'s stall during pickup.
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg transition shadow-xs flex items-center gap-1.5"
              >
                <CheckCircle2 size={15} />
                <span>Confirm Pre-Order (${totalPrice})</span>
              </button>
            </div>

          </form>
        ) : (
          /* Receipt Success State */
          <div className="p-6 text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 size={32} />
            </div>

            <div>
              <span className="text-xs font-semibold text-green-700 uppercase tracking-wider bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                Reservation Confirmed
              </span>
              <h4 className="text-xl font-extrabold text-gray-900 mt-2">
                Pre-Order Ticket #{orderId}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Your fresh produce has been reserved with <strong className="text-gray-800">{product.farmer}</strong>.
              </p>
            </div>

            {/* Receipt Box */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Item Reserved:</span>
                <span className="font-bold text-gray-900">{quantity}x {product.name}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Market & Stall:</span>
                <span className="font-semibold text-gray-800">{product.market} ({product.farmerStall || 'Stall #A4'})</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Pickup Slot:</span>
                <span className="font-semibold text-gray-800">{pickupTimeSlot}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-gray-500 font-semibold">Total Amount Due at Stall:</span>
                <span className="font-extrabold text-base text-green-700">${totalPrice}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
              <Link
                to="/dashboard/home?role=customer"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg transition"
              >
                Track in Customer Dashboard
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-lg transition"
              >
                Close Receipt
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
