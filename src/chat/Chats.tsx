import { FC, useEffect, useRef } from "react";
import { ChatBubble } from "./ChatBubble";
import { Chat } from "./ChatModel";

interface Props {
  chats: Chat[];
  mark: (id:string)=>void;

}


export const Chats: FC<Props> = ({ chats ,mark }) => {
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
          <ChatBubble key={index} chat={chat} mark={mark}/>
        ))}
      </div>
    </div>
  );
};
