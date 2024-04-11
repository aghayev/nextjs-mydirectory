import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

import type { NextApiRequest, NextApiResponse } from "next";

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;
type ResponseData = ResponseSuccessData | ResponseErrorData 
type ResponseSuccessData = {
  items: any[]
}

type ResponseErrorData = {
  error: string
}

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<ResponseData>
) {

  if (!db) {
    db = await open({
      filename: "./lib/db/sqlite/mydirectory.db",
      driver: sqlite3.Database,
    });
  }

  try {
    const sessionId = req?.body.sessionId;

    const querySql = `SELECT A.user_id, A.role FROM sessions A \
    WHERE A.session_id = '${sessionId}'`;

    const data = await db.get(querySql);

    res.status(200).json({ items: data });
} catch (error: any) {
    res.status(500).json({ error: error})
  }
}
