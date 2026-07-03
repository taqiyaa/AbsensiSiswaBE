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
router.put('/',authenticateToken, updateKelas);
router.delete('/',authenticateToken, deleteKelas);

export default router;
