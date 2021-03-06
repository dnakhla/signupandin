
DROP DATABASE IF EXISTS `test_app`;
CREATE DATABASE `test_app` DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;
USE `test_app`;




SET @PREVIOUS_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS = 0;


DROP TABLE IF EXISTS `users`;


CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(254) NOT NULL DEFAULT '',
  `password_hashed` blob NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_q` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




SET FOREIGN_KEY_CHECKS = @PREVIOUS_FOREIGN_KEY_CHECKS;


SET @PREVIOUS_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS = 0;


LOCK TABLES `users` WRITE;
ALTER TABLE `users` DISABLE KEYS;
ALTER TABLE `users` ENABLE KEYS;
UNLOCK TABLES;




SET FOREIGN_KEY_CHECKS = @PREVIOUS_FOREIGN_KEY_CHECKS;
