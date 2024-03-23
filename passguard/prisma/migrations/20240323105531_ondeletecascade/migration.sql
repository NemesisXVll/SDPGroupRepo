-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Credential" (
    "credentialId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "serviceName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "url" TEXT,
    "isWeak" BOOLEAN NOT NULL,
    "isReused" BOOLEAN,
    "isOld" BOOLEAN NOT NULL DEFAULT false,
    "dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "serviceType" TEXT NOT NULL DEFAULT 'Personal',
    "picture" TEXT,
    "isFavourite" BOOLEAN NOT NULL DEFAULT false,
    "isTrashed" BOOLEAN NOT NULL DEFAULT false,
    "dateTrashed" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Credential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Credential" ("credentialId", "data", "dateCreated", "dateTrashed", "dateUpdated", "isFavourite", "isOld", "isReused", "isTrashed", "isWeak", "picture", "serviceName", "serviceType", "title", "url", "userId") SELECT "credentialId", "data", "dateCreated", "dateTrashed", "dateUpdated", "isFavourite", "isOld", "isReused", "isTrashed", "isWeak", "picture", "serviceName", "serviceType", "title", "url", "userId" FROM "Credential";
DROP TABLE "Credential";
ALTER TABLE "new_Credential" RENAME TO "Credential";
CREATE TABLE "new_Document" (
    "documentId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Document" ("category", "dateCreated", "documentId", "name", "path", "type", "userId") SELECT "category", "dateCreated", "documentId", "name", "path", "type", "userId" FROM "Document";
DROP TABLE "Document";
ALTER TABLE "new_Document" RENAME TO "Document";
CREATE TABLE "new_Trash" (
    "trashId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dateTempDeleted" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "credentialId" INTEGER NOT NULL,
    CONSTRAINT "Trash_credentialId_fkey" FOREIGN KEY ("credentialId") REFERENCES "Credential" ("credentialId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Trash" ("credentialId", "dateTempDeleted", "trashId") SELECT "credentialId", "dateTempDeleted", "trashId" FROM "Trash";
DROP TABLE "Trash";
ALTER TABLE "new_Trash" RENAME TO "Trash";
CREATE UNIQUE INDEX "Trash_credentialId_key" ON "Trash"("credentialId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
