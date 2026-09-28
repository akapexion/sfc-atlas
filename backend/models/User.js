import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['customer', 'farmer', 'admin'], 
    default: 'customer' 
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'approved'
  },
  phone: { type: String, trim: true },
  address: { type: String, trim: true },
  farmName: { type: String, trim: true },
  farmLocation: { type: String, trim: true },
  rating: { type: Number, default: 4.8 },
  verified: { type: Boolean, default: true },
  avatar: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);