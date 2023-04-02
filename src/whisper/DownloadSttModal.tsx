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
      <Modal.Header>Download Whisper model</Modal.Header>
      <Modal.Body>
        <div className="flex items-center justify-between">
          <span>ggml-tiny.en.bin</span>
          <Button onClick={download}>Download</Button>
        </div>
        {downloading && (
          <Progress className="mt-4" progress={progress}></Progress>
        )}
      </Modal.Body>
    </Modal>
  );
};
