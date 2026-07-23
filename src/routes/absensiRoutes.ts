import { Router } from "express";

import {
    getAllAbsensi,
    getRiwayatAbsensi,
    createAbsensi,
    updateAbsensi,
    deleteAbsensi
} from '../controllers/absensiController.js';

import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get('/', authenticateToken, getAllAbsensi);
router.get('/riwayat',authenticateToken, getRiwayatAbsensi)
router.post('/',authenticateToken, createAbsensi);
router.put('/:id',authenticateToken, updateAbsensi);
router.delete('/:id',authenticateToken, deleteAbsensi);

export default router;