import Review from '../models/Review.js';

// Create Review
export const createReview = async (req, res) => {
  try {
    const { customer, farmer, rating, comment } = req.body;

    if (!farmer || !rating) {
      return res.status(400).json({ message: 'Farmer ID and rating are required' });
    }

    const review = new Review({
      customer,
      farmer,
      rating: Number(rating),
      comment: comment || ''
    });

    await review.save();
    res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    res.status(500).json({ message: 'Server error creating review', error: error.message });
  }
};

// Get Farmer Reviews
export const getFarmerReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ farmer: req.params.farmerId })
      .populate('customer', 'name avatar')
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching farmer reviews', error: error.message });
  }
};

// Get All Reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('customer', 'name')
      .populate('farmer', 'name farmName')
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching reviews', error: error.message });
  }
};

// Delete Review (for Moderation)
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting review', error: error.message });
  }
};