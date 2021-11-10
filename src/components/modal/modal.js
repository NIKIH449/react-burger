import React from 'react';
import modalStyle from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay/modal-overlay';
import { createPortal } from 'react-dom';
import { modalPropTypes } from '../../utils/type';

function Modal(props) {
  React.useEffect(() => {
    function onEscClose(e) {
      if (e.key === 'Escape') {
        props.onClose();
      }
    }
    window.addEventListener('keydown', onEscClose);
    return () => window.removeEventListener('keydown', onEscClose);
  }, []);

  return createPortal(
    <ModalOverlay onClick={props.onClose}>
      <div className={modalStyle.popup} onClick={(e) => e.stopPropagation()}>
        {props.title ? (
          <h2 className={'pb-4 ml-10 pt-15 text text_type_main-large'}>
            {props.title}
          </h2>
        ) : (
          ''
        )}
        {props.children}
        <button className={`${modalStyle.button}`} onClick={props.onClose}>
          <CloseIcon />
        </button>
      </div>
    </ModalOverlay>,
    document.getElementById('root')
  );
}
Modal.propTypes = modalPropTypes;
export default Modal;
