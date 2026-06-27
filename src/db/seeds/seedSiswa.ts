import { db } from '../index.js';
import { siswa } from '../siswa.js';

async function seedSiswa() {
  await db.insert(siswa as any).values([
    {
      nisSiswa: '231001',
      namaSiswa: 'Andi Pratama',
      jenisKelamin: 'Laki-laki',
      kelasId: 1
    },
    {
      nisSiswa: '231002',
      namaSiswa: 'Budi Santoso',
      jenisKelamin: 'Laki-laki',
      kelasId: 2
    },
    {
      nisSiswa: '231003',
      namaSiswa: 'Citra Lestari',
      jenisKelamin: 'Perempuan',
      kelasId: 3
    },
    {
      nisSiswa: '231004',
      namaSiswa: 'Dewi Anggraini',
      jenisKelamin: 'Perempuan',
      kelasId: 4
    },
    {
      nisSiswa: '231005',
      namaSiswa: 'Eko Saputra',
      jenisKelamin: 'Laki-laki',
      kelasId: 5
    },
    {
      nisSiswa: '231006',
      namaSiswa: 'Fajar Ramadhan',
      jenisKelamin: 'Laki-laki',
      kelasId: 6
    }
  ]);

  console.log('Seeder siswa selesai dijalankan');
}

seedSiswa()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seeder gagal:', error);
    process.exit(1);
  });