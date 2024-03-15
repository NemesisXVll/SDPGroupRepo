import { Modal } from "flowbite-react";
import { useState } from "react";

type CaptchaProps = {
  modalVal: boolean;
  closeModal: () => void;
};

const Captcha = (props: CaptchaProps) => {

  const [openModal] = useState(props.modalVal);

  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClose={() => props.closeModal()}
        popup
      >
        
      </Modal>
    </>
  );
};

export default Captcha;
