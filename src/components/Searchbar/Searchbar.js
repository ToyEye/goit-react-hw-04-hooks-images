import React, { useState } from 'react';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { ImSearch } from 'react-icons/im';

export default function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const hadldeChange = evt => {
    setValue(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (value === '') {
      toast.error('Необходимо ввести запрос', {
        duration: 2000,
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          padding: '10px',
          textAlign: 'center',
        },
      });
      return;
    }
    onSubmit(value);
    setValue('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchForm__button}>
          <ImSearch />
          <span className={s.SearchForm__button__label}>Search</span>
        </button>

        <input
          className={s.SearchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={hadldeChange}
          value={value}
        />
      </form>
    </header>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
