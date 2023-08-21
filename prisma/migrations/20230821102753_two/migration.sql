/*
  Warnings:

  - Added the required column `taskimg` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "taskname" TEXT NOT NULL,
    "taskimg" TEXT NOT NULL
);
INSERT INTO "new_Task" ("id", "taskname") SELECT "id", "taskname" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
