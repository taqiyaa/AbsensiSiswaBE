CREATE TABLE `siswa` (
	`id_siswa` int AUTO_INCREMENT NOT NULL,
	`nis_siswa` varchar(30) NOT NULL,
	`nama_siswa` varchar(120) NOT NULL,
	`jenis_kelamin` varchar(20) NOT NULL,
	`id_kelas` int NOT NULL,
	CONSTRAINT `siswa_id_siswa` PRIMARY KEY(`id_siswa`)
);
--> statement-breakpoint
ALTER TABLE `siswa` ADD CONSTRAINT `siswa_id_kelas_kelas_id_kelas_fk` FOREIGN KEY (`id_kelas`) REFERENCES `kelas`(`id_kelas`) ON DELETE no action ON UPDATE no action;