import {render, screen} from "@testing-library/react";
import {ChatBubble} from "../ChatBubble";
import {ChatSource} from "../ChatModel";

describe('test Bubble', function () {
    it('should render Bubble', function () {
        render(<ChatBubble chat={{from: ChatSource.SENDER, message: "biu biu"}}/>)
        expect(screen.getByText("biu biu")).toBeInTheDocument()
    });
});