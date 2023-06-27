/*
  Warnings:

  - A unique constraint covering the columns `[productName]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productName` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `inventory` ADD COLUMN `productName` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Inventory_productName_key` ON `Inventory`(`productName`);
