import React from 'react';
import { ShoppingBag, Plus, Trash2, Pencil } from 'lucide-react';
import { formatPKR } from '../../utils/helpers';

/**
 * ManageProductsTab Component
 * Location: src/components/dashboard/ManageProductsTab.jsx
 * Functionality: Inventory stock management tab for farmers to add produce, adjust stock, edit and remove items.
 */
export default function ManageProductsTab({
  products = [],
  onOpenAddProduct,
  onUpdateStock,
  onDeleteProduct,
  onEditProduct
}) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-5">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-lg font-extrabold text-gray-900">Manage Produce Stock & Inventory</h2>
          <p className="text-xs text-gray-500">Publish weekly harvest items and adjust stall stock quantities</p>
        </div>

        <button
          type="button"
          onClick={onOpenAddProduct}
          className="inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition cursor-pointer shadow-xs"
        >
          <Plus size={16} />
          <span>Add Produce Item</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((item) => (
          <div key={item.id} className="p-4 bg-gray-50/70 rounded-2xl border border-gray-200 space-y-3">
            <div className="flex gap-3">
              <img
                src={item.image || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=400'}
                alt={item.name}
                className="w-16 h-16 rounded-xl object-cover border border-gray-200 shrink-0 bg-gray-100"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=400';
                }}
              />
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">{item.category}</span>
                <h3 className="font-bold text-gray-900 text-xs leading-tight">{item.name}</h3>
                <p className="text-xs font-extrabold text-green-700">{formatPKR(item.price)} / {item.unit}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-200/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <span className="text-gray-500">Stock:</span>

                <button
                  type="button"
                  onClick={() => onUpdateStock(item.id, Math.max(0, item.stock - 5))}
                  className="w-5 h-5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded flex items-center justify-center font-bold"
                >
                  -
                </button>

                <span className="font-bold text-gray-900 px-1">{item.stock}</span>

                <button
                  type="button"
                  onClick={() => onUpdateStock(item.id, item.stock + 5)}
                  className="w-5 h-5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onEditProduct(item)}
                  className="p-1 text-gray-400 hover:text-green-600 rounded hover:bg-green-50"
                  title="Edit Produce Item"
                >
                  <Pencil size={15} />
                </button>

                <button
                  type="button"
                  onClick={() => onDeleteProduct(item.id)}
                  className="p-1 text-gray-400 hover:text-red-600 rounded hover:bg-red-50"
                  title="Remove Produce Item"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}