import {Inter} from '@next/font/google'
import {ChatPage} from "../chat/ChatPage";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    return <ChatPage/>
}
