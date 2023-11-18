/*
  Warnings:

  - You are about to drop the column `studentId` on the `Certificate` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentid]` on the table `Certificate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentid` to the `Certificate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Certificate" DROP CONSTRAINT "Certificate_studentId_fkey";

-- DropIndex
DROP INDEX "Certificate_studentId_key";

-- AlterTable
ALTER TABLE "Certificate" DROP COLUMN "studentId",
ADD COLUMN     "studentid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_studentid_key" ON "Certificate"("studentid");

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_studentid_fkey" FOREIGN KEY ("studentid") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
