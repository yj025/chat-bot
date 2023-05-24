import { useState } from "react";
import { Chat } from "./ChatModel";


export const useChatList = (initList:Chat[]) => {
  const [chats, setChats] = useState<Chat[]>(initList);

  const initChat = (initList:Chat[]) =>{
    setChats(initList)
  }
  const addChat = (chat: Chat) => {
    setChats((prevState) => [...prevState, chat]);
  };

  const markChat = (id:string)=>{
    // chats.find()
    console.log("like id=",id)
  }

  return { chats, addChat, markChat, initChat };
};
