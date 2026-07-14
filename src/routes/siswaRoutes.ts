import { Router } from "express";

import {
  getAllSiswa,
  createSiswa,
  updateSiswa,
  deleteSiswa,
  getSiswaByKelas
} from '../controllers/siswaController.js';

import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/kelas/:id",authenticateToken,getSiswaByKelas);
router.get('/',authenticateToken, getAllSiswa);
router.post('/', authenticateToken, createSiswa);
router.put('/:id', authenticateToken, updateSiswa);
router.delete('/:id', authenticateToken, deleteSiswa);

export default router;