import { Tooltip } from "flowbite-react";
import { FC } from "react";
import { Chat } from "./ChatModel";
import Image from "next/image";

interface Props {
  chat: Chat;
  likeChat: (id: string, like: boolean) => void;
}

export const ChatBubbleServer: FC<Props> = ({ chat, likeChat }) => {
  const like = !!chat.like;
  return (
    <>
      <Tooltip
        trigger="click"
        content={
          <div
            className="flex items-center justify-center gap-2"
            onClick={() => likeChat(chat.id ?? "", !like)}
          >
            <Image
              priority
              src={like ? "/dislike.png" : "/like.png"}
              height={24}
              width={24}
              alt={like ? "Like it" : "Unlike it"}
            />
            <span>{like ? "Unlike it!" : "Like it!"}</span>
          </div>
        }
        placement="bottom-start"
        style="light"
        theme={{
          target: "w-fit self-start",
        }}
      >
        <p className="m-1 self-start rounded-md bg-orange-100 p-2">
          <span>
            {chat.message}
            {chat?.like && (
              <Image
                priority
                src="/like.png"
                height={24}
                width={24}
                alt="Like it"
              />
            )}
          </span>
        </p>
      </Tooltip>
    </>
  );
};
