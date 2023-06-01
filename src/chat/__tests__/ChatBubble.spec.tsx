import {render, screen} from "@testing-library/react";
import {ChatBubble} from "../ChatBubble";
import {ChatSource} from "../ChatModel";
import { likeChat } from "../../backend-proxy/api";

describe('test Bubble', function () {
    it('should render Bubble', function () {
        render(<ChatBubble chat={{from: ChatSource.SENDER, message: "biu biu"}} likeChat={likeChat}/>)
        expect(screen.getByText("biu biu")).toBeInTheDocument()
    });
});