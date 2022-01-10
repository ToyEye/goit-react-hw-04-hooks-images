import React from 'react';
import s from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ name, onLoadMoreButton }) => (
  <button type="button" className={s.Button} onClick={() => onLoadMoreButton()}>
    {name}
  </button>
);

Button.propTypes = {
  name: PropTypes.string,
  onLoadMoreButton: PropTypes.func.isRequired,
};

export default Button;
