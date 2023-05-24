import { ChatSource } from "../chat/ChatModel";

export const useBackendProxy = () => {
  const chat = (message: string) => {
    return fetch("/api/chat", {
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
        return response.json();
      })
      .then((result) => {
        return Promise.resolve({
          id: result.id,
          from: ChatSource.SERVER,
          message: result.text,
        });
      });
  };

  const like = (id: string) => {
    return fetch("/api/like", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    }).then((response) => {
      return response.json();
    });
  };

  const fetchHistory = () => {
    return fetch("/api/history", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        const items = [];
        for (const item of result) {
          items.push({
            id: item.id,
            from: ChatSource.SENDER,
            message: item.question,
          });
          items.push({
            id: item.id,
            from: ChatSource.SERVER,
            message: item.answer,
            like: item.markStatus,
          });
        }
        return Promise.resolve(items);
      });
  };

  return { chat, like, fetchHistory };
};
