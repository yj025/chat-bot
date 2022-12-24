import {ChatGPTAPIBrowser} from 'chatgpt'

export const sendToGPT = async (message: string) => {
    const api = new ChatGPTAPIBrowser({
        email: process.env.OPENAI_EMAIL as string,
        password: process.env.OPENAI_PASSWORD as string
    })
    await api.initSession()

    return api.sendMessage(message)
}