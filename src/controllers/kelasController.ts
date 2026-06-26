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
import { kelas } from '../db/kelas.js';

// ==========================================
// 1. GET ALL KELAS (DENGAN PAGINASI & SEARCH)
// ==========================================
export async function getAllKelas(
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
      ? like(kelas.namaKelas, `%${q}%`)
      : undefined;

    const rows = await db
      .select({
        id: kelas.id,
        namaKelas: kelas.namaKelas
      })
      .from(kelas)
      .where(conditions)
      .orderBy(
        sortDir === 'desc'
          ? desc(kelas.namaKelas)
          : asc(kelas.namaKelas)
      )
      .limit(limit)
      .offset((page - 1) * limit);

    const totalResult = await db
      .select({
        total: count()
      })
      .from(kelas)
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
// 2. CREATE KELAS (TAMBAH DATA BARU)
// ==========================================
export async function createKelas(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { namaKelas } = req.body;

    if (!namaKelas) {
      return res.status(400).json({
        message: 'Nama Kelas wajib diisi'
      });
    }

    await db.insert(kelas).values({
      namaKelas
    });

    return res.status(201).json({
      message: 'Data kelas berhasil disimpan'
    });

  } catch (err) {
    return next(err);
  }
}

// ==========================================
// 3. UPDATE KELAS (UBAH DATA BERDASARKAN ID)
// ==========================================
export async function updateKelas(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    const { namaKelas } = req.body;

    if (!namaKelas) {
      return res.status(400).json({
        message: 'Nama Kelas wajib diisi'
      });
    }

    await db
      .update(kelas)
      .set({
        namaKelas
      })
      .where(eq(kelas.id, id));

    return res.json({
      message: 'Data kelas berhasil diperbarui'
    });

  } catch (err) {
    return next(err);
  }
}

// ==========================================
// 4. DELETE KELAS (HAPUS DATA BERDASARKAN ID)
// ==========================================
export async function deleteKelas(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    await db
      .delete(kelas)
      .where(eq(kelas.id, id));

    return res.json({
      message: 'Data kelas berhasil dihapus'
    });

  } catch (err) {
    return next(err);
  }
}