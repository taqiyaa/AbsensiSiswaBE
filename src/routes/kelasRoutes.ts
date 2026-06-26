import { Router } from "express";

import {
    getAllKelas,
    createKelas,
    updateKelas,
    deleteKelas
} from '../controllers/kelasController.js';

const router = Router();

//menampilkan semua kelas (GET)
router.get('/',getAllKelas);
//tambah kelas baru (POST)
router.post('/',createKelas);
//mengubah data berdasarkan id (PUT)
router.put('/',updateKelas);
//menghapus data kelas berdasarkan id (DELETE)
router.delete('/',deleteKelas);

export default router;
