import { db } from '../index.js';
import { absensi } from '../absensi.js';

async function seedAbsensi() {
  await db.insert(absensi as any).values([
    {
      siswaId: 1,
      guruId: 1,
      tanggal: '2026-06-28',
      status: 'Hadir'
    },
    {
      siswaId: 2,
      guruId: 1,
      tanggal: '2026-06-28',
      status: 'Izin'
    },
    {
      siswaId: 3,
      guruId: 2,
      tanggal: '2026-06-28',
      status: 'Sakit'
    },
    {
      siswaId: 4,
      guruId: 2,
      tanggal: '2026-06-28',
      status: 'Alpha'
    },
    {
      siswaId: 5,
      guruId: 3,
      tanggal: '2026-06-28',
      status: 'Hadir'
    },
    {
      siswaId: 6,
      guruId: 3,
      tanggal: '2026-06-28',
      status: 'Hadir'
    }
  ]);

  console.log('Seeder absensi selesai dijalankan');
}

seedAbsensi()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seeder gagal:', error);
    process.exit(1);
  });