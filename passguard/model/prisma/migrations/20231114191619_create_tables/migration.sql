-- CreateTable
CREATE TABLE "User" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" DATETIME NOT NULL,
    "picture" BLOB
);

-- CreateTable
CREATE TABLE "Credential" (
    "credentialId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "serviceName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "url" TEXT,
    "isWeak" BOOLEAN NOT NULL,
    "dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" DATETIME NOT NULL,
    "serviceType" TEXT NOT NULL DEFAULT 'Personal',
    "picture" BLOB,
    "isFavourite" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Credential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SecurityQuestion" (
    "securityQuestionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "SecurityQuestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Trash" (
    "trashId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trashDateTempDeleted" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "credentialId" INTEGER NOT NULL,
    CONSTRAINT "Trash_credentialId_fkey" FOREIGN KEY ("credentialId") REFERENCES "Credential" ("credentialId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_data_key" ON "User"("data");

-- CreateIndex
CREATE UNIQUE INDEX "Credential_data_key" ON "Credential"("data");

-- CreateIndex
CREATE UNIQUE INDEX "Credential_userId_key" ON "Credential"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SecurityQuestion_userId_key" ON "SecurityQuestion"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Trash_credentialId_key" ON "Trash"("credentialId");
