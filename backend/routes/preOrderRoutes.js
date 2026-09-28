import express from 'express';
import {
  createPreOrder,
  getPreOrders,
  getPreOrderById,
  updateOrderStatus,
  cancelPreOrder,
  deletePreOrder
} from '../controllers/preOrderController.js';

const router = express.Router();

router.post('/', createPreOrder);
router.get('/', getPreOrders);
router.get('/:id', getPreOrderById);
router.patch('/:id/status', updateOrderStatus);
router.patch('/:id/cancel', cancelPreOrder);
router.delete('/:id', deletePreOrder);

export default router;