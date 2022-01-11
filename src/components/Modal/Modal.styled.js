import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onCloseModal, children }) {
  useEffect(() => {
    window.addEventListener('keydown', onCloseModalClick);
    return () => {
      window.removeEventListener('keydown', onCloseModalClick);
    };
  });

  const onCloseModalClick = evt => {
    if (evt.code === 'Escape') {
      onCloseModal();
    }
  };

  const onBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      onCloseModal();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={onBackdropClick}>
      <div className={s.Modal}>{children}</div>
    </div>,
    modalRoot,
  );
}
Modal.propTypes = {
  onCloseModal: PropTypes.func,
  children: PropTypes.element.isRequired,
};
