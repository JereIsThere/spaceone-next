-- CreateTable
CREATE TABLE `event_participants` (
    `eventId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `status` TINYINT NULL,

    PRIMARY KEY (`eventId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `events` (
    `eventId` INTEGER NOT NULL AUTO_INCREMENT,
    `placeId` INTEGER NOT NULL,
    `time` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `description` VARCHAR(1000) NULL,
    `hasTeamsCall` TINYINT NULL,
    `name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`eventId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `locations` (
    `placeId` INTEGER NOT NULL AUTO_INCREMENT,
    `planet` VARCHAR(45) NOT NULL,
    `country` VARCHAR(45) NOT NULL,
    `zip_code` VARCHAR(45) NOT NULL,
    `city` VARCHAR(45) NOT NULL,
    `street` VARCHAR(45) NOT NULL,
    `street_number` VARCHAR(45) NOT NULL,
    `building` VARCHAR(45) NULL,
    `room` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`placeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `userID` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(45) NOT NULL,
    `last_name` VARCHAR(45) NOT NULL,
    `roleID` INTEGER NOT NULL,

    PRIMARY KEY (`userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `event_participants` ADD CONSTRAINT `event_participants_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`eventId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `event_participants` ADD CONSTRAINT `event_participants_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_placeId_fkey` FOREIGN KEY (`placeId`) REFERENCES `locations`(`placeId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

