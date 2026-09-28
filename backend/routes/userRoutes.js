import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
  getPendingFarmers,
  updateFarmerStatus,
  updateUserProfile,
  deleteUser
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);
router.get('/pending-farmers', getPendingFarmers);
router.get('/:id', getUserProfile);
router.patch('/:id/farmer-status', updateFarmerStatus);
router.put('/:id', updateUserProfile);
router.delete('/:id', deleteUser);

export default router;
