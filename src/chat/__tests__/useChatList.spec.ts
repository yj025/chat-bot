import { renderHook } from "@testing-library/react";
import { useChatList } from "../useChatList";
import { Chat, ChatSource } from "../ChatModel";
import { act } from "react-dom/test-utils";

describe("test useChatList", () => {
  it("should marked as true when invoke mark", () => {
    const chats: Chat[] = [
      { id: "11", from: ChatSource.SERVER, message: "resp 111", like: false },
      { id: "22", from: ChatSource.SERVER, message: "resp 2222", like: false },

    ];
    const {result} =renderHook(() => useChatList(chats));
    act(()=>{
        result.current.markChat("22")
    })

    expect(result.current.chats[1].like).toBe(true)
  });
});
