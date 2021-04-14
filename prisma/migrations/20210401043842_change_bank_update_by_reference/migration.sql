-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bank" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "accountNumber" TEXT,
    "swift" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "updatedBy" INTEGER NOT NULL,
    FOREIGN KEY ("createdBy") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("updatedBy") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Bank" ("id", "address", "name", "accountNumber", "swift", "createdAt", "updatedAt", "createdBy", "updatedBy") SELECT "id", "address", "name", "accountNumber", "swift", "createdAt", "updatedAt", "createdBy", "updatedBy" FROM "Bank";
DROP TABLE "Bank";
ALTER TABLE "new_Bank" RENAME TO "Bank";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
