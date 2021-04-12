CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` text,
  `role` enum('owner','employee','member','partner') DEFAULT NULL,
  `profile_pic` text,
  `phone_number` varchar(45) DEFAULT NULL,
  `address` text,
  `status` enum('active','disabled') DEFAULT 'active',
  `date_updated` timestamp NULL DEFAULT NULL,
  `date_created` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `project_name` varchar(45) DEFAULT NULL,
  `project_address` text,
  `project_contact` varchar(45) DEFAULT NULL,
  `project_email` varchar(45) DEFAULT NULL,
  `project_rera_number` varchar(45) DEFAULT NULL,
  `project_attachment` json DEFAULT NULL,
  `date_updated` timestamp NULL DEFAULT NULL,
  `date_created` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `homie`.`accounts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `owner_name` VARCHAR(45) NOT NULL,
  `company_name` VARCHAR(45) NOT NULL,
  `company_email` VARCHAR(45) NOT NULL,
  `company_phone_no` VARCHAR(45) NOT NULL,
  `company_logo` VARCHAR(45) NULL DEFAULT NULL,
  `company_website` VARCHAR(45) NULL DEFAULT NULL,
  `company_address` TEXT NULL DEFAULT NULL,
  `date_updated` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `date_created` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));
