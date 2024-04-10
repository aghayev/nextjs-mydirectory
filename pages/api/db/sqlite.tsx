import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import type { NextApiRequest, NextApiResponse } from 'next'

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
      const category = req?.body.category;

      const querySql = `SELECT A.title, A.description, A.picture_path FROM items A \
      INNER JOIN categories B ON A.category_id = B.entity_id \
      WHERE B.category_name = '${category}'`;

      const data = await db.all(querySql);

      db.close()
      res.status(200).json({ items: data });
    } catch (error: any) {
      console.log('Error occured: ' + error.response.data)
      res.status(500).json({ error: 'Internal System Error'})
    }
}