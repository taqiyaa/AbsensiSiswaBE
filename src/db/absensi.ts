import { relations } from "drizzle-orm";
import {
    int,
    mysqlTable,
    mysqlEnum,
    date
} from 'drizzle-orm/mysql-core';

import { siswa } from './siswa.js';
import { guru } from "./guru.js";
 export const absensi = mysqlTable('absensi',{
    id: int('id_absensi').autoincrement().primaryKey(),
    siswaId: int('siswa_id')
        .notNull()
        .references(() => siswa.id),
    guruId: int('guru_id')
        .notNull()
        .references(() => guru.id),
    tanggal: date('tanggal').notNull(),
    status: mysqlEnum('status', [
        'Hadir',
        'Izin',
        'Sakit',
        'Alpha'
    ]).notNull()
 });

 export const absensiRelations = relations(absensi, ({ one }) => ({
  siswa: one(siswa, {
    fields: [absensi.siswaId],
    references: [siswa.id]
  }),

  guru: one(guru, {
    fields: [absensi.guruId],
    references: [guru.id]
  })
}));