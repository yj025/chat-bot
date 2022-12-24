import {ChatGPTAPIBrowser} from 'chatgpt'

const api = new ChatGPTAPIBrowser({
    email: process.env.OPENAI_EMAIL as string,
    password: process.env.OPENAI_PASSWORD as string
})

export const sendToGPT = async (message: string) => {
    const isAuthenticated = await api.getIsAuthenticated()
    if (!isAuthenticated){
        await api.initSession()
    }

    return api.sendMessage(message)
}