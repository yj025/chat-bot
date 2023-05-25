import { FC, useEffect, useRef } from "react";
import { ChatBubble } from "./ChatBubble";
import { Chat } from "./ChatModel";

interface Props {
  chats: Chat[];
  likeChat: (id: string, like: boolean) => void;
}

export const Chats: FC<Props> = ({ chats, likeChat }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollTop = scrollRef.current?.scrollHeight;
    }
  }, [chats.length]);
  return (
    <div className="flex-grow overflow-hidden">
      <div
        ref={scrollRef}
        className="flex max-h-full flex-col overflow-auto  whitespace-pre-wrap text-lg"
      >
        {chats.map((chat, index) => (
          <ChatBubble key={index} chat={chat} likeChat={likeChat} />
        ))}
      </div>
    </div>
  );
};
