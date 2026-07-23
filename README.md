**## SIMBASIS - Sistem Informasi Absensi Siswa**

**## Deskripsi Proyek**

SIMBASIS adalah aplikasi berbasis web yang dibuat untuk membantu guru dalam mengelola
data guru, data siswa, data kelas dan pencatatan absensi siswa.
Aplikasi ini dibuat unutk mengatasi permasalahan pencatatan absensi yang masih dilakukan manual
sehingga proses pengelolaan, pencarian dan penyimpanan data menjadi kurang efisien.
Pada sistem ini, guru dapat melakukan autentikasi, mengelola data siswa dan kelas, serta mencatat
absensi siswa berdasarkan kelas yang dipilih. Sistem menggunakan REST API sebagai penghubung antara frontend dan backend.
Backend bertugas menangani proses autentikasi pengguna, pengelolaan data, validasi dan komunikasi dengan database MySQL.

## Anggota Kelompok dan Pembagian Tugas

| No | Nama                        | Pembagian Tugas                                                                                                                                                                                                                                       |
| -- | ----------                  | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1  | Sri Maulani_2024520016      | **Backend:** Mengembangkan autentikasi pengguna (Register dan Login), perancangan tabel Kelas, serta pengembangan tabel dan API Absensi. 
                                    **Frontend:** Mengembangkan halaman Login dan Register, serta fitur pengelolaan data Guru dan Siswa.         |
| 2  | Barrotut Taqiyah_2024520053 | **Backend:** Mengembangkan perancangan tabel Guru dan Siswa, serta implementasi Error Handler untuk menangani kesalahan pada Backend. 
                                    **Frontend:** Mengembangkan Dashboard, fitur pengelolaan Kelas, serta fitur pencatatan dan pengelolaan Absensi. |

## Skema Database

Aplikasi SIAS menggunakan **MySQL** sebagai database dan **Drizzle ORM** untuk mendefinisikan serta mengelola struktur tabel.

Database SIAS terdiri dari 4 tabel utama, yaitu `guru`, `kelas`, `siswa`, dan `absensi`.

### 1. Tabel `guru`

Tabel `guru` digunakan untuk menyimpan data akun guru yang dapat melakukan autentikasi dan menggunakan sistem.

| Kolom       | Tipe Data    | Keterangan                       |
| ----------- | ------------ | -------------------------------- |
| `id_guru`   | INT          | Primary Key, Auto Increment      |
| `nama_guru` | VARCHAR(120) | Nama guru                        |
| `npm_guru`  | VARCHAR(30)  | NPM guru                         |
| `password`  | VARCHAR(255) | Password guru yang telah di-hash |
| `email`     | VARCHAR(120) | Email guru                       |

---

### 2. Tabel `kelas`

Tabel `kelas` digunakan untuk menyimpan data kelas yang dikelola oleh guru.

| Kolom        | Tipe Data    | Keterangan                                   |
| ------------ | ------------ | -------------------------------------------- |
| `id_kelas`   | INT          | Primary Key, Auto Increment                  |
| `nama_kelas` | VARCHAR(100) | Nama kelas                                   |
| `id_guru`    | INT          | Foreign Key yang mengacu pada `guru.id_guru` |

---

### 3. Tabel `siswa`

Tabel `siswa` digunakan untuk menyimpan data siswa dan menghubungkan siswa dengan kelas tempat siswa tersebut terdaftar.

| Kolom           | Tipe Data    | Keterangan                                     |
| --------------- | ------------ | ---------------------------------------------- |
| `id_siswa`      | INT          | Primary Key, Auto Increment                    |
| `nis_siswa`     | VARCHAR(20)  | Nomor Induk Siswa                              |
| `nama_siswa`    | VARCHAR(120) | Nama siswa                                     |
| `jenis_kelamin` | VARCHAR(20)  | Jenis kelamin siswa                            |
| `id_kelas`      | INT          | Foreign Key yang mengacu pada `kelas.id_kelas` |

---

### 4. Tabel `absensi`

Tabel `absensi` digunakan untuk menyimpan data kehadiran siswa yang dicatat oleh guru.

| Kolom        | Tipe Data | Keterangan                                     |
| ------------ | --------- | ---------------------------------------------- |
| `id_absensi` | INT       | Primary Key, Auto Increment                    |
| `siswa_id`   | INT       | Foreign Key yang mengacu pada `siswa.id_siswa` |
| `guru_id`    | INT       | Foreign Key yang mengacu pada `guru.id_guru`   |
| `tanggal`    | DATE      | Tanggal absensi                                |
| `status`     | ENUM      | Status kehadiran siswa                         |

Nilai yang tersedia pada kolom `status`:

* `Hadir`
* `Izin`
* `Sakit`
* `Alpha`

---

### Relasi Antar Tabel

Relasi antar tabel pada database SIAS dapat digambarkan sebagai berikut:
┌─────────────────┐
│      GURU       │
├─────────────────┤
│ PK id_guru      │
│ nama_guru       │
│ npm_guru        │
│ password        │
│ email           │
└────────┬────────┘
         │
         │ 1 : N
         │
         ▼
┌─────────────────┐
│      KELAS      │
├─────────────────┤
│ PK id_kelas     │
│ nama_kelas      │
│ FK id_guru      │
└────────┬────────┘
         │
         │ 1 : N
         │
         ▼
┌─────────────────┐
│      SISWA      │
├─────────────────┤
│ PK id_siswa     │
│ nis_siswa       │
│ nama_siswa      │
│ jenis_kelamin   │
│ FK id_kelas     │
└────────┬────────┘
         │
         │ 1 : N
         │
         ▼
┌─────────────────┐
│     ABSENSI     │
├─────────────────┤
│ PK id_absensi   │
│ FK siswa_id     │
│ FK guru_id      │
│ tanggal         │
│ status          │
└─────────────────┘
         ▲
         │
         │ N : 1
         │
       GURU

### Keterangan Relasi
**Guru → Kelas:** Satu guru dapat memiliki atau mengelola banyak kelas.
**Kelas → Guru:** Setiap kelas terhubung dengan satu guru.
**Kelas → Siswa:** Satu kelas dapat memiliki banyak siswa.
**Siswa → Kelas:** Setiap siswa terdaftar pada satu kelas.
**Siswa → Absensi:** Satu siswa dapat memiliki banyak data atau riwayat absensi.
**Absensi → Siswa:** Setiap data absensi berkaitan dengan satu siswa.
**Guru → Absensi:** Satu guru dapat mencatat banyak data absensi.
**Absensi → Guru:** Setiap data absensi dicatat oleh satu guru.

## Dokumentasi Endpoint API
Base URL:
```text
http://localhost:3000
```
Endpoint yang membutuhkan autentikasi menggunakan JWT pada header:

```text
Authorization: Bearer <token>
```

### Authentication

| Method | Endpoint         | Payload Body                               | Format Respons         |
| ------ | ---------------- | ------------------------------------------ | ---------------------- |
| POST   | `/auth/register` | `namaGuru`, `npmGuru`, `email`, `password` | Pesan berhasil / error |
| POST   | `/auth/login`    | `email`, `password`                        | JWT Token + data guru  |

### Guru

| Method | Endpoint    | Payload Body | Format Respons         |
| ------ | ----------- | ------------ | ---------------------- |
| GET    | `/guru`     | -            | Daftar data guru       |
| POST   | `/guru`     | Data guru    | Data / pesan berhasil  |
| PUT    | `/guru/:id` | Data guru    | Data / pesan berhasil  |
| DELETE | `/guru/:id` | -            | Pesan berhasil / error |

### Kelas

| Method | Endpoint     | Payload Body          | Format Respons         |
| ------ | ------------ | --------------------- | ---------------------- |
| GET    | `/kelas`     | -                     | Daftar data kelas      |
| POST   | `/kelas`     | `namaKelas`, `guruId` | Data / pesan berhasil  |
| PUT    | `/kelas/:id` | `namaKelas`, `guruId` | Data / pesan berhasil  |
| DELETE | `/kelas/:id` | -                     | Pesan berhasil / error |

### Siswa

| Method | Endpoint     | Payload Body                                       | Format Respons         |
| ------ | ------------ | -------------------------------------------------- | ---------------------- |
| GET    | `/siswa`     | -                                                  | Daftar data siswa      |
| POST   | `/siswa`     | `nisSiswa`, `namaSiswa`, `jenisKelamin`, `kelasId` | Data / pesan berhasil  |
| PUT    | `/siswa/:id` | Data siswa                                         | Data / pesan berhasil  |
| DELETE | `/siswa/:id` | -                                                  | Pesan berhasil / error |

### Absensi

| Method | Endpoint       | Payload Body                             | Format Respons         |
| ------ | -------------- | ---------------------------------------- | ---------------------- |
| GET    | `/absensi`     | -                                        | Daftar data absensi    |
| POST   | `/absensi`     | `siswaId`, `guruId`, `tanggal`, `status` | Data / pesan berhasil  |
| PUT    | `/absensi/:id` | `status`                                 | Data / pesan berhasil  |
| DELETE | `/absensi/:id` | -                                        | Pesan berhasil / error |

### Status Absensi

Status yang tersedia pada data absensi:

```text
Hadir
Izin
Sakit
Alpha
```

### Format Respons Umum

Respons API menggunakan format JSON. Contoh respons berhasil:

```json
{
  "message": "Data berhasil diproses"
}
```
Contoh respons error:

```json
{
  "message": "Terjadi kesalahan"
}
```
## Cara Menjalankan Aplikasi Secara Lokal
1. Clone repository Backend SIMBASIS:
    ```bash
    git clone https://github.com/taqiyaa/AbsensiSiswaBE.git
2. Masuk ke folder project:
   cd AbsensiSiswaBE
3. Install dependecies
   npm install
4. Buat file .env di folder utama Backend dan isi konfigurasi berikut:
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=absensi_siswa
    JWT_SECRET=your_jwt_secret
5. Buat database MySQL dengan nama:
   absensi_siswa
   pastikan MySQL sedang berjalan, kemudian jalankan migrasi database:
   npm run db:migrate
6. Untuk memasukkan data awal kelas, jalankan:
   npm run db:seed
7. Jalankan Backend dalam mode development
   npm run dev
   Backend akan berjalan pada:
   http://localhost:3000
