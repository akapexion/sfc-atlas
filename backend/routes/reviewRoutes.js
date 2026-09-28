import express from 'express';
import {
  createReview,
  getFarmerReviews,
  getAllReviews,
  deleteReview
} from '../controllers/reviewController.js';

const router = express.Router();

router.post('/', createReview);
router.get('/', getAllReviews);
router.get('/farmer/:farmerId', getFarmerReviews);
router.delete('/:id', deleteReview);

export default router;
