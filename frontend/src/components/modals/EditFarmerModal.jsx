import React, { useState } from 'react';
import { X } from 'lucide-react';

/**
 * EditFarmerModal Component
 * Location: src/components/modals/EditFarmerModal.jsx
 * Functionality: Admin modal form to update an existing farmer's details.
 */
export default function EditFarmerModal({ farmer, onSubmit, onClose }) {
  if (!farmer) return null;

  const [name, setName] = useState(farmer.name || '');
  const [phone, setPhone] = useState(farmer.phone || '');
  const [farmName, setFarmName] = useState(farmer.farmName || '');
  const [location, setLocation] = useState(farmer.farmLocation || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(farmer.id, {
      name,
      phone,
      farmName,
      farmLocation: location
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-200 space-y-4 text-xs">
        
        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
          <h3 className="text-sm font-extrabold text-gray-900">Edit Farmer Details</h3>
          <button 
            type="button" 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Farmer Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Farm Name</label>
              <input
                type="text"
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Farm Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-xs transition"
            >
              Save Changes
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
