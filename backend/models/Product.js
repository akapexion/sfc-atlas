import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  market: { type: mongoose.Schema.Types.ObjectId, ref: 'Market' },
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  unit: { type: String, required: true, default: 'kg' },
  stockQuantity: { type: Number, required: true, min: 0, default: 0 },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  organic: { type: Boolean, default: false },
  rating: { type: Number, default: 4.8 },
  isAvailable: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Product', productSchema);