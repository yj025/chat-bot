import { FC, useEffect, useRef, useState } from "react";
import { useRecorder } from "./useRecorder";
import { init, processAudio } from "../stt/Stt";
import { MicModal } from "./MicModal";
import LoadingModal from "./LoadingModal";

interface Props {
  onSubmit: (content: string) => void;
}

export const InputBox: FC<Props> = ({ onSubmit }) => {
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const [canceled, setCanceled] = useState(false);

  const onRecordStop = async (audioUrl: string) => {
    if (!canceled) {
      setProcessing(true);
      // const { processAudio } = await import("../stt/Stt");
      const result = await processAudio(audioUrl);
      const input = inputRef.current;
      if (input) {
        input.value = result;
      }
      setProcessing(false);
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const [, startRecord, stopRecord] = useRecorder(onRecordStop);
  const submitInput = () => {
    const current = inputRef.current;
    if (current) {
      onSubmit(current.value);
      current.value = "";
    }
  };

  const [showMicPopup, setShowMicPopup] = useState(false);

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
        onClick={() => {
          setShowMicPopup(true);
          startRecord();
        }}
      >
        mic
      </button>
      <button
        className="ml-2 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        onClick={submitInput}
      >
        submit
      </button>
      <MicModal
        content="Listening...please press button to complete"
        confirm="Complete"
        show={showMicPopup}
        onClose={() => setShowMicPopup(false)}
        onConfirm={() => {
          setCanceled(false);
          stopRecord();
        }}
        onCancel={() => {
          setCanceled(true);
          stopRecord();
        }}
      />
      <LoadingModal show={processing} text="Processing STT..." />
    </div>
  );
};
