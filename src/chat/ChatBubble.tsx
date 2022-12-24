import {FC} from "react";
import {Chat, ChatSource} from "./Chats";
import style from "./ChatBubble.module.css"

interface Props {
    chat: Chat
}

export const ChatBubble: FC<Props> = ({chat}) => {
    const bubbleStyle = chat.from === ChatSource.SENDER ? style.bubbleSender : style.bubbleServer
    return <p className={bubbleStyle}>{chat.content}</p>
}