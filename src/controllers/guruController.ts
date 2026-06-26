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
import { guru } from '../db/guru.js';

// ==========================================
// 1. GET ALL GURU (DENGAN PAGINASI & SEARCH)
// ==========================================
export async function getAllGuru(
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
      ? like(guru.namaGuru, `%${q}%`)
      : undefined;

    const rows = await db
      .select({
        id: guru.id,
        namaGuru: guru.namaGuru,
        npmGuru: guru.npmGuru,
        email: guru.email
      })
      .from(guru)
      .where(conditions)
      .orderBy(
        sortDir === 'desc'
          ? desc(guru.namaGuru)
          : asc(guru.namaGuru)
      )
      .limit(limit)
      .offset((page - 1) * limit);

    const totalResult = await db
      .select({
        total: count()
      })
      .from(guru)
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
// 2. CREATE GURU (TAMBAH DATA BARU)
// ==========================================
export async function createGuru(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      namaGuru,
      npmGuru,
      password,
      email
    } = req.body;

    if (!namaGuru || !npmGuru || !password || !email) {
      return res.status(400).json({
        message: 'Nama Guru, NPM Guru, Password, dan Email wajib diisi'
      });
    }

    await db.insert(guru).values({
      namaGuru,
      npmGuru,
      password,
      email
    });

    return res.status(201).json({
      message: 'Data guru berhasil disimpan'
    });

  } catch (err) {
    return next(err);
  }
}

// ==========================================
// 3. UPDATE GURU (UBAH DATA BERDASARKAN ID)
// ==========================================
export async function updateGuru(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    const {
      namaGuru,
      npmGuru,
      password,
      email
    } = req.body;

    if (!namaGuru || !npmGuru || !password || !email) {
      return res.status(400).json({
        message: 'Nama Guru, NPM Guru, Password, dan Email wajib diisi'
      });
    }

    await db
      .update(guru)
      .set({
        namaGuru,
        npmGuru,
        password,
        email
      })
      .where(eq(guru.id, id));

    return res.json({
      message: 'Data guru berhasil diperbarui'
    });

  } catch (err) {
    return next(err);
  }
}

// ==========================================
// 4. DELETE GURU (HAPUS DATA BERDASARKAN ID)
// ==========================================
export async function deleteGuru(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    await db
      .delete(guru)
      .where(eq(guru.id, id));

    return res.json({
      message: 'Data guru berhasil dihapus'
    });

  } catch (err) {
    return next(err);
  }
}