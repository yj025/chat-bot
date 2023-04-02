import { useState } from "react";
import { Chat } from "./ChatModel";


export const useChatList = (initList:Chat[]) => {
  const [chats, setChats] = useState<Chat[]>(initList);
  const addChat = (chat: Chat) => {
    setChats((prevState) => [...prevState, chat]);
  };

  return { chats, addChat };
};
