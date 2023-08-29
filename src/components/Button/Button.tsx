import React from 'react';
import s from './Button.module.css';

type Props = {
  name: string;
  onLoadMoreButton: () => void;
};

const Button = ({ name, onLoadMoreButton }: Props) => (
  <button type="button" className={s.Button} onClick={() => onLoadMoreButton()}>
    {name}
  </button>
);

export default Button;
