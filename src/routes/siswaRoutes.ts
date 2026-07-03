import { Router } from "express";

import {
  getAllSiswa,
  createSiswa,
  updateSiswa,
  deleteSiswa
} from '../controllers/siswaController.js';

import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

router.get('/',authenticateToken, getAllSiswa);
router.post('/', authenticateToken, createSiswa);
router.put('/:id', authenticateToken, updateSiswa);
router.delete('/:id', authenticateToken, deleteSiswa);

export default router;