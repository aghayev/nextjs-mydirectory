import { makeUniqueId, getUser } from "../../lib/db/auth"
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { deleteCookie, getCookies } from 'cookies-next';

import type { NextApiRequest, NextApiResponse } from "next";
import router from "next/router";

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

export default async function logout(
  req: NextApiRequest, 
  res: NextApiResponse
) {

  if (!db) {
    db = await open({
      filename: "./lib/db/sqlite/mydirectory.db",
      driver: sqlite3.Database,
    });
  }

  try {
    const cookies = req.cookies
    const sessionId = cookies && cookies.sessionId

    if (sessionId) {
      await db.run("DELETE FROM sessions WHERE session_id = ?", sessionId)
      res.setHeader(
        "Set-Cookie",
        `sessionId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
      )
    }
    res.status(200).json({ message: "Success" })
  } catch (error: any) {
    console.log('Error occured: ' + error)
    res.status(500).json({ error: 'Internal System Error'})
}
}
