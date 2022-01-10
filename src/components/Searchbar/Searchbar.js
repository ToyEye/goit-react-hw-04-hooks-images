import React, { Component } from 'react';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { ImSearch } from 'react-icons/im';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  state = {
    value: '',
  };

  hadldeChange = evt => {
    const searchValue = evt.target.value;
    this.setState({ value: searchValue });
  };

  handleSubmit = evt => {
    const { value } = this.state;
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
    this.props.onSubmit(this.state);
    this.setState({ value: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
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
            onChange={this.hadldeChange}
            value={this.state.value}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
