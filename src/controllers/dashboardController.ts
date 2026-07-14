import type {
    Request,
    Response,
    NextFunction
} from "express";

import {
    count,
    eq,
    gte,
    sql
} from "drizzle-orm";

import { db } from "../db/index.js";
import { guru } from "../db/guru.js";
import { siswa } from "../db/siswa.js";
import { kelas } from "../db/kelas.js";
import { absensi } from "../db/absensi.js";

export async function getDashboard(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {

        const totalGuru = await db
            .select({
                total: count()
            })
            .from(guru);

        const totalSiswa = await db
            .select({
                total: count()
            })
            .from(siswa);

        const totalKelas = await db
            .select({
                total: count()
            })
            .from(kelas);

        const hariIni = new Date().toISOString().slice(0, 10);

        const hadir = await db
            .select({ total: count() })
            .from(absensi)
            .where(eq(absensi.status, "Hadir"));

        const izin = await db
            .select({ total: count() })
            .from(absensi)
            .where(eq(absensi.status, "Izin"));

        const sakit = await db
            .select({ total: count() })
            .from(absensi)
            .where(eq(absensi.status, "Sakit"));

        const alpha = await db
            .select({ total: count() })
            .from(absensi)
            .where(eq(absensi.status, "Alpha"));

        const tujuhHari = new Date();
        tujuhHari.setDate(tujuhHari.getDate() - 6);

        const hasilGrafik = await db
            .select({
                tanggal: absensi.tanggal,
                total: count()
            })
            .from(absensi)
            .where(
                gte(
                    absensi.tanggal,
                    sql`${tujuhHari.toISOString().slice(0,10)}`
                )
            )
            .groupBy(absensi.tanggal)
            .orderBy(absensi.tanggal);

        const grafik = [];

        for (let i = 0; i < 7; i++) {

            const tanggal = new Date(tujuhHari);

            tanggal.setDate(tujuhHari.getDate() + i);

            const key = tanggal.toISOString().slice(0,10);

            const data = hasilGrafik.find(
                item => item.tanggal?.toISOString().slice(0,10) === key
            );

            grafik.push({
                tanggal: key,
                total: data?.total ?? 0
            });

        }

        return res.json({

        totalGuru: totalGuru[0]?.total ?? 0,

        totalSiswa: totalSiswa[0]?.total ?? 0,

        totalKelas: totalKelas[0]?.total ?? 0,

        ringkasan: {

            hadir: hadir[0]?.total ?? 0,

            izin: izin[0]?.total ?? 0,

            sakit: sakit[0]?.total ?? 0,

            alpha: alpha[0]?.total ?? 0

        },

        grafik

    });

    } catch (err) {

        next(err);

    }
}