import { Modal, ModalBody, ModalContent, ModalProps } from "@nextui-org/modal";

import SuccessImage from "../assets/images/error.png";

type ErrorModalProps = Omit<ModalProps, "children">;

const ErrorModal = ({ isOpen, onOpenChange }: ErrorModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="xs"
      placement="center"
      backdrop="blur"
    >
      <ModalContent className="bg-[linear-gradient(222.78deg, rgba(0, 0, 0, 0.252) -2.19%, rgba(0, 0, 0, 0.084) 104.72%)] border-1 border-[#7E3F88]">
        <ModalBody className="flex flex-col items-center px-6 py-5 gap-5">
          <img src={SuccessImage} className="w-[110px]" />
          <div className="text-center">
            <h3 className="text-[22px] font-bold text-[#FF5151] mb-[25px]">
              Algo salió mal
            </h3>
            <p>
              Tuvimos un error al cargar tu formulario.
              <br />
              Por favor registrate nuevamente
            </p>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ErrorModal;
