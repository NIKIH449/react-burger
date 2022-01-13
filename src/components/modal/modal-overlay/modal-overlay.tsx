import React, { FC, ReactNode } from 'react';
import modalOverlayStyle from './modal-overlay.module.css';

const ModalOverlay: FC<{ onClick: () => void; children: ReactNode }> = ({
  onClick,
  children,
}) => {
  return (
    <div onClick={onClick} className={`${modalOverlayStyle.overlay}`}>
      {children}
    </div>
  );
};
export { ModalOverlay };
