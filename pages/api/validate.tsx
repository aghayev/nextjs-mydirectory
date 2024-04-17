import type { NextApiRequest, NextApiResponse } from "next";
import { getDb } from '../../lib/db/sqlite'

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

  let db = await getDb()

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
