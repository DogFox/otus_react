import React, { type FC, type ReactNode } from 'react';
import './modal.css';

export interface ModalProps {
  visible: boolean;
  children: ReactNode;
  title?: string;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = ({ visible, children, title, onClose }) => {
  if (!visible) return null;

  return (
    <div className="modal__overlay" role="presentation" onClick={onClose}>
      <div
        className="modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__close" type="button" aria-label="Закрыть" onClick={onClose} disabled={!onClose}>
          ×
        </button>
        {title && <h2 className="modal__title">{title}</h2>}
        <div className="modal__content">{children}</div>
      </div>
    </div>
  );
};
