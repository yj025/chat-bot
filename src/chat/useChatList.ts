import { useState } from "react";
import { Chat } from "./ChatModel";

export const useChatList = (initList: Chat[]) => {
  const [chats, setChats] = useState<Chat[]>(initList);

  const initChat = (initList: Chat[]) => {
    setChats(initList);
  };
  const addChat = (chat: Chat) => {
    setChats((prevState) => [...prevState, chat]);
  };

  const markChat = (id: string) => {
    const find = chats?.find((it) => it.id === id) as Chat;
    Object.assign(find, { ...find, like: true });
  };

  return { chats, addChat, markChat, initChat };
};
