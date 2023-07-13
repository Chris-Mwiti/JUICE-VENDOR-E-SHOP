-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'user';

-- CreateTable
CREATE TABLE `ShippingDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `county` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `town` VARCHAR(191) NOT NULL,
    `locationDesc` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modifiedAt` DATETIME(3) NOT NULL,
    `orderId` INTEGER NOT NULL,

    UNIQUE INDEX `ShippingDetails_orderId_key`(`orderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ShippingDetails` ADD CONSTRAINT `ShippingDetails_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `OrderDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
