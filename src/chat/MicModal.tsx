import { Button, Modal } from "flowbite-react";
import React from "react";

interface Props {
  show: boolean;
  content: string;
  confirm: string;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export const MicModal = (props: Props) => {
  const { show, onClose, onConfirm, onCancel, content, confirm } = props;
  return (
    <Modal
      show={show}
      size="md"
      popup={true}
      onClose={() => {
        onCancel();
        console.log("zoz onclose");
        
        onClose();
      }}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <div className="flex items-center gap-2">
            <div>
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
              </span>
            </div>

            <h3 className="text-lg font-normal text-gray-500 dark:text-gray-400">
              {content}
            </h3>
          </div>
          <div className="flex justify-center gap-4 mt-5">
            <Button
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {confirm}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
