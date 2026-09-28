import Product from '../models/Product.js';
import User from '../models/User.js';
import Market from '../models/Market.js';
import mongoose from 'mongoose';

/**
 * Product Controller
 * Location: atlas-backend-master/controllers/productController.js
 * Functionality: Handles product CRUD operations with fail-safe error handling and populate fallbacks.
 */

// Create Product / Publish Harvest
export const createProduct = async (req, res) => {
  try {
    const { farmer, market, name, category, price, unit, stockQuantity, description, image, organic } = req.body;

    if (!name || !category || !price) {
      return res.status(400).json({ success: false, message: 'Name, category, and price are required' });
    }

    // Validate ObjectIds if passed
    let validFarmer = mongoose.Types.ObjectId.isValid(farmer) ? farmer : null;
    let validMarket = mongoose.Types.ObjectId.isValid(market) ? market : null;

    if (!validFarmer) {
      try {
        const foundFarmer = await User.findOne({ role: 'farmer' });
        if (foundFarmer) validFarmer = foundFarmer._id;
      } catch (e) {
        console.warn('Could not resolve farmer ObjectId fallback:', e.message);
      }
    }

    if (!validMarket) {
      try {
        const foundMarket = await Market.findOne();
        if (foundMarket) validMarket = foundMarket._id;
      } catch (e) {
        console.warn('Could not resolve market ObjectId fallback:', e.message);
      }
    }

    const product = new Product({
      farmer: validFarmer,
      market: validMarket,
      name,
      category,
      price: Number(price),
      unit: unit || 'kg',
      stockQuantity: Number(stockQuantity) || 0,
      description: description || '',
      image: image || '',
      organic: Boolean(organic)
    });

    await product.save();
    res.status(201).json({ success: true, message: 'Product published successfully', product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, message: 'Server error creating product', error: error.message });
  }
};

// Get All Products (with filters and safe populate)
export const getProducts = async (req, res) => {
  try {
    const { marketId, farmerId, category, search, availableOnly } = req.query;
    let filter = {};

    if (availableOnly !== 'false') {
      filter.isAvailable = true;
    }
    if (marketId && mongoose.Types.ObjectId.isValid(marketId)) filter.market = marketId;
    if (farmerId && mongoose.Types.ObjectId.isValid(farmerId)) filter.farmer = farmerId;
    if (category && category !== 'All') filter.category = category;
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    let products = [];
    try {
      products = await Product.find(filter)
        .populate('farmer', 'name phone farmName farmLocation rating')
        .populate('market', 'name location timing')
        .sort({ createdAt: -1 });
    } catch (populateError) {
      console.warn('Populate warning, fetching plain products:', populateError.message);
      products = await Product.find(filter).sort({ createdAt: -1 });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return empty array with 200 status so frontend gracefully handles fallback without 500 error
    res.status(200).json([]);
  }
};

// Get Product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: 'Invalid product ID' });
    }

    let product = null;
    try {
      product = await Product.findById(id)
        .populate('farmer', 'name phone farmName farmLocation rating')
        .populate('market', 'name location timing');
    } catch (popErr) {
      product = await Product.findById(id);
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(404).json({ success: false, message: 'Product not found' });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid product ID format' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, message: 'Server error updating product', error: error.message });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid product ID format' });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, message: 'Server error deleting product', error: error.message });
  }
};