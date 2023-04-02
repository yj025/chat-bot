import { useState } from "react";
import { ChatSource } from "./ChatModel";

interface Conversation {
  conversationId: string;
  messageId: string;
}

export const useSendChat = () => {
  const [token, setToken] = useState("");
  const [conversation, setConversation] = useState<Conversation>();

  const sendChat = (message: string) => {
    if (token) {
      return sendMessage(
        message,
        conversation?.conversationId,
        conversation?.messageId
      );
    } else {
      return authenticate(message);
    }
  };

  const sendMessage = (
    message: string,
    conversationId?: string,
    parentMessageId?: string
  ) => {
    return fetch("/api/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: message,
        conversationId: conversationId,
        parentMessageId: parentMessageId,
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
        setConversation({
          conversationId: result.result.conversationId,
          messageId: result.result.messageId,
        });
        return Promise.resolve({
          from: ChatSource.SERVER,
          message: result.result.text,
        });
      })
      .catch((err) => {
        console.log(err);
        return Promise.resolve({
          from: ChatSource.SERVER,
          message: "Something went wrong.",
        });
      });
  };

  const authenticate = (message: string) => {
    return fetch("/api/authenticate", {
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
        return Promise.resolve({
          from: ChatSource.SERVER,
          message: "Success! Chat with me!",
        });
      })
      .catch((err) => {
        console.log(err);
        return Promise.resolve({
          from: ChatSource.SERVER,
          message: "Authentication failed, pls input the passport.",
        });
      });
  };

  return { sendChat };
};
