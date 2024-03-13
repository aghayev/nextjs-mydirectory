import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import type { NextApiRequest, NextApiResponse } from 'next'

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

type ResponseData = {
  data: any[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

    if (!db) {
      db = await open({
        filename: "./lib/db/sqlite/sample.db",
        driver: sqlite3.Database,
      });
    }
  
    const data = await db.all("SELECT * FROM sampletable");
 
return res.status(200).json({ data: data });
}