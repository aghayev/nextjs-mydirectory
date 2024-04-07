import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.setHeader("WWW-authenticate", 'Basic realm="Secure Area"');
  res.statusCode = 401;
  res.end(`Auth Required.`);
}