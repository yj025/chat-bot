import { FC } from "react";
import { Chat, ChatSource } from "./ChatModel";
import { ChatBubbleServer } from "./ChatBubbleServer";
import { ChatBubbleUser } from "./ChatBubbleUser";

interface Props {
  chat: Chat;
  mark: (id:string)=>void;
}

export const ChatBubble: FC<Props> = ({ chat, mark }) => {
  const isSender = chat.from === ChatSource.SENDER;
  return isSender ? (
    <ChatBubbleUser content={chat.message} />
  ) : (
    <ChatBubbleServer chat={chat} mark={mark} />
  );
};
