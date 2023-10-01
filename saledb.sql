-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: saledb
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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Điện thoại thông minh',NULL),(2,'Máy tính bảng',NULL),(3,'Máy tính xách tay',NULL),(4,'MOBILE','DIEN THOAI DI DONG'),(10,'PHU KIEN','TEST'),(12,'PHU KIEN','TEST');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  `created_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cmt_user_idx` (`user_id`),
  CONSTRAINT `fk_cmt_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (66,'demo123',1,'2023-09-09 22:57:01'),(67,'demo123\n',1,'2023-09-09 22:57:43'),(68,'asdasdsad',1,'2023-09-09 22:57:46'),(74,'demo123',1,'2023-09-09 23:18:04'),(75,'demo 456',1,'2023-09-09 23:18:09'),(76,'quao',2,'2023-09-10 01:44:57'),(77,'demo123\n',1,'2023-09-10 19:44:53'),(78,'alo alo',1,'2023-09-10 19:45:04'),(79,'oke\n',1,'2023-09-10 19:46:20'),(80,'ok123',1,'2023-09-10 19:47:16');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_level`
--

DROP TABLE IF EXISTS `comment_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_level` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment_id` int NOT NULL,
  `parent_id` int DEFAULT NULL,
  `level` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cmt_idx` (`parent_id`),
  KEY `fk_cmt_2_idx` (`comment_id`),
  CONSTRAINT `fk_cmt` FOREIGN KEY (`parent_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_cmt_2` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_level`
--

LOCK TABLES `comment_level` WRITE;
/*!40000 ALTER TABLE `comment_level` DISABLE KEYS */;
INSERT INTO `comment_level` VALUES (55,67,NULL,1),(56,68,67,2),(58,76,NULL,1),(59,77,NULL,1),(60,78,NULL,1),(61,79,NULL,1),(62,80,NULL,1);
/*!40000 ALTER TABLE `comment_level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_product`
--

DROP TABLE IF EXISTS `comment_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cmt_pro_cmt_idx` (`comment_id`),
  KEY `fk_cmt_pro_pro_idx` (`product_id`),
  CONSTRAINT `fk_cmt_pro_cmt` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_cmt_pro_pro` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_product`
--

LOCK TABLES `comment_product` WRITE;
/*!40000 ALTER TABLE `comment_product` DISABLE KEYS */;
INSERT INTO `comment_product` VALUES (61,76,4),(62,77,1),(63,78,5),(64,79,4),(65,80,6);
/*!40000 ALTER TABLE `comment_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_store`
--

DROP TABLE IF EXISTS `comment_store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_store` (
  `id` int NOT NULL AUTO_INCREMENT,
  `store_id` int NOT NULL,
  `comment_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cmt_cmt_store_idx` (`comment_id`),
  KEY `fk_user_cmt_store_idx` (`store_id`),
  CONSTRAINT `fk_cmt_cmt_store` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_cmt_store` FOREIGN KEY (`store_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_store`
--

LOCK TABLES `comment_store` WRITE;
/*!40000 ALTER TABLE `comment_store` DISABLE KEYS */;
INSERT INTO `comment_store` VALUES (4,2,66),(9,2,74),(10,2,75);
/*!40000 ALTER TABLE `comment_store` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `unit_price` decimal(10,0) DEFAULT '0',
  `num` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_ORDERDETAIL_ORDER_idx` (`order_id`),
  KEY `fk_pro_od_idx` (`product_id`),
  CONSTRAINT `FK_ORDERDETAIL_ORDER` FOREIGN KEY (`order_id`) REFERENCES `sale_order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pro_od` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES (26,15,4,500000,4),(27,15,5,500000,3),(28,15,6,2000000,3),(29,15,7,2000000,3),(30,16,1,50000,1),(31,16,2,50000,1),(32,16,4,500000,1),(33,16,5,500000,2),(34,17,1,50000,1),(35,17,2,50000,1),(36,17,4,500000,1),(37,17,8,500000,2),(38,18,8,123456,1),(39,19,4,500000,5);
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prod_tag`
--

DROP TABLE IF EXISTS `prod_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prod_tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `tag_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `f2_idx` (`tag_id`),
  KEY `f3_idx` (`product_id`),
  CONSTRAINT `f2` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `f3` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prod_tag`
--

LOCK TABLES `prod_tag` WRITE;
/*!40000 ALTER TABLE `prod_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `prod_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `image` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `category_id` int NOT NULL,
  `store_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cate_pro_id_idx` (`category_id`),
  KEY `fk_pro_user_id_idx` (`store_id`),
  CONSTRAINT `fk_cate_pro_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pro_user_id` FOREIGN KEY (`store_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Tai Nghe Bluetooth M10 nâng cấp Phiên Bản Pro','demo',550000,'https://res.cloudinary.com/by1410/image/upload/v1694149473/tefkwqalvu2wqzcbk5z0.png','2023-09-08 12:04:30',2,1),(2,'DÉP NỮ QUAI NGANG THỜI TRANG CAO CẤP [THÔNG T','Chúng tôi mang đến sự khác biệt! - Cùng với xu hướng thời trang mới đã và đang không ngừng đổi mới để mang đến cho các bản trẻ các mẫu giày thời trang độc đáo, mới lạ, để tiên phong cho một phong cách thời trang mới, một phong cách biểu tượng cho giới trẻ',50000,'https://res.cloudinary.com/by1410/image/upload/v1694149564/kx3jgr7ojwq1bjmfhkjc.png','2023-09-08 12:06:01',2,1),(4,'demo4','demo',500000,'https://res.cloudinary.com/by1410/image/upload/v1694152789/gkjbawmmgtfcxeiqbawl.png','2023-09-08 12:59:46',2,1),(5,'demo5','demo',500000,'https://res.cloudinary.com/by1410/image/upload/v1694153055/uzd1csdld8cxk9rhbhe3.png','2023-09-08 13:04:13',2,1),(6,'demo6','demo2',2000000,'https://res.cloudinary.com/by1410/image/upload/v1694153941/azrpb3wangnlj4hx4ocg.png','2023-09-08 13:18:59',2,1),(7,'demo7','demo2',2000000,'https://res.cloudinary.com/by1410/image/upload/v1694153967/t9aeq61xcdywwnuthmvo.png','2023-09-08 13:19:25',2,1),(8,'demo2','demo2',123456,'https://res.cloudinary.com/by1410/image/upload/v1694280591/grtlks6aaq9kkyrcdcud.png','2023-09-10 00:29:48',4,2);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rating` (
  `id` int NOT NULL AUTO_INCREMENT,
  `number` int NOT NULL,
  `author_id` int NOT NULL,
  `store_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_author_idx` (`author_id`),
  KEY `fk_user_store_idx` (`store_id`),
  CONSTRAINT `fk_user_author` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_store` FOREIGN KEY (`store_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
INSERT INTO `rating` VALUES (10,3,1,2),(11,0,1,1);
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale_order`
--

DROP TABLE IF EXISTS `sale_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sale_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(45) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `amount` decimal(10,0) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_so_idx` (`user_id`),
  CONSTRAINT `fk_user_so` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale_order`
--

LOCK TABLES `sale_order` WRITE;
/*!40000 ALTER TABLE `sale_order` DISABLE KEYS */;
INSERT INTO `sale_order` VALUES (15,NULL,NULL,'2023-09-10 02:33:25',2),(16,NULL,NULL,'2023-09-10 13:25:07',1),(17,NULL,NULL,'2023-09-10 13:26:04',1),(18,NULL,NULL,'2023-09-10 22:16:45',1),(19,NULL,NULL,'2023-09-10 22:21:15',1);
/*!40000 ALTER TABLE `sale_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tagcol` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `last_name` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `email` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `phone` varchar(45) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `username` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `active` bit(1) DEFAULT b'1',
  `user_role` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `avatar` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Hồ','Lê','phanleho002@gmail.com',NULL,'phanleho002@gmail.com','$2a$10$wtr8HDhys5zlC2lvOSvVuufyfActHN1eENFn2NXqPV2as/IRp1T4i',_binary '','ROLE_STORE','https://lh3.googleusercontent.com/a/AAcHTtdTKXvPBGBrtcpcCJQ4mbVrp1r8q2n3b3wFcucnrfu4Wu0=s96-c'),(2,'Hồ','Phan Lê','2051052051ho@ou.edu.vn',NULL,'2051052051ho@ou.edu.vn','$2a$10$KnbHJJvecQI2R7Se1Kh6v.RXPlY.UyGztB1I1wupZKQ7QCqTv57Gq',_binary '','ROLE_STORE','https://lh3.googleusercontent.com/a/AAcHTtfn-Bk3rEHBtP3lv6APbzdP2GYoP2NPI6RxI3mY6Sl4sA=s96-c'),(3,'demo','admin','admin@gmail.com',NULL,'admin','$2a$10$eD3eCSn3QpQD/LF0Xf3hJeLMmUi/wF4.2cd0sHSYsx1DscSBu4fXW',_binary '','ROLE_ADMIN','https://lh3.googleusercontent.com/a/AAcHTtfn-Bk3rEHBtP3lv6APbzdP2GYoP2NPI6RxI3mY6Sl4sA=s96-c'),(5,'demo','demo','kjdfha@gmail.com','128371627','demo2','$2a$10$amWYgjD8wpdc0IUVAKAj0escUfmL/N6Lr/xwa0WdTXvStEc.yommG',_binary '\0','ROLE_USER','https://res.cloudinary.com/by1410/image/upload/v1694339653/qyviu5vk3h8mkgzewonv.png');
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

-- Dump completed on 2023-09-10 23:24:41
