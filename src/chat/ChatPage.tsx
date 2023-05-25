import { FC, useEffect, useState } from "react";
import { Chats } from "./Chats";
import dynamic from "next/dynamic";
import { useChatList } from "./useChatList";
import { Chat, ChatSource } from "./ChatModel";
import { Spinner } from "flowbite-react";
import { useBackendProxy } from "../backend-proxy/useBackendProxy";

const DynamicChatInput = dynamic(
  () => import("./InputBox").then((module) => module.InputBox),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

export const ChatPage: FC = () => {
  // const { chats, addChat, markChat, initChat } = useChatList([
  //   { from: ChatSource.SERVER, message: "Hello, pls input the passport" },
  // ]);
  const { chats, addChat, likeChat, initChat } = useChatList([
    // {
    //   from: ChatSource.SERVER,
    //   message:
    //     "Hello, pls input the passport Hello, pls input the passportHello, pls input the passportHello, pls input the passportHello, pls input the passportHello, pls input the passport Hello, pls input the passportHello, pls input the passportHello, pls input the passport",
    //   id: "welcome",
    // },
  ]);
  const { chat, like, fetchHistory } = useBackendProxy();

  // const { sendChat } = useSendChat();

  const onSubmit = (message: string) => {
    if (message) {
      addChat({ from: ChatSource.SENDER, message });
      chat(message).then((chat) => addChat(chat));
    }
  };
  const [loading, setLoading] = useState(true);

  const likeChatOnClick = (id: string, liked: boolean) => {
    like(id, liked).then(() => likeChat(id, liked));
  };

  useEffect(() => {
    fetchHistory()
      .then((chats: Chat[]) => {
        setLoading(false);
        initChat([
          {
            from: ChatSource.SERVER,
            message: "Hi, chat to chat bot",
            id: "welcome",
          },
          ...chats,
        ]);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex h-screen flex-col p-2">
      {loading && (
        <div className=" flex items-center justify-center gap-3">
          <Spinner aria-label="loading chat list" size="lg" />
          <span>fetching chat histoy</span>
        </div>
      )}

      <Chats chats={chats} likeChat={likeChatOnClick} />
      <DynamicChatInput onSubmit={onSubmit} />
    </div>
  );
};
