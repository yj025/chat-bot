import { Modal, Spinner } from "flowbite-react";
import React from "react";

interface Props {
  show: boolean;
  text:string
}

const LoadingModal = (props: Props) => {
  const { show, text } = props;
  return (
    <Modal show={show} size="md" popup={true}>
      <Modal.Body>
        <div className="flex items-center gap-4 relative top-3">
          <Spinner aria-label="Spinner" size="lg" />
          <span>{text}</span>

        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoadingModal;
