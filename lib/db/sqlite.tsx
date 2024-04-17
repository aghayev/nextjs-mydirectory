import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

export async function getDb() {
    let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

    if (!db) {
        db = await open({
          filename: "./lib/db/sqlite/mydirectory.db",
          driver: sqlite3.Database,
        })
      }

      return db
}