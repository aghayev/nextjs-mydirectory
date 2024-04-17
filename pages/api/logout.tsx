import type { NextApiRequest, NextApiResponse } from "next";
import { getDb } from '../../lib/db/sqlite'

export default async function logout(
  req: NextApiRequest, 
  res: NextApiResponse
) {

  let db = await getDb()

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
