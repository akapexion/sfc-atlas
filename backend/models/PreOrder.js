import mongoose from 'mongoose';

const preOrderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  farmerName: { type: String },
  market: { type: mongoose.Schema.Types.ObjectId, ref: 'Market' },
  marketName: { type: String },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      productName: { type: String },
      quantity: { type: Number, required: true, min: 1 },
      priceAtPurchase: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  notes: { type: String, default: '' },
  pickupDate: { type: String, default: 'Tomorrow Morning' },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'ready_for_pickup', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('PreOrder', preOrderSchema);