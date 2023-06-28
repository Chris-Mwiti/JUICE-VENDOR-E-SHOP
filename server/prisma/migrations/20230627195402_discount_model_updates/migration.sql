/*
  Warnings:

  - A unique constraint covering the columns `[coupon]` on the table `Discount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Discount_coupon_key` ON `Discount`(`coupon`);
