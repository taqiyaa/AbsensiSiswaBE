import { Router } from "express";

import {
  getAllSiswa,
  createSiswa,
  updateSiswa,
  deleteSiswa
} from '../controllers/siswaController.js';

const router = Router();

// Menampilkan semua siswa (GET)
router.get('/', getAllSiswa);

// Tambah siswa baru (POST)
router.post('/', createSiswa);

// Mengubah data siswa berdasarkan ID (PUT)
router.put('/:id', updateSiswa);

// Menghapus data siswa berdasarkan ID (DELETE)
router.delete('/:id', deleteSiswa);

export default router;