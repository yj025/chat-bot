import { FC, useEffect, useRef } from "react";
import { useRecorder } from "./useRecorder";
import { useStt } from "../stt/useStt";

interface Props {
  onSubmit: (content: string) => void;
}

export const InputBox: FC<Props> = ({ onSubmit }) => {
  const { init, processAudio } = useStt(onSubmit);
  useEffect(() => {
    init();
  }, []);
  const onRecordStop = async (audioUrl: string) => {
    processAudio(audioUrl);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const [recording, startRecord, stopRecord] = useRecorder(onRecordStop);
  const submitInput = () => {
    const current = inputRef.current;
    if (current) {
      onSubmit(current.value);
      current.value = "";
    }
  };

  return (
    <div className=" flex flex-grow-0 items-center border-b border-gray-300 py-2">
      <input
        className="w-full flex-grow rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Type your message here..."
        ref={inputRef}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            submitInput();
          }
        }}
      />
      <button
        className="ml-2 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        onClick={recording ? stopRecord : startRecord}
      >
        mic
      </button>
      <button
        className="ml-2 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        onClick={submitInput}
      >
        submit
      </button>
    </div>
  );
};
