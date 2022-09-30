SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema data_warehouse
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema data_warehouse
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `data_warehouse` DEFAULT CHARACTER SET utf8 ;
USE `data_warehouse` ;

-- -----------------------------------------------------
-- Table `data_warehouse`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `data_warehouse`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `profile` ENUM('Admin', 'User') NOT NULL DEFAULT 'User' COMMENT 'A - Admin\nU - User\n',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `data_warehouse`.`regions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `data_warehouse`.`regions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `data_warehouse`.`countries`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `data_warehouse`.`countries` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `region_id` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_countries_regions1_idx` (`region_id` ASC) VISIBLE,
  CONSTRAINT `fk_countries_regions1`
    FOREIGN KEY (`region_id`)
    REFERENCES `data_warehouse`.`regions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `data_warehouse`.`cities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `data_warehouse`.`cities` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `country_id` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_cities_countries1_idx` (`country_id` ASC) VISIBLE,
  CONSTRAINT `fk_cities_countries1`
    FOREIGN KEY (`country_id`)
    REFERENCES `data_warehouse`.`countries` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `data_warehouse`.`companies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `data_warehouse`.`companies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `address` VARCHAR(200) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `phone` VARCHAR(50) NULL,
  `city_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_companies_cities1_idx` (`city_id` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  CONSTRAINT `fk_companies_cities1`
    FOREIGN KEY (`city_id`)
    REFERENCES `data_warehouse`.`cities` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `data_warehouse`.`contacts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `data_warehouse`.`contacts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `job_title` VARCHAR(45) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `company_id` INT NOT NULL,
  `city_id` INT NOT NULL,
  `address` VARCHAR(200) NOT NULL,
  `interest` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_contacs_companies1_idx` (`company_id` ASC) VISIBLE,
  INDEX `fk_contacs_cities1_idx` (`city_id` ASC) VISIBLE,
  CONSTRAINT `fk_contacs_companies1`
    FOREIGN KEY (`company_id`)
    REFERENCES `data_warehouse`.`companies` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_contacs_cities1`
    FOREIGN KEY (`city_id`)
    REFERENCES `data_warehouse`.`cities` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `data_warehouse`.`channels`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `data_warehouse`.`channels` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
COMMENT = 'canales disponibles.';


-- -----------------------------------------------------
-- Table `data_warehouse`.`contact_channels`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `data_warehouse`.`contact_channels` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `channels_id` INT NOT NULL,
  `account` VARCHAR(200) NULL,
  `preference` ENUM('0', '1', '2') NULL DEFAULT '1' COMMENT '0 - no molestar\n1 - sin preferencia\n2 - favorito \n',
  `contacts_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_contact_channels_channels1_idx` (`channels_id` ASC) VISIBLE,
  INDEX `fk_contact_channels_contacts1_idx` (`contacts_id` ASC) VISIBLE,
  CONSTRAINT `fk_contact_channels_channels1`
    FOREIGN KEY (`channels_id`)
    REFERENCES `data_warehouse`.`channels` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_contact_channels_contacts1`
    FOREIGN KEY (`contacts_id`)
    REFERENCES `data_warehouse`.`contacts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
