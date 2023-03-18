import { ChatGPTAPI } from 'chatgpt'

const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

export const sendToGPT = async (
  message: string,
  conversationId?: string,
  parentMessageId?: string
) => {
  return api.sendMessage(message, { parentMessageId })
}
