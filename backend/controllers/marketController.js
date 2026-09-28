import Market from '../models/Market.js';
import mongoose from 'mongoose';

/**
 * Market Controller
 * Location: atlas-backend-master/controllers/marketController.js
 * Functionality: Handles regional market location CRUD operations with fallback safety.
 */

// Create Market
export const createMarket = async (req, res) => {
  try {
    const market = new Market(req.body);
    await market.save();
    res.status(201).json({ success: true, message: 'Market created successfully', market });
  } catch (error) {
    console.error('Error in createMarket:', error);
    res.status(500).json({ success: false, message: 'Server error creating market', error: error.message });
  }
};

// Get All Markets (Safe fallback return)
export const getAllMarkets = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};
    if (status) filter.status = status;

    const markets = await Market.find(filter).sort({ createdAt: -1 });
    res.status(200).json(markets);
  } catch (error) {
    console.error('Error in getAllMarkets:', error);
    res.status(200).json([]);
  }
};

// Get Market by ID
export const getMarketById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: 'Market not found' });
    }
    const market = await Market.findById(id);
    if (!market) {
      return res.status(404).json({ success: false, message: 'Market not found' });
    }
    res.status(200).json(market);
  } catch (error) {
    console.error('Error in getMarketById:', error);
    res.status(404).json({ success: false, message: 'Market not found' });
  }
};

// Update Market
export const updateMarket = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid market ID' });
    }
    const market = await Market.findByIdAndUpdate(id, req.body, { new: true });
    if (!market) {
      return res.status(404).json({ success: false, message: 'Market not found' });
    }
    res.status(200).json({ success: true, message: 'Market updated successfully', market });
  } catch (error) {
    console.error('Error in updateMarket:', error);
    res.status(500).json({ success: false, message: 'Server error updating market', error: error.message });
  }
};

// Delete Market
export const deleteMarket = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid market ID' });
    }
    const market = await Market.findByIdAndDelete(id);
    if (!market) {
      return res.status(404).json({ success: false, message: 'Market not found' });
    }
    res.status(200).json({ success: true, message: 'Market deleted successfully' });
  } catch (error) {
    console.error('Error in deleteMarket:', error);
    res.status(500).json({ success: false, message: 'Server error deleting market', error: error.message });
  }
};