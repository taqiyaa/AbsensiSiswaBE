import type { Request, Response, NextFunction } from 'express';

import {
	eq,
	asc,
	desc,
	like,
	count
} from 'drizzle-orm';

import { db } from '../db/index.js';
import { kelas } from '../db/kelas.js';
import { guru } from '../db/guru.js';
import { siswa } from '../db/siswa.js';
import { sql } from 'drizzle-orm';


export async function getAllKelas(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const page = Number(req.query.page ?? 1);
		const limit = Number(req.query.limit ?? 10);
		const q = String(req.query.q ?? '');
		const sortDir = String(req.query.sortDir ?? 'asc');

    const rows = q
	? await db
			.select({
				id: kelas.id,
				namaKelas: kelas.namaKelas,
				guruId: kelas.guruId,
				namaGuru: guru.namaGuru,
				jumlahSiswa: sql<number>`COUNT(${siswa.id})`
			})
			.from(kelas)
			.leftJoin(guru, eq(kelas.guruId, guru.id))
			.leftJoin(siswa,eq(kelas.id, siswa.kelasId))
			.where(like(kelas.namaKelas, `%${q}%`))
			.groupBy(
				kelas.id,
				kelas.namaKelas,
				kelas.guruId,
				guru.namaGuru
			)
			.orderBy(
				sortDir === 'desc'
					? desc(kelas.namaKelas)
					: asc(kelas.namaKelas)
			)
			.limit(limit)
			.offset((page - 1) * limit)

	: await db
			.select({
				id: kelas.id,
				namaKelas: kelas.namaKelas,
				guruId: kelas.guruId,
				namaGuru: guru.namaGuru,
				jumlahSiswa: sql<number>`COUNT(${siswa.id})`
			})
			.from(kelas)
			.leftJoin(guru, eq(kelas.guruId, guru.id))
			.leftJoin(siswa, eq(kelas.id, siswa.kelasId))
			.groupBy(
				kelas.id,
				kelas.namaKelas,
				kelas.guruId,
				guru.namaGuru
			)
			.orderBy(
				sortDir === 'desc'
					? desc(kelas.namaKelas)
					: asc(kelas.namaKelas)
			)
			.limit(limit)
			.offset((page - 1) * limit);

		const total = await db
			.select({
				total: count()
			})
			.from(kelas);

		res.json({
			rows,
			count: total[0]?.total ?? 0,
			page,
			limit
		});

	} catch (err) {
		next(err);
	}
}

export async function getKelasById(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const id = Number(req.params.id);

		const data = await db
			.select({
				id: kelas.id,
				namaKelas: kelas.namaKelas,
				guruId: kelas.guruId,
				namaGuru: guru.namaGuru
			})
			.from(kelas)
			.leftJoin(guru, eq(kelas.guruId, guru.id))
			.where(eq(kelas.id, id));

		if (data.length === 0) {
			return res.status(404).json({
				message: 'Data tidak ditemukan'
			});
		}

		res.json(data[0]);

	} catch (err) {
		next(err);
	}
}

export async function createKelas(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const {
			namaKelas,
			guruId
		} = req.body;

		await db.insert(kelas).values({
			namaKelas,
			guruId
		});

		res.status(201).json({
			message: 'Berhasil ditambahkan'
		});

	} catch (err) {
		next(err);
	}
}

export async function updateKelas(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const id = Number(req.params.id);

		const {
			namaKelas,
			guruId
		} = req.body;

		await db
			.update(kelas)
			.set({
				namaKelas,
				guruId
			})
			.where(eq(kelas.id, id));

		res.json({
			message: 'Berhasil diperbarui'
		});

	} catch (err) {
		next(err);
	}
}

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

		res.json({
			message: 'Berhasil dihapus'
		});

	} catch (err) {
		next(err);
	}
}