import { FC } from "react";
import { Chats } from "./Chats";
import dynamic from "next/dynamic";
import { useSendChat } from "./useSendChat";
import { useChatList } from "./useChatList";
import { ChatSource } from "./ChatModel";

const DynamicChatInput = dynamic(
  () => import("./InputBox").then((module) => module.InputBox),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

export const ChatPage: FC = () => {
  const { chats, addChat } = useChatList([{ from: ChatSource.SERVER, message: "Hello, pls input the passport" }]);
  const { sendChat } = useSendChat();
  
  const onSubmit = (message: string) => {
    if (message) {
      addChat({ from: ChatSource.SENDER, message });
      sendChat(message).then((chat) => addChat(chat));
    }
  };

  return (
    <div className="flex h-screen flex-col p-2">
      <Chats chats={chats} />
      <DynamicChatInput onSubmit={onSubmit} />
    </div>
  );
};
