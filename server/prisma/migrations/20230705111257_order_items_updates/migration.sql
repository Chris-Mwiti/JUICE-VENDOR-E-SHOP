/*
  Warnings:

  - A unique constraint covering the columns `[productId,orderId]` on the table `OrderItems` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `OrderItems_productId_orderId_key` ON `OrderItems`(`productId`, `orderId`);
