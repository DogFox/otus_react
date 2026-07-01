import React, { type FC, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import './modal.css';

export interface ModalProps {
  visible: boolean;
  children: ReactNode;
  title?: string;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = ({
  visible,
  children,
  title,
  onClose,
}) => {
  if (!visible) {
    return null;
  }

  return createPortal(
    <div className="modal__overlay" onClick={onClose}>
      <div
        className={`modal__dialog modal__dialog--card`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
        >
          ×
        </button>

        {title && <h2 className="modal__title">{title}</h2>}

        <div className={`modal__content modal__content--card`}>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};