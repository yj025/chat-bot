import { Button, Modal, Progress } from "flowbite-react";
import React, { useState } from "react";
import { downloadFile } from "./downloadFile";
import { useDbTtsModel } from "./useDbTtsModel";

interface Props {
  show: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const modelUrl =
  "https://huggingface.co/datasets/ggerganov/whisper.cpp/resolve/main/ggml-tiny.en.bin";

export const DownloadSttModal = ({ show, onClose, onSuccess }: Props) => {
  const { saveModel } = useDbTtsModel();
  const [progress, setProgress] = useState(0);
  const [downloading, setDownloading] = useState(false);

  const download = async () => {
    setDownloading(true);
    const blob = await downloadFile(modelUrl, (progress) =>
      setProgress(Math.floor(progress * 100))
    );
    if (blob) {
      await saveModel(blob);
    } 
    onClose();
    onSuccess();
    setDownloading(false);
  };

  return (
    <Modal show={show} size="lg" onClose={onClose}>
      <Modal.Header>Whisper Model</Modal.Header>
      <Modal.Body>
        <p className=" text-lg leading-relaxed text-gray-700 dark:text-gray-400">
          Need to download the whisper model to recognize the speech.
        </p>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 mt-2">
          There are five model sizes(tiny,base,small,medium,large), four with
          English-only versions, offering speed and accuracy tradeoffs. Choose
          download tiny for speed concern.
        </p>
        <div className="mt-6 flex items-center justify-between">
          <span className=" text-base text-gray-700">ggml-tiny.en.bin</span>
          <Button onClick={download}>Download</Button>
        </div>
        {downloading && (
          <Progress
            className="mt-4"
            progress={progress}
            labelProgress={true}
            size="lg"
          ></Progress>
        )}
      </Modal.Body>
    </Modal>
  );
};
