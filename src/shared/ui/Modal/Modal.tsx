import React, { type FC, type ReactNode } from 'react';
import './modal.css';

export interface ModalProps {
  visible: boolean;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = ({ visible, children }) => {
  if (!visible) return null;

  return (
    <div className="modal__overlay" role="presentation">
      <div className="modal__dialog" role="dialog" aria-modal="true">
        <button className="modal__close" type="button" aria-label="Закрыть" disabled>
          ×
        </button>
        <div className="modal__content">{children}</div>
      </div>
    </div>
  );
};

