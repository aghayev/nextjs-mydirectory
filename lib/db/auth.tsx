import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

export function makeUniqueId(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export async function getUser(username: string, password: string) {
  await new Promise((res) => setTimeout(res, 1000));

  // TODO: Impl. or integrate with auth, OAuth, etc.
  if (username === "admin" && password === "admin") {
    return {
      id: 5,
    };
  }

  return null;
}

// Validate Session
export async function getSession(sessionId: any) {

  if (!db) {
    db = await open({
      filename: "./sqlite/mydirectory.db",
      driver: sqlite3.Database,
    });
  }

  try {
    const querySql = `SELECT A.user_id FROM sessions A \
    WHERE A.session_id = '${sessionId}'`;

    const data = await db.all(querySql);
    return { data: data };
  } catch (error: any) {
    console.log("error occured:" + error);
  }

  return null;
}