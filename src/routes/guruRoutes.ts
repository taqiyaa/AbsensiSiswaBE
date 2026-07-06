import { Router } from 'express';

import {
  getAllGuru,
  createGuru,
  updateGuru,
  deleteGuru
} from '../controllers/guruController.js';

import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', authenticateToken, getAllGuru);
router.post('/', authenticateToken, createGuru);
router.put('/:id', authenticateToken, updateGuru);
router.delete('/:id', authenticateToken, deleteGuru);

export default router;