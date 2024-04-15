import type { NextApiRequest, NextApiResponse } from 'next'
 
import prisma from '../../lib/prisma'
type ResponseData = {
  message: {}
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

    const results = await prisma.categories.findMany()

    console.warn(results)

  res.status(200).json({ message: results })
}