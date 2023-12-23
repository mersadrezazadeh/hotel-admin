import {
  useState,
  createContext,
  useContext,
  cloneElement,
  forwardRef,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";

import { useOutsideClick } from "../hooks/useOutsideClick";

const ModalContext = createContext();

function Overlay({ children }) {
  return (
    <div className="fixed left-0 top-0 z-50 h-screen w-full backdrop-blur transition-all duration-500">
      {children}
    </div>
  );
}

const Modal = forwardRef(function Modal({ styles, children }, ref) {
  const [openName, setOpenName] = useState("X");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      <div ref={ref} className={styles}>
        {children}
      </div>
    </ModalContext.Provider>
  );
});

function Open({ opens: opensWindowName, children }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => open(opensWindowName),
  });
}

function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="absolute left-2 top-2 translate-x-2 rounded p-1 transition-all duration-200 hover:text-gray-100 dark:hover:text-gray-800 [&>svg]:h-6 [&>svg]:w-6 [&>svg]:text-gray-500 [&>svg]:dark:text-gray-400"
    >
      {children}
    </button>
  );
}

function Window({ name, children }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <Modal
        ref={ref}
        styles="fixed bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 rounded-lg bg-gray-0 px-5 sm:px-10 py-8 shadow-2xl transition-all duration-500 dark:bg-gray-850 max-h-screen"
      >
        <Button onClick={close}>
          <HiXMark />
        </Button>

        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </Modal>
    </Overlay>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
