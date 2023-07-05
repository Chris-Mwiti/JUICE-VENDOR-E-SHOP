-- AlterTable
ALTER TABLE `orderdetails` ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE `paymentdetails` MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE `shoppingsession` ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'pending';
