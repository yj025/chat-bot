import type { NextApiRequest, NextApiResponse } from "next";
import { likeChat } from "../../backend-proxy/api";

type Data = [
  {
    id: string;
  }
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const result = await likeChat(req.body.id, req.body.like);
  console.log("like result", result);
  res.status(200).send(result);
}
