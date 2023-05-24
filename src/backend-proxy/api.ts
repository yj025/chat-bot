import { ChatRequest } from "./model";

export const sendToBeProxy = (chatRequest: ChatRequest) => {
  return fetch(`${process.env.BACKEND_PROXY_API}/v1/conversation/openai`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chatRequest),
    method: "POST",
  }).then((it) => it.json());
};

export const markChat = (id: string) => {
  return fetch(
    `${process.env.BACKEND_PROXY_API}/v1/conversation/messages/${id}/change`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ markStatus: true }),
      method: "POST",
    }
  ).then((it) => it.json());
};

export const fetchHistory = () => {
  return fetch(`${process.env.BACKEND_PROXY_API}/v1/conversation/history`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  }).then((it) => it.json());
};
