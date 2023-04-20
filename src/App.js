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
  const [showLoader, setShowLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [data, setData] = useState(0);

  useEffect(() => {
    if (search === '') {
      return;
    }

    const fetchData = async () => {
      setShowLoader(true);

      await getImages(search, page).then(data => {
        setShowLoader(true);

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
          setShowLoader(false);
          return;
        }

        setData(data.totalHits);
        setImages(prevState => [...prevState, ...data.hits]);
        setShowLoader(false);
      });
    };
    fetchData();
  }, [page, search]);

  const onLoadMoreButton = () => {
    setPage(prevState => prevState + 1);
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
      {showLoader ? (
        <LoaderSimbol />
      ) : (
        <ImageGallery
          images={images}
          onOpenModal={onToggleModal}
          onLargeImgClick={onLargeImgClick}
        />
      )}
      {!showLoader && images.length !== data && (
        <Button name={'Load more'} onLoadMoreButton={onLoadMoreButton} />
      )}
    </div>
  );
}
App.propTypes = {
  largeImageURL: PropTypes.string,
  search: PropTypes.string,
};
