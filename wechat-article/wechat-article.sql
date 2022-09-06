/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3312
 Source Schema         : wechat-article

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 06/01/2022 09:24:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `biz` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `uin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `flag` smallint(0) NULL DEFAULT NULL,
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  `deletedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES (1, 'jack', 'test11', 'test', NULL, NULL, '2022-01-05 00:45:19', '2022-01-05 01:03:36', NULL);

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `fromid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `fromName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `level` smallint(0) NULL DEFAULT 1,
  `newstime` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  `deletedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 313 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (7, '今年，他们120岁！', NULL, '3260101437', '南京教育发布', 'http://mp.weixin.qq.com/s?__biz=MzI2MDEwMTQzNw==&amp;mid=2650930235&amp;idx=1&amp;sn=7eeb741ee613e73216249b7983fa8b4b&amp;chksm=f19b9869c6ec117f8432b0ba814ce974ce2b164970dbfc0c0acbf6882ae856cc42ed665e9e5b&amp;scene=27#wechat_redirect', 1, '1641084600', '2022-01-06 00:59:08', '2022-01-06 00:59:08', NULL);
INSERT INTO `article` VALUES (8, '国家主席习近平发表二〇二二年新年贺词', NULL, '3260101437', '南京教育发布', 'http://mp.weixin.qq.com/s?__biz=MzI2MDEwMTQzNw==&amp;mid=2650930188&amp;idx=1&amp;sn=93020c476c579a5cdcdc13c525d0840b&amp;chksm=f19b985ec6ec11488fbc18b20d2344d239a6917170cea53f04466ba7538ebb0b1fd579f44a54&amp;scene=27#wechat_redirect', 1, '1641014451', '2022-01-06 00:59:09', '2022-01-06 00:59:09', NULL);


-- ----------------------------
-- Table structure for originArticle
-- ----------------------------
DROP TABLE IF EXISTS `originArticle`;
CREATE TABLE `originArticle`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `fromid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `fromName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `newstime` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `body` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  `deletedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of originArticle
-- ----------------------------
INSERT INTO `originArticle` VALUES (2, '今年，他们120岁！', '3260101437', '南京教育发布', '1641084600', '{\"comm_msg_info\":{\"id\":1000001656,\"type\":49,\"datetime\":1641084600,\"fakeid\":\"3260101437\",\"status\":2,\"content\":\"\"},\"app_msg_ext_info\":{\"title\":\"今年，他们120岁！\",\"digest\":\"\",\"content\":\"\",\"fileid\":503446584,\"content_url\":\"http://mp.weixin.qq.com/s?__biz=MzI2MDEwMTQzNw==&amp;mid=2650930235&amp;idx=1&amp;sn=7eeb741ee613e73216249b7983fa8b4b&amp;chksm=f19b9869c6ec117f8432b0ba814ce974ce2b164970dbfc0c0acbf6882ae856cc42ed665e9e5b&amp;scene=27#wechat_redirect\",\"source_url\":\"\",\"cover\":\"http://mmbiz.qpic.cn/mmbiz_jpg/PBibB4aPiaich5Y69wOJIusVKPNx5Qby2USvVD9R9WJc1ns3VzRPcKt6oibyiad7qKy2ENEOzQOafdIYSLnrbqYKB7g/0?wx_fmt=jpeg\",\"subtype\":9,\"is_multi\":0,\"multi_app_msg_item_list\":[],\"author\":\"\",\"copyright_stat\":100,\"duration\":0,\"del_flag\":1,\"item_show_type\":0,\"audio_fileid\":0,\"play_url\":\"\",\"malicious_title_reason_id\":0,\"malicious_content_type\":0}}', '2022-01-06 01:24:25', '2022-01-06 01:24:25', NULL);
INSERT INTO `originArticle` VALUES (3, '国家主席习近平发表二〇二二年新年贺词', '3260101437', '南京教育发布', '1641014451', '{\"comm_msg_info\":{\"id\":1000001655,\"type\":49,\"datetime\":1641014451,\"fakeid\":\"3260101437\",\"status\":2,\"content\":\"\"},\"app_msg_ext_info\":{\"title\":\"国家主席习近平发表二〇二二年新年贺词\",\"digest\":\"\",\"content\":\"\",\"fileid\":503446536,\"content_url\":\"http://mp.weixin.qq.com/s?__biz=MzI2MDEwMTQzNw==&amp;mid=2650930188&amp;idx=1&amp;sn=93020c476c579a5cdcdc13c525d0840b&amp;chksm=f19b985ec6ec11488fbc18b20d2344d239a6917170cea53f04466ba7538ebb0b1fd579f44a54&amp;scene=27#wechat_redirect\",\"source_url\":\"\",\"cover\":\"http://mmbiz.qpic.cn/mmbiz_jpg/PBibB4aPiaich5Y69wOJIusVKPNx5Qby2UShqEOzT0wEzjM1cMnT61OaNyyBxvRmRen0LjV9QNRBwODp3bRDBbulA/0?wx_fmt=jpeg\",\"subtype\":9,\"is_multi\":0,\"multi_app_msg_item_list\":[],\"author\":\"\",\"copyright_stat\":100,\"duration\":0,\"del_flag\":1,\"item_show_type\":0,\"audio_fileid\":0,\"play_url\":\"\",\"malicious_title_reason_id\":0,\"malicious_content_type\":0}}', '2022-01-06 01:24:25', '2022-01-06 01:24:25', NULL);
