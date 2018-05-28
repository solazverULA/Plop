-- phpMyAdmin SQL Dump
-- version 4.7.6
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 01-03-2018 a las 04:35:37
-- Versión del servidor: 10.1.29-MariaDB
-- Versión de PHP: 7.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `Plop!`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cities`
--

CREATE TABLE `cities` (
  `idcities` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `zip_code` int NOT NULL,
  `countries_idcountries` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `countries`
--

CREATE TABLE `countries` (
  `idcountries` int(11) NOT NULL,
  `name_country` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `features`
--

CREATE TABLE `features` (
  `idfeatures` int(11) NOT NULL,
  `resend_notification` int(11) DEFAULT NULL,
  `edit_notification` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listeners`
--

CREATE TABLE `listeners` (
  `cilisteners` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `devices`
--

CREATE TABLE `devices` (
  `token` varchar(250) DEFAULT NULL COMMENT 'unique token of litener for ios and android devices',
  `auth` varchar(250) DEFAULT NULL COMMENT 'key of browser notifcation',
  `end_point` varchar(250) DEFAULT NULL COMMENT 'key of the browser notification',
  `p256h` varchar(250) DEFAULT NULL COMMENT 'code of the browser notification',
  `phone_number` varchar(30) NOT NULL,
  `listeners_cilisteners` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listeners_receive_notifications`
--

CREATE TABLE `listeners_receive_notifications` (
  `listeners_cilisteners` int(11) NOT NULL,
  `notifications_idnotifications` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listeners_has_users`
--

CREATE TABLE `listeners_has_users` (
  `listeners_cilisteners` int(11) NOT NULL,
  `users_ciuser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_send_notifications`
--

CREATE TABLE `users_send_notifications` (
  `notifications_idnotifications` int(11) NOT NULL,
  `users_ciuser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notifications`
--

CREATE TABLE `notifications` (
  `idnotifications` int(11) NOT NULL,
  `title` text,
  `body` text,
  `src_image` text COMMENT 'drive id of notification image'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `people`
--

CREATE TABLE `people` (
  `cipeople` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL COMMENT 'User full name',
  `gender` varchar(45) DEFAULT NULL COMMENT 'User gender',
  `src_logo` text COMMENT 'Drive id of user logo',
  `src_icon` text COMMENT 'Drive id of icon user',
  `countries_idcountries` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rols`
--

CREATE TABLE `rols` (
  `idrole` int(11) NOT NULL,
  `role_name` varchar(45) DEFAULT NULL COMMENT 'Name of user role, Example: Admin or FreeUser, Premium user, merchant, reseller',
  `features_idfeatures` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `ciuser` int(11) NOT NULL,
  `email` varchar(100) DEFAULT NULL COMMENT 'User Email for login to the application',
  `password` varchar(100) DEFAULT NULL COMMENT 'Password form the user',
  `created_at` varchar(90) DEFAULT NULL,
  `updated_at` varchar(90) DEFAULT NULL,
  `rols_idrole` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------


--
-- Índices para tablas volcadas
--


--
-- Indices de la tabla `cities`
--

ALTER TABLE `cities`
  ADD PRIMARY KEY (`idcities`),
  ADD KEY `fk_cities_countries1_idx` (`countries_idcountries`);

--
-- Indices de la tabla `countries`
--

ALTER TABLE `countries`
  ADD PRIMARY KEY (`idcountries`);

--
-- Indices de la tabla `features`
--

ALTER TABLE `features`
  ADD PRIMARY KEY (`idfeatures`);

--
-- Indices de la tabla `listeners`
--

ALTER TABLE `listeners`
  ADD PRIMARY KEY (`cilisteners`);

--
-- Indices de la tabla `devices`
--

ALTER TABLE `devices`
  ADD PRIMARY KEY (`token`,`auth`,`end_point`,`p256h`),
  ADD KEY `fk_devices_listener1_idx` (`listeners_cilisteners`);

--
-- Indices de la tabla `listeners_has_notifications`
--

ALTER TABLE `listeners_receive_notifications`
  ADD PRIMARY KEY (`listeners_cilisteners`,`notifications_idnotifications`),
  ADD KEY `fk_listeners_receive_notifications_notifications1_idx` (`notifications_idnotifications`),
  ADD KEY `fk_listeners_receive_notifications_listeners1_idx` (`listeners_cilisteners`);

--
-- Indices de la tabla `listeners_has_users`
--

ALTER TABLE `listeners_has_users`
  ADD PRIMARY KEY (`listeners_cilisteners`,`users_ciuser`),
  ADD KEY `fk_listeners_has_users_users1_idx` (`users_ciuser`),
  ADD KEY `fk_listeners_has_users_listeners1_idx` (`listeners_cilisteners`);

--
-- Indices de la tabla `users_send_notifications`
--

ALTER TABLE `users_send_notifications`
  ADD PRIMARY KEY (`notifications_idnotifications`,`users_ciuser`),
  ADD KEY `fk_users_send_notifications_users1_idx` (`users_ciuser`),
  ADD KEY `fk_users_send_notifications_notifications1_idx` (`notifications_idnotifications`);

--
-- Indices de la tabla `notifications`
--

ALTER TABLE `notifications`
  ADD PRIMARY KEY (`idnotifications`);

--
-- Indices de la tabla `people`
--

ALTER TABLE `people`
  ADD PRIMARY KEY (`cipeople`),
  ADD KEY `fk_profiles_countries1_idx` (`countries_idcountries`);

--
-- Indices de la tabla `rols`
--

ALTER TABLE `rols`
  ADD PRIMARY KEY (`idrole`,`features_idfeatures`),
  ADD UNIQUE KEY `rolename_UNIQUE` (`role_name`),
  ADD KEY `fk_rols_features1_idx` (`features_idfeatures`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ciuser`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD KEY `fk_users_rols1_idx` (`rols_idrole`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cities`
--

ALTER TABLE `cities`
  MODIFY `idcities` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `countries`
--

ALTER TABLE `countries`
  MODIFY `idcountries` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `features`
--
ALTER TABLE `features`
  MODIFY `idfeatures` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `notifications`
--

ALTER TABLE `notifications`
  MODIFY `idnotifications` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rols`
--

ALTER TABLE `rols`
  MODIFY `idrole` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cities`
--
ALTER TABLE `cities`
  ADD CONSTRAINT `fk_cities_countries1` FOREIGN KEY (`countries_idcountries`) REFERENCES `countries` (`idcountries`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `listeners_receive_notifications`
--
ALTER TABLE `listeners_receive_notifications`
  ADD CONSTRAINT `fk_listeners_receive_notifications_listeners1` FOREIGN KEY (`listeners_cilisteners`) REFERENCES `listeners` (`cilisteners`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_listeners_receive_notifications_notifications1` FOREIGN KEY (`notifications_idnotifications`) REFERENCES `notifications` (`idnotifications`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `listeners_has_users`
--
ALTER TABLE `listeners_has_users`
  ADD CONSTRAINT `fk_listeners_has_users_listeners1` FOREIGN KEY (`listeners_cilisteners`) REFERENCES `listeners` (`cilisteners`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_listeners_has_users_users1` FOREIGN KEY (`users_ciuser`) REFERENCES `users` (`ciuser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `users_send_notifications`
--
ALTER TABLE `users_send_notifications`
  ADD CONSTRAINT `fk_users_send_notifications_notifications1` FOREIGN KEY (`notifications_idnotifications`) REFERENCES `notifications` (`idnotifications`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_users_send_notifications_users1` FOREIGN KEY (`users_ciuser`) REFERENCES `users` (`ciuser`) ON DELETE NO ACTION ON UPDATE NO ACTION;


--
-- Filtros para la tabla `devices`
--
ALTER TABLE `devices`
  ADD CONSTRAINT `fk_devices_listener1_idx` FOREIGN KEY (`listeners_cilisteners`) REFERENCES `listeners` (`cilisteners`) ON DELETE NO ACTION ON UPDATE NO ACTION;


--
-- Filtros para la tabla `people`
--
ALTER TABLE `people`
  ADD CONSTRAINT `fk_people_countries1` FOREIGN KEY (`countries_idcountries`) REFERENCES `countries` (`idcountries`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `rols`
--
ALTER TABLE `rols`
  ADD CONSTRAINT `fk_rols_features1` FOREIGN KEY (`features_idfeatures`) REFERENCES `features` (`idfeatures`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_rols1` FOREIGN KEY (`rols_idrole`) REFERENCES `rols` (`idrole`) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
