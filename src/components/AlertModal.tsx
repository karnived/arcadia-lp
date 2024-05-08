import { Modal, ModalBody, ModalContent, ModalProps } from "@nextui-org/modal";

import SuccessImage from "../assets/images/success.png";
import ErrorImage from "../assets/images/error.png";
import { useMemo } from "react";
import { cn } from "@nextui-org/system";

type AlertModalProps = Omit<ModalProps, "children"> & {
  type: "error" | "success";
  title?: string;
  description: string;
};

const AlertModal = ({
  isOpen,
  onOpenChange,
  type,
  title,
  description,
}: AlertModalProps) => {
  const isError = useMemo(() => type === "error", [type]);

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
          <img
            src={isError ? ErrorImage : SuccessImage}
            className="w-[110px]"
          />
          <div className="text-center">
            <h3
              className={cn("text-[22px] font-bold  mb-[25px]", {
                "text-[#FF5151]": isError,
                "text-[#EAA5F2]": !isError,
              })}
            >
              {title ? title : isError ? "Something went wrong" : "Great!"}
            </h3>
            <p>{description}</p>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AlertModal;
