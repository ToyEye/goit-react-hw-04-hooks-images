import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import LoaderSimbol from './components/Loader';
import Modal from './components/Modal';
import toast, { Toaster } from 'react-hot-toast';
import getImages from './serviceApi/api';

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    if (search === '') {
      return;
    }

    const fetchData = async () => {
      setPage(1);
      await getImages(search, 1).then(data => {
        if (data.total < 1) {
          toast.error('По вашему запросу ничего не найдно, введите другой запрос', {
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
        setData(data.totalHits);
        setImages(data.hits);
        setPage(prevState => prevState + 1);
      });
    };
    fetchData();
  }, [search]);

  const onLoadMoreButton = () => {
    getImages(search, page).then(data => {
      setPage(prevState => prevState + 1);
      setImages(prevState => [...prevState, ...data.hits]);
    });
    handleScroll();
  };

  const handleScroll = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 500);
  };

  const onSubmitHandler = value => {
    setSearch(value);
  };

  const onLargeImgClick = largeImageURL => {
    setLargeImageURL(largeImageURL);
  };

  const onToggleModal = img => {
    setShowModal(prevState => !prevState);
    setLargeImageURL(img);
  };

  return (
    <div className="App">
      <Toaster />

      {showModal && (
        <Modal onCloseModal={onToggleModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
      <Searchbar onSubmit={onSubmitHandler} />
      {images.length < 1 ? (
        <LoaderSimbol />
      ) : (
        <ImageGallery
          images={images}
          onOpenModal={onToggleModal}
          onLargeImgClick={onLargeImgClick}
        />
      )}
      {data > 12 && <Button name={'Load more'} onLoadMoreButton={onLoadMoreButton} />}
    </div>
  );
}
App.propTypes = {
  largeImageURL: PropTypes.string,
  search: PropTypes.string,
};
