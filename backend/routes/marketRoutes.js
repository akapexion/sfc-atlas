import express from 'express';
import {
  createMarket,
  getAllMarkets,
  getMarketById,
  updateMarket,
  deleteMarket
} from '../controllers/marketController.js';

const router = express.Router();

router.post('/', createMarket);
router.get('/', getAllMarkets);
router.get('/:id', getMarketById);
router.put('/:id', updateMarket);
router.delete('/:id', deleteMarket);

export default router;
