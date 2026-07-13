import { relations } from 'drizzle-orm';

import { kelas } from './kelas.js';
import { guru } from './guru.js';

export const kelasRelations = relations(kelas, ({ one }) => ({
	guru: one(guru, {
		fields: [kelas.guruId],
		references: [guru.id]
	})
}));

export const guruRelations = relations(guru, ({ many }) => ({
	kelas: many(kelas)
}));