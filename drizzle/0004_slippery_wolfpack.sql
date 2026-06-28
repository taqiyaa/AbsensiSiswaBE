CREATE TABLE `absensi` (
	`id_absensi` int AUTO_INCREMENT NOT NULL,
	`siswa_id` int NOT NULL,
	`guru_id` int NOT NULL,
	`tanggal` date NOT NULL,
	`status` enum('Hadir','Izin','Sakit','Alpha') NOT NULL,
	CONSTRAINT `absensi_id_absensi` PRIMARY KEY(`id_absensi`)
);
--> statement-breakpoint
ALTER TABLE `absensi` ADD CONSTRAINT `absensi_siswa_id_siswa_id_siswa_fk` FOREIGN KEY (`siswa_id`) REFERENCES `siswa`(`id_siswa`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `absensi` ADD CONSTRAINT `absensi_guru_id_guru_id_guru_fk` FOREIGN KEY (`guru_id`) REFERENCES `guru`(`id_guru`) ON DELETE no action ON UPDATE no action;