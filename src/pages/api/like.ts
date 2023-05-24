import type { NextApiRequest, NextApiResponse } from "next";
import { markChat } from "../../backend-proxy/api";

type Data = [
  {
    id: string;
  }
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const result = await markChat(req.body.id);
  console.log("like result", result);
  res.status(200).send(result);
}
