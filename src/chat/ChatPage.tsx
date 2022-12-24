import {FC, useEffect, useState} from "react";
import {Chat, Chats, ChatSource} from "./Chats";
import {InputBox} from "./InputBox";
import style from "./ChatPage.module.css"

export const ChatPage: FC = () => {

    const [chats, setChats] = useState<Chat[]>([])
    const addChat = (chat: Chat) => {
        setChats(prevState => [...prevState,chat])
    }
    useEffect(() => {
        setChats([{from: ChatSource.SERVER, content: "hello"}, {from: ChatSource.SENDER, content: "hello there"}])
    }, [])

    const onInput = (content: string) => {
        addChat({from: ChatSource.SENDER, content})
    }

    return (
        <div className={style.chatContainer}>
            <Chats chats={chats}/>
            <InputBox onComplete={onInput}/>
        </div>
    )

}