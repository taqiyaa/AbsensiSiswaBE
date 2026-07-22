import { Router } from "express";

import {
    getAllAbsensi,
    createAbsensi,
    updateAbsensi,
    deleteAbsensi
} from '../controllers/absensiController.js';

import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get('/', authenticateToken, getAllAbsensi);
router.post('/',authenticateToken, createAbsensi);
router.put('/:id',authenticateToken, updateAbsensi);
router.delete('/:id',authenticateToken, deleteAbsensi);

export default router;