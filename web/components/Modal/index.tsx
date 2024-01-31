import { defaultModalSizeClassName } from "@/utils/static";
import React from "react";

type Props = {
  modalId?: string;
  modalSizeclassName?: string;
  children: React.ReactNode;
}

const modalClassName = "modal-box flex flex-col max-h-full grid-cols-4";

const Modal = React.forwardRef<HTMLDialogElement, Props>(function Modal({ modalId, modalSizeclassName, children }, ref) {
    return (
      <dialog ref={ref} id={modalId} className="modal">
        <div className={`${modalClassName} ${modalSizeclassName}`}>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          { children }
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    )
  }
);

Modal.defaultProps = {
  modalSizeclassName: defaultModalSizeClassName
}

export default Modal;
