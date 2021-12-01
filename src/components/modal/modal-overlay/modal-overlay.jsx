import React from 'react';
import modalOverlayStyle from './modal-overlay.module.css';
import { modalOverlayPropTypes } from 'utils/type';

function ModalOverlay(props) {
  return (
    <div onClick={props.onClick} className={`${modalOverlayStyle.overlay}`}>
      {props.children}
    </div>
  );
}
ModalOverlay.propTypes = modalOverlayPropTypes.isRequired;
export default ModalOverlay;
