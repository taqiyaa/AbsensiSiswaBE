import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const kelas= mysqlTable('kelas', {id: int('id_kelas').autoincrement().primaryKey(),namaKelas: varchar('nama_kelas', {length: 100}).notNull()});