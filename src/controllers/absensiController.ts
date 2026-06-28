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
import { absensi } from '../db/absensi.js';

// 1. GET ALL ABSENSI (DENGAN PAGINASI & SEARCH)
export async function getAllAbsensi(
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
      ? like(absensi.status, `%${q}%`)
      : undefined;

    const rows = await db
      .select({
        id: absensi.id,
        siswaId: absensi.siswaId,
        guruId: absensi.guruId,
        tanggal: absensi.tanggal,
        status: absensi.status
      })
      .from(absensi)
      .where(conditions)
      .orderBy(
        sortDir === 'desc'
          ? desc(absensi.tanggal)
          : asc(absensi.tanggal)
      )
      .limit(limit)
      .offset((page - 1) * limit);

    const totalResult = await db
      .select({
        total: count()
      })
      .from(absensi)
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

// 2. CREATE ABSENSI
export async function createAbsensi(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      siswaId,
      guruId,
      tanggal,
      status
    } = req.body;

    if (
      !siswaId ||
      !guruId ||
      !tanggal ||
      !status
    ) {
      return res.status(400).json({
        message: 'Siswa, Guru, Tanggal, dan Status wajib diisi'
      });
    }

    await db.insert(absensi).values({
      siswaId,
      guruId,
      tanggal,
      status
    });

    return res.status(201).json({
      message: 'Data absensi berhasil disimpan'
    });

  } catch (err) {
    return next(err);
  }
}

// 3. UPDATE ABSENSI (UBAH DATA BERDASARKAN ID)
export async function updateAbsensi(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    const {
      siswaId,
      guruId,
      tanggal,
      status
    } = req.body;

    if (
      !siswaId ||
      !guruId ||
      !tanggal ||
      !status
    ) {
      return res.status(400).json({
        message: 'Siswa, Guru, Tanggal, dan Status wajib diisi'
      });
    }

    await db
      .update(absensi)
      .set({
        siswaId,
        guruId,
        tanggal,
        status
      })
      .where(eq(absensi.id, id));

    return res.json({
      message: 'Data absensi berhasil diperbarui'
    });

  } catch (err) {
    return next(err);
  }
}

// 4. DELETE ABSENSI (HAPUS DATA BERDASARKAN ID)
export async function deleteAbsensi(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    await db
      .delete(absensi)
      .where(eq(absensi.id, id));

    return res.json({
      message: 'Data absensi berhasil dihapus'
    });

  } catch (err) {
    return next(err);
  }
}