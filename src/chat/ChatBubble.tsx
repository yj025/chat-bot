import { FC } from "react";
import { Chat, ChatSource } from "./Chats";

interface Props {
  chat: Chat;
}

export const ChatBubble: FC<Props> = ({ chat }) => {
  return (
    <p
      className={
        chat.from === ChatSource.SENDER
          ? "m-1 self-end rounded-md bg-lime-50 p-2"
          : "m-1 self-start rounded-md bg-orange-100 p-2"
      }
    >
      {chat.message}
    </p>
  );
};
