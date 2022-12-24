// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {sendToGPT} from "../../gpt/client";
import {ChatResponse} from "chatgpt";

type Data = {
    result: string | ChatResponse
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== 'POST') {
        res.status(405).send({result: 'Only POST requests allowed'})
        return
    }

    const result = await sendToGPT(req.body.message,req.body.conversationId,req.body.parentMessageId)
    console.log(result)
    res.status(200).send({result: result})
}
