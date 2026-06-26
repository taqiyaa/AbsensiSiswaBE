CREATE TABLE `guru` (
	`id_guru` int AUTO_INCREMENT NOT NULL,
	`nama_guru` varchar(120) NOT NULL,
	`npm_guru` varchar(30) NOT NULL,
	`password` varchar(255) NOT NULL,
	`email` varchar(120) NOT NULL,
	CONSTRAINT `guru_id_guru` PRIMARY KEY(`id_guru`)
);
