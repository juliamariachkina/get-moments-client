import { Modal as ModalFlowbite } from "flowbite-react";
import { FC, ReactNode } from "react";

export type ModalProps = {
    show: boolean,
    onModalClose: () => void,
    header?: string,
    children: ReactNode,
}

export const Modal: FC<ModalProps> = ({show, onModalClose, header, children}) => {
  return(
    <ModalFlowbite show={show} onClose={onModalClose}>
      <ModalFlowbite.Header>{header}</ModalFlowbite.Header>
      <ModalFlowbite.Body>
        {children}
      </ModalFlowbite.Body>
    </ModalFlowbite>
  );
};
