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

  const likeChat = (id: string, like: boolean) => {
    setChats((prevState) => {
      return prevState.map((item) => {
        if (item.id === id) {
          return { ...item, like: like };
        }
        return item;
      });
    });
  };

  return { chats, addChat, likeChat, initChat };
};
