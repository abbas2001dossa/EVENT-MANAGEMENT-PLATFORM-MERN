-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: codesy_todoapp
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `date` date NOT NULL,
  `time` varchar(45) NOT NULL,
  `location` varchar(100) NOT NULL,
  `numOfRsvp` int DEFAULT '0',
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userIdKey_idx` (`userId`),
  CONSTRAINT `userIdKey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (21,'KARBALA','-LADY ZAINAB\n-IMAM HUSSAIN \n- KARBALA','2023-07-20','10:55','Lahore',2,2),(24,'ABBAS\'s BIRTHDAY ','BALLONS, GEOGRAPHY STUFF, BOOKS FOR FREE, FREE POPCARON','2023-08-17','16:27','Islamabad',0,7),(26,'LOSING HOPE','PATIENT WITH SEVERE MENTAL ILLNESS, mOTIVAATION TALK ETC','2023-08-23','04:42','Karachi',0,7),(27,'CHECK','CHELER CHECKER CHECKER ','2023-09-06','06:32','Islamabad',0,7),(28,'Saras Farewell','- destination to be decided yet - gift to be decided - invites to be couples','2023-08-24','19:19','Lahore',0,2),(29,'Anti Depressant Side Effect Lecture','POINTS :\neffects of pills \nwhat makes you depress and stressed ?','2023-09-01','19:21','Lahore',0,2);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invitation`
--

DROP TABLE IF EXISTS `invitation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invitation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `eventId` int NOT NULL,
  `eventTitle` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `invitedUsername` varchar(100) NOT NULL,
  `status` varchar(45) NOT NULL,
  `message` varchar(450) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `eventIdFK_idx` (`eventId`),
  CONSTRAINT `eventIdFK` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invitation`
--

LOCK TABLES `invitation` WRITE;
/*!40000 ALTER TABLE `invitation` DISABLE KEYS */;
INSERT INTO `invitation` VALUES (21,21,'KARBALA','AhmedKamal11','internee','accepted','MUST ATTEND'),(22,21,'KARBALA','AhmedKamal11','Zehra','pending','MUST ATTEND'),(23,24,'ABBAS\'s BIRTHDAY ','internee','AhmedKamal11','pending','Please attend with \nFAMILY'),(24,26,'LOSING HOPE','internee','AhmedKamal11','pending','PLEASE ATTEND '),(26,21,'KARBALA','AhmedKamal11','Bilal Baig','accepted','Check this out '),(27,21,'KARBALA','AhmedKamal11','Zehra','pending','Check this out '),(28,21,'KARBALA','AhmedKamal11','George','pending','Check this out '),(29,21,'KARBALA','AhmedKamal11','Ahmed2001','pending','Check this out ');
/*!40000 ALTER TABLE `invitation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(70) NOT NULL,
  `password` varchar(70) NOT NULL,
  `designation` varchar(45) DEFAULT NULL,
  `status` varchar(45) NOT NULL,
  `numOfEventsCreated` int DEFAULT '0',
  `numOfRsvp` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'abbasdossa','fast123','Admin','accepted',0,0),(2,'AhmedKamal11','123',NULL,'accepted',3,0),(3,'Laraib','123',NULL,'pending',0,0),(4,'Ahmad121','ert',NULL,'accepted',0,0),(5,'Malik RIaz','1212',NULL,'pending',0,0),(6,'Bilal Baig','fast',NULL,'accepted',0,1),(7,'internee','23',NULL,'accepted',3,1),(8,'Zehra','rew',NULL,'accepted',0,0),(9,'George','usm',NULL,'accepted',0,0),(10,'Ahmed2001','43',NULL,'accepted',0,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-01  7:24:10
