import React from 'react';
import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ id, webformatURL, onOpenModal, largeImageURL }) => (
  <li key={id} id={id} className={s.ImageGalleryItem}>
    <img
      className={s.ImageGalleryItem_image}
      src={webformatURL}
      alt=""
      onClick={() => onOpenModal(largeImageURL)}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  webformatURL: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
