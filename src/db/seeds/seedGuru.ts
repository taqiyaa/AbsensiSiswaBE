import { db } from '../index.js';
import { guru } from '../guru.js';

async function seedGuru() {
  await db.insert(guru as any).values([
    {
      namaGuru: 'Ahmad Fauzi',
      npmGuru: '1987654321',
      password: 'password123',
      email: 'ahmad@sekolah.ac.id'
    },
    {
      namaGuru: 'Siti Aminah',
      npmGuru: '1987654322',
      password: 'password123',
      email: 'siti@sekolah.ac.id'
    },
    {
      namaGuru: 'Budi Santoso',
      npmGuru: '1987654323',
      password: 'password123',
      email: 'budi@sekolah.ac.id'
    }
  ]);

  console.log('Seeder guru selesai dijalankan');
}

seedGuru()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seeder gagal:', error);
    process.exit(1);
  });