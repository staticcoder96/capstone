DROP DATABASE IF EXISTS IMovie;
CREATE DATABASE IMovie;
USE IMovie;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
	`id` int(11) PRIMARY KEY NOT NULL auto_increment,
	`firstname` varchar(20) NOT NULL,
	`lastname` varchar(20) NOT NULL,
	`username` varchar(16) NOT NULL,
	`password` varchar(32) NOT NULL,
	UNIQUE (`username`)
); 


INSERT INTO `user` VALUES (NULL, 'Admin', 'Admin', 'admin', 'bdc87b9c894da5168059e00ebffb9077');/*password1234*/
INSERT INTO `user` VALUES (NULL, 'Omar', 'Christie', 'ochristie', '62b6271e5030b702c20d2a39fb6afb71');/*Passwords:Madcat1000*/
INSERT INTO `user` VALUES (NULL, 'Leeza', 'Smith', 'lsmith', '62b6271e5030b702c20d2a39fb6afb71');/*Passwords:Madcat1000*/
INSERT INTO `user` VALUES (NULL, 'Sashana', 'Ramsey', 'sramsey', '62b6271e5030b702c20d2a39fb6afb71');/*Passwords:Madcat1000*/
INSERT INTO `user` VALUES (NULL, 'stephanie', 'Ramsey', 'stramsey', '62b6271e5030b702c20d2a39fb6afb71');/*Passwords:Madcat1000*/
INSERT INTO `user` VALUES (NULL, 'Patella', 'Portundo', 'pportundo', '62b6271e5030b702c20d2a39fb6afb71');/*Passwords:Madcat1000*/
INSERT INTO `user` VALUES (NULL, 'Kimari', 'Nelson', 'knelson', '62b6271e5030b702c20d2a39fb6afb71');/*Passwords:Madcat1000*/

DROP TABLE IF EXISTS `user_rating`;
CREATE TABLE `user_rating` (
	`id` int(11) PRIMARY KEY NOT NULL auto_increment,
	`username` varchar(16) NOT NULL,
	`movieid` varchar(250) NOT NULL,
	`moviename` varchar(250) NOT NULL,
	`movierating` varchar(1) NOT NULL,
	`moviereview` mediumtext NOT NULL,
	`date_added` datetime NOT NULL
); 

INSERT INTO `user_rating` VALUES (NULL, 'ochristie','tt1043813', 'Titans', '3.0', 'not bad', NOW());
INSERT INTO `user_rating` VALUES (NULL, 'ochristie', 'tt0499549', 'Avatar', '4.0', 'not tooo bad', NOW());
INSERT INTO `user_rating` VALUES (NULL, 'ochristie', 'tt0462499', 'Rambo', '5.0', 'The best story', NOW());

INSERT INTO `user_rating` VALUES (NULL, 'lsmith', 'tt1043813', 'Titans', '4.0', 'very good show', NOW());
INSERT INTO `user_rating` VALUES (NULL, 'lsmith', 'tt0499549', 'Avatar', '4.0', 'the best', NOW());
INSERT INTO `user_rating` VALUES (NULL, 'lsmith', 'tt0462499', 'Rambo', '5.0', 'rambo not bad', NOW());
INSERT INTO `user_rating` VALUES (NULL, 'lsmith', 'tt4016454', 'Supergirl', '5.0', ' rockey not bad', NOW());
INSERT INTO `user_rating` VALUES (NULL, 'lsmith', 'tt5719700', 'Home Again', '2.0', 'gorden not bad', NOW());

INSERT INTO `user_rating` VALUES (NULL, 'stramsey', 'tt0800369', 'Thor', '3.0', 'thor not that bad', NOW());
INSERT INTO `user_rating` VALUES (NULL, 'stramsey', 'tt0499549', 'Avatar', '2.0', 'user thinksS bad', NOW());
INSERT INTO `user_rating` VALUES (NULL, 'stramsey', 'tt0462499', 'Rambo', '3.0', 'rambo could develope more', NOW());

INSERT INTO `user_rating` VALUES (NULL, 'sramsey', 'tt0499549', 'Avatar', '3.0', 'avatar not bad', NOW());
INSERT INTO `user_rating` VALUES (NULL, 'sramsey', 'tt0800369', 'Thor', '4.0', 'Thor not bad', NOW());

INSERT INTO `user_rating` VALUES (NULL, 'pportundo', 'tt6099358', 'Golden State', '4.0', 'Gordon State was more develope', NOW());
INSERT INTO `user_rating` VALUES (NULL, 'pportundo', 'tt0381681', 'Before Sunset', '2.0', 'Hardly like', NOW());
INSERT INTO `user_rating` VALUES (NULL, 'pportundo', 'tt0139654', 'Training Day', '3.0', 'Average', NOW());
INSERT INTO `user_rating` VALUES (NULL, 'pportundo', 'tt0327084', 'Over the Hedge', '4.0', 'good but not great', NOW());

INSERT INTO `user_rating` VALUES (NULL, 'knelson', 'tt6099358', 'Golden State', '3.0', 'Gordon State was not more develope', NOW());
INSERT INTO `user_rating` VALUES (NULL, 'knelson', 'tt0139654', 'Training Day', '4.0', 'Apart from minor, liked a lot', NOW());


DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
	`id` int(11) PRIMARY KEY NOT NULL auto_increment,
	`username` varchar(20) NOT NULL,
	`movieid` varchar(20) NOT NULL,
	`subject` varchar(128) NOT NULL,
	`date_sent` datetime NOT NULL
);
DROP TABLE IF EXISTS `message_read`;
CREATE TABLE `message_read` (
	`id` int(11) PRIMARY KEY NOT NULL auto_increment,
	`message_id` varchar(20) NOT NULL,
	`date` datetime NOT NULL
);