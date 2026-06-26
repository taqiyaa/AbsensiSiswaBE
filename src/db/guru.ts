import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const guru = mysqlTable('guru', {
  id: int('id_guru').autoincrement().primaryKey(),
  namaGuru: varchar('nama_guru', { length: 120 }).notNull(),
  npmGuru: varchar('npm_guru', { length: 30 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  email: varchar('email', { length: 120 }).notNull(),
});