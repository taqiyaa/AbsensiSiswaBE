import { db } from '../index.js';
import { kelas } from '../kelas.js';

async function seedKelas() {
  await db.insert(kelas as any).values([
    {
      namaKelas: 'X RPL1'
    },
    {
      namaKelas: 'X RPL 2'
    },
    {
      namaKelas: 'XI RPL 1'
    },
    {
      namaKelas: 'XI RPL 2'
    },
    {
      namaKelas: 'XII RPL 1'
    },
    {
      namaKelas: 'XII RPL 2'
    }
  ]);

  console.log('Seeder kelas selesai dijalankan');
}

seedKelas()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seeder gagal:', error);
    process.exit(1);
  });