import {FC} from "react";

interface BubbleProps {
    content: string
}

export const Bubble: FC<BubbleProps> = ({content}) => {

    return <div>{content}</div>
}