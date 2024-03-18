/*
  Warnings:

  - You are about to drop the column `picture` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "masterPassword" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "salt" TEXT,
    "dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" DATETIME NOT NULL
);
INSERT INTO "new_User" ("data", "dateCreated", "dateUpdated", "masterPassword", "salt", "userId") SELECT "data", "dateCreated", "dateUpdated", "masterPassword", "salt", "userId" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_data_key" ON "User"("data");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
