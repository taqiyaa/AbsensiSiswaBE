import { Router } from "express";

import {
    getAllKelas,
    createKelas,
    updateKelas,
    deleteKelas
} from '../controllers/kelasController.js';

import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

router.get('/',authenticateToken, getAllKelas);
router.post('/',authenticateToken, createKelas);
router.put('/:id',authenticateToken, updateKelas);
router.delete('/:id',authenticateToken, deleteKelas);

export default router;
