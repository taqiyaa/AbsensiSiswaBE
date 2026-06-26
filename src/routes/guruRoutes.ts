import { Router } from 'express';

import {
  getAllGuru,
  createGuru,
  updateGuru,
  deleteGuru
} from '../controllers/guruController.js';

const router = Router();

// Menampilkan semua guru (GET)
router.get('/', getAllGuru);

// Tambah guru baru (POST)
router.post('/', createGuru);

// Ubah data guru berdasarkan ID (PUT)
router.put('/:id', updateGuru);

// Hapus guru berdasarkan ID (DELETE)
router.delete('/:id', deleteGuru);

export default router;