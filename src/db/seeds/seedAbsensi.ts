import { db } from '../index.js';
import { absensi } from '../absensi.js';

async function seedAbsensi() {
  await db.insert(absensi as any).values([
    {
      siswaId: 9,
      guruId: 1,
      tanggal: '2026-06-28',
      status: 'Hadir'
    },
    {
      siswaId:10,
      guruId: 1,
      tanggal: '2026-06-28',
      status: 'Izin'
    },
    {
      siswaId: 11,
      guruId: 2,
      tanggal: '2026-06-28',
      status: 'Sakit'
    },
    {
      siswaId: 12,
      guruId: 2,
      tanggal: '2026-06-28',
      status: 'Alpha'
    },
    {
      siswaId: 13,
      guruId: 3,
      tanggal: '2026-06-28',
      status: 'Hadir'
    },
    {
      siswaId: 14,
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
  