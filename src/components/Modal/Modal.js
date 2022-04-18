import React from "react";
import "./Modal.css";

const Modal = ({ handleClose, show, children, text, style }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main" style={style}>
        {text == "log" && (
          <button className="button-close" onClick={handleClose}>
            x
          </button>
        )}
        {children}
      </section>
    </div>
  );
};

export default Modal;
