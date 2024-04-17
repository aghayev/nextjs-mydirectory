import type { NextApiRequest, NextApiResponse } from "next";
import { makeUniqueId, getUser } from "../../lib/db/auth"
import { getDb } from '../../lib/db/sqlite'

export default async function login(
  req: NextApiRequest, 
  res: NextApiResponse
) {

  const user = await getUser(req.body.username, req.body.password);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  let db = await getDb()

  try {
    await db.run("DELETE FROM sessions WHERE user_id = ?", user.id);

    const sessionId = makeUniqueId(user.id)
    await db.run("INSERT INTO sessions (session_id, user_id, role) VALUES (?,?,?)", sessionId, user.id, user.role);
    res.setHeader(
      "Set-Cookie",
      `sessionId=${sessionId}; HttpOnly; Path=/; SameSite=Lax`
    );

    res.status(200).json({ message: "Success" });
  } catch (error: any) {
    console.log('Error occured: ' + error.response.data)
    res.status(500).json({ error: 'Internal System Error'})
}
}
