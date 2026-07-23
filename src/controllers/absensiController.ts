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
  eq,
  and
} from 'drizzle-orm';

import { db } from '../db/index.js';
import { absensi } from '../db/absensi.js';
import { siswa } from '../db/siswa.js';
import { kelas } from '../db/kelas.js';

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
        status: absensi.status,
        nama_siswa: siswa.namaSiswa,
        nama_kelas: kelas.namaKelas 
      })
      .from(absensi)
      .leftJoin(siswa, eq(absensi.siswaId, siswa.id))
      .leftJoin(kelas, eq(siswa.kelasId, kelas.id))
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

export async function getRiwayatAbsensi(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const rows = await db
      .selectDistinct({
        tanggal: absensi.tanggal,
        kelasId: siswa.kelasId,
        namaKelas: kelas.namaKelas
      })
      .from(absensi)
      .leftJoin(siswa, eq(absensi.siswaId, siswa.id))
      .leftJoin(kelas, eq(siswa.kelasId, kelas.id))
      .orderBy(desc(absensi.tanggal));

    const result = rows.map((item, index) => ({
      id: index + 1,
      tanggal: item.tanggal,
      kelasId: item.kelasId,
      nama_kelas: item.namaKelas
    }));

    return res.json({
      rows: result
    });

  } catch (err) {
    return next(err);
  }
}

export async function getAbsensiByKelasTanggal(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const kelasId = Number(req.params.kelasId);
    const tanggal = String(req.params.tanggal);

    if (!kelasId || !tanggal) {
      return res.status(400).json({
        message: 'Kelas dan tanggal wajib diisi'
      });
    }

    const rows = await db
      .select({
        id: absensi.id,
        siswaId: absensi.siswaId,
        guruId: absensi.guruId,
        tanggal: absensi.tanggal,
        status: absensi.status,
        namaSiswa: siswa.namaSiswa,
        nisSiswa: siswa.nisSiswa,
        kelasId: siswa.kelasId,
        namaKelas: kelas.namaKelas
      })
      .from(absensi)
      .leftJoin(
        siswa,
        eq(absensi.siswaId, siswa.id)
      )
      .leftJoin(
        kelas,
        eq(siswa.kelasId, kelas.id)
      )
      .where(
        eq(siswa.kelasId, kelasId)
      );

    const result = rows.filter((item) => {
      const tanggalDb = new Date(item.tanggal)
        .toISOString()
        .substring(0, 10);

      return tanggalDb === tanggal;
    });

    return res.json({
      rows: result
    });

  } catch (err) {
    return next(err);
  }
}

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

    const finalGuruId = guruId ?? 1;

    if (
      !siswaId ||
      !tanggal ||
      !status
    ) {
      return res.status(400).json({
        message: 'Siswa, Tanggal, dan Status wajib diisi'
      });
    }

    await db.insert(absensi).values({
      siswaId,
      guruId: finalGuruId,
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