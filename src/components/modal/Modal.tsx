import { Modal as ModalFlowbite } from "flowbite-react";
import { FC, ReactNode } from "react";

type Props = {
    show: boolean,
    onModalClose: () => void,
    header?: string,
    children: ReactNode,
}

export const Modal: FC<Props> = ({show, onModalClose, header, children}) => {
  return(
    <ModalFlowbite show={show} onClose={onModalClose}>
      <ModalFlowbite.Header>{header}</ModalFlowbite.Header>
      <ModalFlowbite.Body>
        {children}
      </ModalFlowbite.Body>
    </ModalFlowbite>
  );
};
