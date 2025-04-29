/*
  Warnings:

  - You are about to alter the column `tipo` on the `despesas` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - You are about to alter the column `tipo` on the `receitas` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `despesas` MODIFY `tipo` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `receitas` MODIFY `tipo` VARCHAR(191) NOT NULL;
