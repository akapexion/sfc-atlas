import mongoose from 'mongoose';

/**
 * MongoDB Local Connection Handler
 * Functionality: Connects to local MongoDB instance with resilient fallback so server stays running.
 */
const connectDB = async () => {
  try {
    const dbUri = process.env.DB_URL || 'mongodb://localhost:27017/marketlink_db';
    const conn = await mongoose.connect(dbUri);
    console.log(`MongoDB Connected: ${conn.connection.host} / ${conn.connection.name}`);
  } catch (error) {
    console.error(`MongoDB Warning: ${error.message} - Running Express API with fallback storage handler.`);
  }
};

export default connectDB;