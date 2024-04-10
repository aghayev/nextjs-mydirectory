import { makeUniqueId, getUser } from "../../lib/db/auth"
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

import type { NextApiRequest, NextApiResponse } from "next";

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

export default async function login(
  req: NextApiRequest, 
  res: NextApiResponse
) {

  const user = await getUser(req.body.username, req.body.password);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  if (!db) {
    db = await open({
      filename: "./lib/db/sqlite/mydirectory.db",
      driver: sqlite3.Database,
    });
  }

  try {
    await db.run("DELETE FROM sessions WHERE user_id = ?", user.id);

    const sessionId = makeUniqueId(user.id)
    await db.run("INSERT INTO sessions (session_id, user_id) VALUES (?,?)", sessionId, user.id);
    res.setHeader(
      "Set-Cookie",
      `sessionId=${sessionId}; HttpOnly; Path=/; SameSite=Lax`
    );
    db.close()
    res.status(200).json({ message: "Success" });
  } catch (error: any) {
    console.log('Error occured: ' + error.response.data)
    res.status(500).json({ error: 'Internal System Error'})
  }
}
