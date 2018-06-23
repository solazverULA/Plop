-- MySQL dump 10.13  Distrib 5.7.22, for Linux (x86_64)
--
-- Host: localhost    Database: plop
-- ------------------------------------------------------
-- Server version	5.7.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cities` (
  `idcities` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `zip_code` int(11) NOT NULL,
  `countries_idcountries` int(11) NOT NULL,
  PRIMARY KEY (`idcities`),
  KEY `fk_cities_countries1_idx` (`countries_idcountries`),
  CONSTRAINT `fk_cities_countries1` FOREIGN KEY (`countries_idcountries`) REFERENCES `countries` (`idcountries`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `countries` (
  `idcountries` int(11) NOT NULL AUTO_INCREMENT,
  `name_country` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idcountries`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `devices` (
  `token` varchar(250) NOT NULL COMMENT 'unique token of litener for ios and android devices',
  `auth` varchar(250) NOT NULL COMMENT 'key of browser notifcation',
  `end_point` varchar(250) NOT NULL COMMENT 'key of the browser notification',
  `p256h` varchar(250) NOT NULL COMMENT 'code of the browser notification',
  `phone_number` varchar(30) NOT NULL,
  `listeners_cilisteners` int(11) NOT NULL,
  PRIMARY KEY (`token`,`auth`,`end_point`,`p256h`),
  KEY `fk_devices_listener1_idx` (`listeners_cilisteners`),
  CONSTRAINT `fk_devices_listener1_idx` FOREIGN KEY (`listeners_cilisteners`) REFERENCES `listeners` (`cilisteners`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `features`
--

DROP TABLE IF EXISTS `features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `features` (
  `idfeatures` int(11) NOT NULL AUTO_INCREMENT,
  `resend_notification` int(11) DEFAULT NULL,
  `edit_notification` int(11) DEFAULT NULL,
  PRIMARY KEY (`idfeatures`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `features`
--

LOCK TABLES `features` WRITE;
/*!40000 ALTER TABLE `features` DISABLE KEYS */;
INSERT INTO `features` VALUES (1,1,1);
/*!40000 ALTER TABLE `features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listeners`
--

DROP TABLE IF EXISTS `listeners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `listeners` (
  `cilisteners` int(11) NOT NULL,
  PRIMARY KEY (`cilisteners`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listeners`
--

LOCK TABLES `listeners` WRITE;
/*!40000 ALTER TABLE `listeners` DISABLE KEYS */;
INSERT INTO `listeners` VALUES (25154497);
/*!40000 ALTER TABLE `listeners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listeners_has_users`
--

DROP TABLE IF EXISTS `listeners_has_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `listeners_has_users` (
  `listeners_cilisteners` int(11) NOT NULL,
  `users_ciuser` int(11) NOT NULL,
  PRIMARY KEY (`listeners_cilisteners`,`users_ciuser`),
  KEY `fk_listeners_has_users_users1_idx` (`users_ciuser`),
  KEY `fk_listeners_has_users_listeners1_idx` (`listeners_cilisteners`),
  CONSTRAINT `fk_listeners_has_users_listeners1` FOREIGN KEY (`listeners_cilisteners`) REFERENCES `listeners` (`cilisteners`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_listeners_has_users_users1` FOREIGN KEY (`users_ciuser`) REFERENCES `users` (`ciuser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listeners_has_users`
--

LOCK TABLES `listeners_has_users` WRITE;
/*!40000 ALTER TABLE `listeners_has_users` DISABLE KEYS */;
INSERT INTO `listeners_has_users` VALUES (25154497,25302093);
/*!40000 ALTER TABLE `listeners_has_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listeners_receive_notifications`
--

DROP TABLE IF EXISTS `listeners_receive_notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `listeners_receive_notifications` (
  `listeners_cilisteners` int(11) NOT NULL,
  `notifications_idnotifications` int(11) NOT NULL,
  PRIMARY KEY (`listeners_cilisteners`,`notifications_idnotifications`),
  KEY `fk_listeners_receive_notifications_notifications1_idx` (`notifications_idnotifications`),
  KEY `fk_listeners_receive_notifications_listeners1_idx` (`listeners_cilisteners`),
  CONSTRAINT `fk_listeners_receive_notifications_listeners1` FOREIGN KEY (`listeners_cilisteners`) REFERENCES `listeners` (`cilisteners`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_listeners_receive_notifications_notifications1` FOREIGN KEY (`notifications_idnotifications`) REFERENCES `notifications` (`idnotifications`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listeners_receive_notifications`
--

LOCK TABLES `listeners_receive_notifications` WRITE;
/*!40000 ALTER TABLE `listeners_receive_notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `listeners_receive_notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifications` (
  `idnotifications` int(11) NOT NULL AUTO_INCREMENT,
  `title` text,
  `body` text,
  `src_image` text COMMENT 'drive id of notification image',
  `type` int(45) DEFAULT NULL,
  PRIMARY KEY (`idnotifications`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,'','','',0),(2,'','','',0),(3,'Prueba notificacion','Esta es una prueba','',0),(4,'Prueba notificacion 2','Esta es una prueba','',0),(5,'Prueba 4','Eesto es prueba','',0);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `people`
--

DROP TABLE IF EXISTS `people`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `people` (
  `cipeople` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL COMMENT 'User full name',
  `gender` varchar(45) DEFAULT NULL COMMENT 'User gender',
  `src_logo` text COMMENT 'Drive id of user logo',
  `src_icon` text COMMENT 'Drive id of icon user',
  `countries_idcountries` int(11) NOT NULL,
  PRIMARY KEY (`cipeople`),
  KEY `fk_profiles_countries1_idx` (`countries_idcountries`),
  CONSTRAINT `fk_people_countries1` FOREIGN KEY (`countries_idcountries`) REFERENCES `countries` (`idcountries`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `people`
--

LOCK TABLES `people` WRITE;
/*!40000 ALTER TABLE `people` DISABLE KEYS */;
/*!40000 ALTER TABLE `people` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rols`
--

DROP TABLE IF EXISTS `rols`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rols` (
  `idrole` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(45) DEFAULT NULL COMMENT 'Name of user role, Example: Admin or FreeUser, Premium user, merchant, reseller',
  `features_idfeatures` int(11) NOT NULL,
  PRIMARY KEY (`idrole`,`features_idfeatures`),
  UNIQUE KEY `rolename_UNIQUE` (`role_name`),
  KEY `fk_rols_features1_idx` (`features_idfeatures`),
  CONSTRAINT `fk_rols_features1` FOREIGN KEY (`features_idfeatures`) REFERENCES `features` (`idfeatures`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rols`
--

LOCK TABLES `rols` WRITE;
/*!40000 ALTER TABLE `rols` DISABLE KEYS */;
INSERT INTO `rols` VALUES (1,'user',1);
/*!40000 ALTER TABLE `rols` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `ciuser` int(11) NOT NULL,
  `email` varchar(100) DEFAULT NULL COMMENT 'User Email for login to the application',
  `password` varchar(100) DEFAULT NULL COMMENT 'Password form the user',
  `created_at` varchar(90) DEFAULT NULL,
  `updated_at` varchar(90) DEFAULT NULL,
  `rols_idrole` int(11) NOT NULL,
  PRIMARY KEY (`ciuser`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_users_rols1_idx` (`rols_idrole`),
  CONSTRAINT `fk_users_rols1` FOREIGN KEY (`rols_idrole`) REFERENCES `rols` (`idrole`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (25302093,'bfmvtm@gmail.com','$2a$10$W0Br6IR8OqnpUL4XjrfpK.QUvtP1twEPKTU920LtNq0zDNVGGLGqm','','',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_send_notifications`
--

DROP TABLE IF EXISTS `users_send_notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_send_notifications` (
  `notifications_idnotifications` int(11) NOT NULL,
  `users_ciuser` int(11) NOT NULL,
  PRIMARY KEY (`notifications_idnotifications`,`users_ciuser`),
  KEY `fk_users_send_notifications_users1_idx` (`users_ciuser`),
  KEY `fk_users_send_notifications_notifications1_idx` (`notifications_idnotifications`),
  CONSTRAINT `fk_users_send_notifications_notifications1` FOREIGN KEY (`notifications_idnotifications`) REFERENCES `notifications` (`idnotifications`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_send_notifications_users1` FOREIGN KEY (`users_ciuser`) REFERENCES `users` (`ciuser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_send_notifications`
--

LOCK TABLES `users_send_notifications` WRITE;
/*!40000 ALTER TABLE `users_send_notifications` DISABLE KEYS */;
INSERT INTO `users_send_notifications` VALUES (1,25302093),(2,25302093),(3,25302093),(4,25302093),(5,25302093);
/*!40000 ALTER TABLE `users_send_notifications` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-28 23:01:25
