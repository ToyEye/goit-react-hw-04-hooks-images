import React, { useEffect, MouseEvent } from 'react';

import s from './Modal.module.css';

// const modalRoot = document.querySelector('#modal-root');

type Props = {
  children: React.ReactNode;
  onCloseModal: () => void;
};

const Modal = ({ onCloseModal, children }: Props) => {
  useEffect(() => {
    const onCloseModalClick = (evt: KeyboardEvent) => {
      if ((evt as KeyboardEvent).code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', onCloseModalClick);
    return () => {
      window.removeEventListener('keydown', onCloseModalClick);
    };
  }, [onCloseModal]);

  const onBackdropClick = (evt: MouseEvent) => {
    if (evt.target === evt.currentTarget) {
      onCloseModal();
    }
  };

  return (
    <div className={s.Overlay} onClick={onBackdropClick}>
      <div className={s.Modal}>{children}</div>
    </div>
  );
};

export default Modal;
