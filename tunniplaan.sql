CREATE TABLE IF NOT EXISTS `tunniplaanRuumid` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NOT NULL,
  `deleted` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC)) 
  DEFAULT CHARSET=utf8
  ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `tunniplaanKursused` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NOT NULL,
  `deleted` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
  DEFAULT CHARSET=utf8
  ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `tunniplaanOppejoud` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NOT NULL,
  `deleted` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC)) 
  DEFAULT CHARSET=utf8
  ENGINE=InnoDB ;

CREATE TABLE IF NOT EXISTS `tunniplaanAined` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NOT NULL,
  `deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `oppejoudID` INT NOT NULL,
  `ruumID` INT NOT NULL,
  `kursusID` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_tunniplaanAined_tunniplaanOppejoud_idx` (`oppejoudID` ASC),
  INDEX `fk_tunniplaanAined_tunniplaanRuumid_idx` (`ruumID` ASC),
  INDEX `fk_tunniplaanAined_tunniplaanKursused_idx` (`kursusID` ASC),
  CONSTRAINT `fk_tunniplaanAined_tunniplaanOppejoud`
    FOREIGN KEY (`oppejoudID`)
    REFERENCES `tunniplaanOppejoud` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tunniplaanAined_tunniplaanRuumid`
    FOREIGN KEY (`ruumID`)
    REFERENCES `tunniplaanRuumid` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `fk_tunniplaanAined_tunniplaanKursused`
    FOREIGN KEY (`kursusID`)
    REFERENCES `tunniplaanKursused` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    DEFAULT CHARSET=utf8
    ENGINE=InnoDB;

CREATE TABLE `tunniplaanUsers` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(10) NOT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
  DEFAULT CHARSET=utf8
  ENGINE=InnoDB;

INSERT INTO `tunniplaanRuumid` (`id`, `description`, `deleted`) VALUES 
(NULL, '203', '0'),
(NULL, '204', '0'),
(NULL, '205', '0'),
(NULL, '110', '0'),
(NULL, '303', '0'),
(NULL, '308', '0'),
(NULL, 'Zoom', '0'),
(NULL, 'GoogleMeet', '0');

INSERT INTO `tunniplaanKursused` (`id`, `description`, `deleted`) VALUES 
(NULL, 'RIF1', '0'),
(NULL, 'RIF2', '0'),
(NULL, 'RIF3', '0'),
(NULL, 'KDT2', '0'),
(NULL, 'LO2', '0'),
(NULL, 'Admin', '0');

INSERT INTO `tunniplaanOppejoud` (`id`, `description`, `deleted`) VALUES 
(NULL, 'Andrus Rinde', '0'),
(NULL, 'Laura Hein', '0'),
(NULL, 'Martti Raavel', '0'),
(NULL, 'Kaspar Roost', '0'),
(NULL, 'Erich Brutus', '0'),
(NULL, 'Margus Nigol', '0');

INSERT INTO `tunniplaanAined` (`id`, `description`, `deleted`, `oppejoudID`, `ruumID`, `kursusID`) VALUES 
(NULL, 'Multimeedium', '0', '1', '3', '2'),
(NULL, 'Reklaamidisain', '0', '2', '6', '2'),
(NULL, '3D animatsioon', '0', '5', '6', '2'),
(NULL, 'Kasutajaliideste disain', '0', '4', '4', '2'),
(NULL, 'Programmeerimine II', '0', '3', '7', '2'),
(NULL, 'Kujundusprogrammid', '0', '2', '3', '4'),
(NULL, 'Liiklusohutus', '0', '6', '5', '5');

INSERT INTO `tunniplaanUsers` (`id`, `firstName`, `lastName`, `email`, `password`, `role`, `deleted`) VALUES 
(NULL, 'Minni', 'Maalikas', 'minnike@tlu.ee', '$2b$10$7uypJL9kmGsZPRb5PROjWei01w5vqxM86cDCVECkHnckoiU6oxAH6', 'user',  '0'),
(NULL, 'Katrin', 'Kadalipp', 'katkad@tlu.ee', '$2b$10$xu/Kqeurij9hn.5B7qM4KeXU73I6.VN6zRvigWnNeoapvUpR9N0qS', 'user',  '0'),
(NULL, 'Aadu', 'Ohakas', 'ahikas@tlu.ee', '$2b$10$yxHuiPIPG/026tpmWPXcOOCJ1hQSc5SHteNJq8jFnGd3L07B610xi', 'admin',  '0');