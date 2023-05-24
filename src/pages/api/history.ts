import type { NextApiRequest, NextApiResponse } from "next";
import { fetchHistory } from "../../backend-proxy/api";

type Data =[{
      id: string;
      text: string;
      parentMessageId?: string;
      conversationId?: string;
    }];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const result = await fetchHistory();
  console.log("fetch history result", result);
  res.status(200).send(result);
}
