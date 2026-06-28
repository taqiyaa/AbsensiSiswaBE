import { Router } from "express";

import {
    getAllAbsensi,
    createAbsensi,
    updateAbsensi,
    deleteAbsensi
} from '../controllers/absensiController.js';
const router = Router();

//menampilkan semua absensi (GET)
router.get('/', getAllAbsensi);

//tambah absensi gutu (POST)
router.post('/',createAbsensi);

//mengubah data absensi berdasarkan ID (PUT)
router.put('/',updateAbsensi);

//menghapus data absensi berdasarkan ID (DELETE)
router.delete('/',deleteAbsensi);

export default router;