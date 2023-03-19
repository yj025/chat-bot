import { FC, useEffect, useState } from "react";
import { Chat, Chats, ChatSource } from "./Chats";
import style from "./ChatPage.module.css";
import dynamic from "next/dynamic";

const DynamicChatInput = dynamic(
  () => import("./InputBox").then((module) => module.InputBox),
  {
    loading: () => <p>Loading...</p>,
  }
);

interface Conversation {
  conversationId: string;
  messageId: string;
}

export const ChatPage: FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [conversation, setConversation] = useState<Conversation>();
  const addChat = (chat: Chat) => {
    setChats((prevState) => [...prevState, chat]);
  };
  useEffect(() => {
    setChats([
      { from: ChatSource.SERVER, message: "Hello, pls input the passport" },
    ]);
  }, []);
  const [token, setToken] = useState("");

  const sendMessage = (message: string, token: string) => {
    fetch("/api/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: message,
        conversationId: conversation?.conversationId,
        parentMessageId: conversation?.messageId,
      }),
    })
      .then((response) => {
        if (response.status == 401) {
          setToken("");
          throw Error("Authentication failed");
        }
        return response.json();
      })
      .then((result) => {
        addChat({ from: ChatSource.SERVER, message: result.result.text });
        setConversation({
          conversationId: result.result.conversationId,
          messageId: result.result.messageId,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const authenticate = (message: string) => {
    fetch("/api/authenticate", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    })
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        } else {
          throw Error("Authentication failed");
        }
      })
      .then((result) => {
        setToken(result.result.token);
        addChat({
          from: ChatSource.SERVER,
          message: "Success! Chat with me!",
        });
      })
      .catch((err) => {
        console.log(err);
        addChat({
          from: ChatSource.SERVER,
          message: "Authentication failed, pls input the passport.",
        });
      });
  };

  const onSubmit = (message: string) => {
    if (message) {
      addChat({ from: ChatSource.SENDER, message });
      if (token) {
        sendMessage(message, token);
      } else {
        authenticate(message);
      }
    }
  };

  return (
    <div className="flex h-screen flex-col p-2">
      <Chats chats={chats} />
      <DynamicChatInput onSubmit={onSubmit} />
    </div>
  );
};
