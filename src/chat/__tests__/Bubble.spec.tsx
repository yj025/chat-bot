import {render, screen} from "@testing-library/react";
import {Bubble} from "../Bubble";

describe('test Bubble', function () {
    it('should render Bubble', function () {
        render(<Bubble content={"biu biu"}/>)
        expect(screen.getByText("biu biu")).toBeInTheDocument()
    });
});