import React from 'react';
import modalOverlayStyle from './modal-overlay.module.css';
import { modalOverlayPropTypes } from 'utils/type';

function ModalOverlay({onClick, children}) {
  return (
    <div onClick={onClick} className={`${modalOverlayStyle.overlay}`}>
      {children}
    </div>
  );
}
ModalOverlay.propTypes = modalOverlayPropTypes.isRequired;
export default ModalOverlay;
