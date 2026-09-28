import React, { useState } from 'react';
import {
  ShoppingBag,
  X,
  Image as ImageIcon,
  Link as LinkIcon,
  Check,
  Camera,
  ImagePlus
} from 'lucide-react';

import { CATEGORIES_LIST } from '../../data/mockData';

const PRESET_PRODUCE_IMAGES = [
  {
    label: 'Tomatoes',
    url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=500'
  },
  {
    label: 'Citrus / Kinnow',
    url: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=500'
  },
  {
    label: 'Leafy Spinach',
    url: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=500'
  },
  {
    label: 'Pure Honey',
    url: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&q=80&w=500'
  },
  {
    label: 'Farm Dairy & Eggs',
    url: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=500'
  },
  {
    label: 'Wheat & Grains',
    url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=500'
  }
];

export default function AddProductModal({
  markets = [],
  product = null,
  onSubmit,
  onClose
}) {

  const isEdit = !!product;

  const [name, setName] = useState(product?.name || '');
  const [category, setCategory] = useState(
    product?.category || 'Vegetables'
  );
  const [price, setPrice] = useState(product?.price || '');
  const [unit, setUnit] = useState(product?.unit || 'kg');
  const [stock, setStock] = useState(product?.stock ?? '');
  const [market, setMarket] = useState(
    product?.market ||
    markets[0]?.name ||
    'Lahore Central Farmers Market'
  );

  const [imageMode, setImageMode] = useState('presets');

  const [imageUrlInput, setImageUrlInput] = useState(
    product?.image || ''
  );

  const [selectedImage, setSelectedImage] = useState(
    product?.image || PRESET_PRODUCE_IMAGES[0].url
  );

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price || !stock) {
      return;
    }

    const currentUserName =
      localStorage.getItem('marketlink_user_name') ||
      'Chaudhry Tariq Ahmed';

    const finalImage =
      imageMode === 'url'
        ? imageUrlInput.trim() || selectedImage
        : selectedImage;

    const productData = {
      name,
      category,
      price: Number(price),
      unit,
      stock: Number(stock),
      market,
      farmer: product?.farmer || currentUserName,
      rating: product?.rating || 4.9,
      image: finalImage
    };

    onSubmit(productData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">

      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-gray-200 space-y-4 text-xs max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-3">

          <div className="flex items-center gap-2">

            <div className="w-8 h-8 rounded-xl bg-green-100 text-green-700 flex items-center justify-center font-bold">
              <ShoppingBag size={18} />
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-gray-900">
                {isEdit ? 'Edit Produce Item' : 'Add New Harvest Produce'}
              </h3>

              <p className="text-[10px] text-gray-500">
                {isEdit
                  ? 'Update your produce item details'
                  : 'Publish stock items to market stalls and public catalog'}
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100"
          >
            <X size={18} />
          </button>

        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Product Name */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Item Name *
            </label>

            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Farm Fresh Organic Tomatoes"
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Category + Market */}
          <div className="grid grid-cols-2 gap-3">

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Category *
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {CATEGORIES_LIST
                  .filter((c) => c !== 'All')
                  .map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Selling Market Location
              </label>

              <select
                value={market}
                onChange={(e) => setMarket(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-[11px]"
              >
                {markets.map((m) => (
                  <option
                    key={m.id || m.name}
                    value={m.name}
                  >
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Price + Unit + Stock */}
          <div className="grid grid-cols-3 gap-3">

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Price (PKR) *
              </label>

              <input
                type="number"
                required
                min="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="150"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Unit *
              </label>

              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="kg">kg</option>
                <option value="dozen">dozen</option>
                <option value="pack">pack</option>
                <option value="bunch">bunch</option>
                <option value="g">g</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Stock *
              </label>

              <input
                type="number"
                required
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="50"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

          </div>

          {/* Image Section */}
          <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">

            <div className="flex items-center justify-between">

              <label className="font-bold text-gray-900 flex items-center gap-1.5">
                <ImageIcon size={15} className="text-green-600" />
                <span>Produce Photo / Image *</span>
              </label>

              <div className="flex bg-white p-0.5 rounded-lg border border-gray-200 text-[10px] font-bold">

                <button
                  type="button"
                  onClick={() => setImageMode('presets')}
                  className={`px-2 py-1 rounded transition ${
                    imageMode === 'presets'
                      ? 'bg-green-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Gallery
                </button>

                <button
                  type="button"
                  onClick={() => setImageMode('upload')}
                  className={`px-2 py-1 rounded transition ${
                    imageMode === 'upload'
                      ? 'bg-green-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Upload File
                </button>

                <button
                  type="button"
                  onClick={() => setImageMode('url')}
                  className={`px-2 py-1 rounded transition ${
                    imageMode === 'url'
                      ? 'bg-green-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Image URL
                </button>

              </div>
            </div>

            {/* Gallery */}
            {imageMode === 'presets' && (
              <div className="grid grid-cols-3 gap-2 pt-1">

                {PRESET_PRODUCE_IMAGES.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setSelectedImage(item.url)}
                    className={`relative rounded-xl overflow-hidden border-2 transition text-left group ${
                      selectedImage === item.url
                        ? 'border-green-600 ring-2 ring-green-500/30'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={item.url}
                      alt={item.label}
                      className="w-full h-14 object-cover"
                    />

                    <div className="p-1 bg-white text-[9px] font-semibold text-gray-800 truncate flex items-center justify-between">

                      <span>{item.label}</span>

                      {selectedImage === item.url && (
                        <Check
                          size={10}
                          className="text-green-600 shrink-0"
                        />
                      )}

                    </div>
                  </button>
                ))}

              </div>
            )}

            {/* Upload */}
            {imageMode === 'upload' && (
              <div className="pt-1 space-y-2">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

                  <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-green-300 hover:border-green-600 rounded-xl bg-green-50/60 hover:bg-green-100/60 cursor-pointer transition text-green-800 font-bold text-xs shadow-xs">

                    <Camera
                      size={18}
                      className="text-green-700 shrink-0"
                    />

                    <span>Snap Photo with Camera</span>

                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleFileUpload}
                      className="hidden"
                    />

                  </label>

                  <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 hover:border-green-500 rounded-xl bg-white hover:bg-gray-50 cursor-pointer transition text-gray-700 font-bold text-xs shadow-xs">

                    <ImagePlus
                      size={18}
                      className="text-gray-500 shrink-0"
                    />

                    <span>Pick from Mobile Gallery</span>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />

                  </label>

                </div>

                <p className="text-[10px] text-gray-500 text-center font-medium">
                  Supports mobile camera capture, Android gallery & iPhone photos
                </p>

              </div>
            )}

            {/* URL */}
            {imageMode === 'url' && (
              <div className="pt-1 space-y-2">

                <div className="relative">

                  <LinkIcon
                    size={14}
                    className="absolute left-3 top-2.5 text-gray-400"
                  />

                  <input
                    type="url"
                    value={imageUrlInput}
                    onChange={(e) => {
                      setImageUrlInput(e.target.value);

                      if (e.target.value.trim()) {
                        setSelectedImage(e.target.value.trim());
                      }
                    }}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full pl-8 pr-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  />

                </div>

              </div>
            )}

            {/* Preview */}
            <div className="flex items-center gap-3 pt-2 border-t border-gray-200">

              <img
                src={selectedImage}
                alt="Selected Produce Preview"
                className="w-14 h-14 rounded-xl object-cover border border-gray-300 shrink-0 shadow-xs"
                onError={(e) => {
                  e.target.src =
                    'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=500';
                }}
              />

              <div className="text-[11px] space-y-0.5">

                <span className="font-bold text-gray-900 block">
                  Selected Image Preview
                </span>

                <span className="text-gray-500 block leading-tight">
                  This photo will display on your stall card & catalog
                </span>

              </div>

            </div>

          </div>

          {/* Buttons */}
          <div className="pt-2 flex justify-end gap-2 border-t border-gray-100">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-xs transition cursor-pointer"
            >
              {isEdit ? 'Update Product' : 'Publish Item'}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}