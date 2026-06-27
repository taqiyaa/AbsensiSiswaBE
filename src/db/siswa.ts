import { relations } from 'drizzle-orm';
import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { kelas } from './kelas.js';

export const siswa = mysqlTable('siswa', {
  id: int('id_siswa').autoincrement().primaryKey(),
  nisSiswa: varchar('nis_siswa', { length: 20 }).notNull(),
  namaSiswa: varchar('nama_siswa', { length: 120 }).notNull(),
  jenisKelamin: varchar('jenis_kelamin', { length: 20 }).notNull(),
  kelasId: int('id_kelas')
    .notNull()
    .references(() => kelas.id)
});

export const siswaRelations = relations(siswa, ({ one }) => ({
  kelas: one(kelas, {
    fields: [siswa.kelasId],
    references: [kelas.id]
  })
}));