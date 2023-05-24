import { FC } from "react";

interface Props {
  content: string;
}

export const ChatBubbleUser: FC<Props> = ({ content }) => {
  return <p className={"m-1 self-end rounded-md bg-lime-50 p-2"}>{content}</p>;
};
