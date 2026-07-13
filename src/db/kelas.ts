import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { guru } from './guru.js';

export const kelas = mysqlTable('kelas', {
	id: int('id_kelas').autoincrement().primaryKey(),

	namaKelas: varchar('nama_kelas', { length: 100 }).notNull(),

	guruId: int('id_guru')
		.notNull()
		.references(() => guru.id)
});