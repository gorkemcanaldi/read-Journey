import React, { useEffect } from "react";
import style from "./Modal.module.css";

function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return (
    <div onClick={onClose} className={style.modal_overlay}>
      <div onClick={(e) => e.stopPropagation()} className={style.modal_content}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
