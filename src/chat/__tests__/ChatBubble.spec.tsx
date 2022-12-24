import {render, screen} from "@testing-library/react";
import {ChatBubble} from "../ChatBubble";
import {ChatSource} from "../Chats";

describe('test Bubble', function () {
    it('should render Bubble', function () {
        render(<ChatBubble chat={{from: ChatSource.SENDER, content: "biu biu"}}/>)
        expect(screen.getByText("biu biu")).toBeInTheDocument()
    });
});