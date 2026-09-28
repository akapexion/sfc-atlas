import mongoose from 'mongoose';

const marketSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  location: { type: String, required: true },
  coordinates: {
    lat: { type: Number, default: 31.5204 },
    lng: { type: Number, default: 74.3587 }
  },
  schedule: { type: String, required: true },
  timing: { type: String, default: '07:00 AM - 02:00 PM' },
  stallsCount: { type: Number, default: 35 },
  image: { type: String, default: '' },
  description: { type: String, default: '' },
  pickupAvailable: { type: Boolean, default: true },
  status: { type: String, enum: ['active', 'closed'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Market', marketSchema);