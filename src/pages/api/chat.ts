import type { NextApiRequest, NextApiResponse } from "next";
import { sendToBeProxy } from "../../backend-proxy/api";

type Data =
  | string
  | {
      id: string;
      text: string;
      parentMessageId?: string;
      conversationId?: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
 
  const result = await sendToBeProxy({
    role: "user",
    prompt: req.body.message,
  });
  console.log("chat result", result);
  res.status(200).send({ id: result.id, text: result.response });
}
