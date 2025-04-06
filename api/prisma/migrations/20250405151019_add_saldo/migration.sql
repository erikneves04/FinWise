/*
  Warnings:

  - Added the required column `saldo` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `saldo` DOUBLE NOT NULL;
