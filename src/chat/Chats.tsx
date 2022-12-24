import {FC} from "react";
import {ChatBubble} from "./ChatBubble";
import style from "./ChatBubble.module.css"

interface Props {
    chats: Chat[]
}

export interface Chat {
    content: string;
    from: ChatSource
}

export enum ChatSource {
    SENDER,
    SERVER
}

export const Chats: FC<Props> = ({chats}) => {
    return <div className={style.bubbleContainer}>
        {chats.map((chat, index) => <ChatBubble key={index} chat={chat}/>)}
    </div>
}