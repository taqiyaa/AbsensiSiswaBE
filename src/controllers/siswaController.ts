import type {
  Request,
  Response,
  NextFunction
} from 'express';

import {
  asc,
  desc,
  like,
  count,
  eq
} from 'drizzle-orm';

import { db } from '../db/index.js';
import { siswa } from '../db/siswa.js';

// ==========================================
// 1. GET ALL SISWA (DENGAN PAGINASI & SEARCH)
// ==========================================
export async function getAllSiswa(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    const q = String(req.query.q ?? '');
    const sortDir = String(req.query.sortDir ?? 'asc').toLowerCase();

    const conditions = q
      ? like(siswa.namaSiswa, `%${q}%`)
      : undefined;

    const rows = await db
      .select({
        id: siswa.id,
        nisSiswa: siswa.nisSiswa,
        namaSiswa: siswa.namaSiswa,
        jenisKelamin: siswa.jenisKelamin,
        kelasId: siswa.kelasId
      })
      .from(siswa)
      .where(conditions)
      .orderBy(
        sortDir === 'desc'
          ? desc(siswa.namaSiswa)
          : asc(siswa.namaSiswa)
      )
      .limit(limit)
      .offset((page - 1) * limit);

    const totalResult = await db
      .select({
        total: count()
      })
      .from(siswa)
      .where(conditions);

    const total = totalResult[0]?.total ?? 0;

    return res.json({
      rows,
      count: total,
      page,
      limit
    });

  } catch (err) {
    return next(err);
  }
}

// ==========================================
// 2. CREATE SISWA (TAMBAH DATA BARU)
// ==========================================
export async function createSiswa(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      nisSiswa,
      namaSiswa,
      jenisKelamin,
      kelasId
    } = req.body;

    if (
      !nisSiswa ||
      !namaSiswa ||
      !jenisKelamin ||
      !kelasId
    ) {
      return res.status(400).json({
        message: 'NIS, Nama Siswa, Jenis Kelamin, dan Kelas wajib diisi'
      });
    }

    await db.insert(siswa).values({
      nisSiswa,
      namaSiswa,
      jenisKelamin,
      kelasId
    });

    return res.status(201).json({
      message: 'Data siswa berhasil disimpan'
    });

  } catch (err) {
    return next(err);
  }
}

// ==========================================
// 3. UPDATE SISWA (UBAH DATA BERDASARKAN ID)
// ==========================================
export async function updateSiswa(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    const {
      nisSiswa,
      namaSiswa,
      jenisKelamin,
      kelasId
    } = req.body;

    if (
      !nisSiswa ||
      !namaSiswa ||
      !jenisKelamin ||
      !kelasId
    ) {
      return res.status(400).json({
        message: 'NIS, Nama Siswa, Jenis Kelamin, dan Kelas wajib diisi'
      });
    }

    await db
      .update(siswa)
      .set({
        nisSiswa,
        namaSiswa,
        jenisKelamin,
        kelasId
      })
      .where(eq(siswa.id, id));

    return res.json({
      message: 'Data siswa berhasil diperbarui'
    });

  } catch (err) {
    return next(err);
  }
}

// ==========================================
// 4. DELETE SISWA (HAPUS DATA BERDASARKAN ID)
// ==========================================
export async function deleteSiswa(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    await db
      .delete(siswa)
      .where(eq(siswa.id, id));

    return res.json({
      message: 'Data siswa berhasil dihapus'
    });

  } catch (err) {
    return next(err);
  }
}