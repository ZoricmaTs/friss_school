import {type CSSProperties, type ReactNode, useEffect} from 'react';
import './style.scss';
import {XIcon} from '@phosphor-icons/react';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string,
  modalContentStyle?: CSSProperties,
  modalWrapperStyle?: CSSProperties,
};

export function Modal({ open, onClose, children, title, modalContentStyle, modalWrapperStyle}: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handler);

    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
    >
      <div className={'modal-wrapper'} style={modalWrapperStyle ? modalWrapperStyle : {}}>
        <div
          className="modal-content"
          style={modalContentStyle ? modalContentStyle : {}}
          onClick={(e) => e.stopPropagation()}
        >
          {title && <h2 className={'modal-header'}>{title}</h2>}
          {children}
        </div>
        <button className="modal-button"><XIcon size={32} /></button>
      </div>
    </div>
  );
}
