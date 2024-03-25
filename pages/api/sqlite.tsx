import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import type { NextApiRequest, NextApiResponse } from 'next'

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

type ResponseData = {
  items: any[]
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
  
    const category = req.body.category;

    try {

      /*
      const querySql =
      "SELECT A.title, A.description, A.picture_path \
      FROM items A Inner join categories B ON A.category_id = B.entity_id \
      WHERE category_name = 'BreakfastIdeas'";
      */

      const querySql = "SELECT A.title, A.description, A.picture_path FROM items A \
      INNER JOIN categories B ON A.category_id = B.entity_id";

      const data = await db.all(querySql);
  
      res.status(200).json({ items: data });
    } catch (error) {
      // unhide to check error
      //res.status(500).json({ error: error.message });
    }
}