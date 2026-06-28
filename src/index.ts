import express from 'express';
import { sql } from 'drizzle-orm';
// import cors from 'cors';

import { db } from './db/index.js';
// import { errorHandler } from './middlewares/errorHandler.js';
import guruRoutes from './routes/guruRoutes.js';
import kelasRoutes from './routes/kelasRoutes.js';
import siswaRoutes from './routes/siswaRoutes.js';
import absensiRoutes from './routes/absensiRoutes.js';

const app = express();

app.use(express.json());
// app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/health', async (_req, res) => {
  try {
    await db.execute(sql`SELECT 1`);
    return res.json({ status: 'ok' });
  } catch {
    return res.status(500).json({ status: 'error' });
  }
});

// Routes
app.use('/guru', guruRoutes);
app.use('/kelas', kelasRoutes);
app.use('/siswa', siswaRoutes);
app.use('/absensi', absensiRoutes);

// Error Handler
// app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});