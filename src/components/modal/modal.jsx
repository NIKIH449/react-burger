import { React, useEffect } from 'react';
import modalStyle from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay/modal-overlay';
import { createPortal } from 'react-dom';
import { modalPropTypes } from 'utils/type';

function Modal({ onClose, title, children }) {
  useEffect(() => {
    function onEscClose(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', onEscClose);
    return () => window.removeEventListener('keydown', onEscClose);
  }, [onClose]);
  return createPortal(
    <ModalOverlay onClick={onClose}>
      <div className={modalStyle.modal} onClick={(e) => e.stopPropagation()}>
        {title && (
          <h2 className={'pb-4 ml-10 pt-15 text text_type_main-large'}>
            {title}
          </h2>
        )}
        {children}
        <button className={`${modalStyle.button}`} onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
    </ModalOverlay>,
    document.getElementById('root')
  );
}
Modal.propTypes = modalPropTypes.isRequired;
export default Modal;
