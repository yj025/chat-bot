import { Tooltip } from "flowbite-react";
import { FC } from "react";
import { Chat } from "./ChatModel";
import Image from "next/image";

interface Props {
  chat: Chat;
  mark: (id: string) => void;
}

export const ChatBubbleServer: FC<Props> = ({ chat, mark }) => {
  return (
    <>
      <Tooltip
        content={
          <div>
            <Image
              priority
              src="/like.svg"
              height={32}
              width={32}
              alt="Like it"
              onClick={() => mark(chat.id ?? "")}
            />
          </div>
        }
        placement="bottom"
        style="light"
        theme={{
          target: "w-fit self-start",
        }}
      >
        <p className={"m-1 self-start rounded-md bg-orange-100 p-2"}>
          {chat.message}
          {chat?.like && <Image
              priority
              src="/like.svg"
              height={32}
              width={32}
              alt="Like it"
            />}
        </p>
      </Tooltip>
    </>
  );
};
