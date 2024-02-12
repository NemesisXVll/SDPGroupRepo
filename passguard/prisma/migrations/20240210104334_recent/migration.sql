-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Credential" (
    "credentialId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "serviceName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "url" TEXT,
    "isWeak" BOOLEAN NOT NULL,
    "isReused" BOOLEAN NOT NULL,
    "isOld" BOOLEAN NOT NULL DEFAULT false,
    "dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "serviceType" TEXT NOT NULL DEFAULT 'Personal',
    "picture" TEXT,
    "isFavourite" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Credential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Credential" ("credentialId", "data", "dateCreated", "dateUpdated", "isFavourite", "isOld", "isReused", "isWeak", "picture", "serviceName", "serviceType", "title", "url", "userId") SELECT "credentialId", "data", "dateCreated", "dateUpdated", "isFavourite", "isOld", "isReused", "isWeak", "picture", "serviceName", "serviceType", "title", "url", "userId" FROM "Credential";
DROP TABLE "Credential";
ALTER TABLE "new_Credential" RENAME TO "Credential";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
