import { Button, Modal } from "flowbite-react";
import React from "react";

interface Props {
  show: boolean;
  confirm: string;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export const MicModal = (props: Props) => {
  const { show, onClose, onConfirm, onCancel, confirm } = props;
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
      <Modal.Header/>
      <Modal.Body>
          <div className="flex items-center gap-3">
            <div>
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
              </span>
            </div>

            <h3 className="text-lg font-normal text-gray-600 dark:text-gray-400">
              Listening...
            </h3>
          </div>
          <p className=" textbase leading-tight text-gray-400 mt-2">
          Please press complete button to convert speech to text
          </p>
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
      </Modal.Body>
    </Modal>
  );
};
