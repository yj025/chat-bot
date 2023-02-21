// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as jwt from 'jsonwebtoken'
import { JwtToken } from '../../auth/JwtToken'

type Data = {
  result: string | JwtToken
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).send({ result: 'Only POST requests allowed' })
  }

  const message = req.body.message

  if (message == process.env.PASSPORT) {
    const token = jwt.sign(
      { userName: process.env.USER_NAME },
      process.env.TOKEN_SECRET as string
    )
    res.status(200).send({ result: { token: token } })
  } else {
    res.status(401).send({ result: '401' })
  }
}
