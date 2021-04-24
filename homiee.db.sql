CREATE TABLE `accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `owner_name` varchar(45) NOT NULL,
  `company_name` varchar(45) NOT NULL,
  `company_email` varchar(45) NOT NULL,
  `company_phone_no` varchar(45) NOT NULL,
  `company_logo` varchar(45) DEFAULT NULL,
  `company_website` varchar(45) DEFAULT NULL,
  `company_address` text,
  `date_updated` datetime DEFAULT CURRENT_TIMESTAMP,
  `date_created` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `parent_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  `project_logo` text,
  `project_name` varchar(45) DEFAULT NULL,
  `project_address` text,
  `project_contact` varchar(45) DEFAULT NULL,
  `project_email` varchar(45) DEFAULT NULL,
  `project_rera_number` varchar(45) DEFAULT NULL,
  `project_attachment` text,
  `project_config` json DEFAULT NULL,
  `status` enum('active','deactive','deleted') DEFAULT 'active',
  `date_updated` datetime DEFAULT CURRENT_TIMESTAMP,
  `date_created` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `parent_id` int NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` text,
  `role` enum('owner','employee','member','partner') DEFAULT NULL,
  `profile_pic` text,
  `phone_number` varchar(45) DEFAULT NULL,
  `address` text,
  `status` enum('active','disabled') DEFAULT 'active',
  `date_updated` datetime DEFAULT CURRENT_TIMESTAMP,
  `date_created` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
