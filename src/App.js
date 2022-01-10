import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './index.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import LoaderSimbol from './components/Loader';
import Modal from './components/Modal';
import toast, { Toaster } from 'react-hot-toast';

axios.defaults.baseURL = 'https://pixabay.com/api';
const KEY = '24201171-f795c334c12b489d5c6645c6d';
const URI = `/?key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

class App extends Component {
  static propTypes = {
    largeImageURL: PropTypes.string,
    search: PropTypes.string,
  };
  state = {
    images: [],
    page: 1,
    search: '',
    showModal: false,
    largeImageURL: '',
  };

  async componentDidMount() {
    const response = await axios.get(`${URI}`);
    this.setState({ images: response.data.hits, page: 2 });
  }

  async componentDidUpdate(_, prevState) {
    const { search } = this.state;

    if (prevState.search !== search) {
      this.setState({ images: [], page: 1 });
      const response = await axios.get(`${URI}&q=${search}&page=1`);
      if (response.data.hits.length < 1) {
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
      this.setState(prevState => {
        return {
          images: response.data.hits,
          page: prevState.page + 1,
        };
      });
      return;
    }
  }

  onLoadMoreButton = async () => {
    const { page, search } = this.state;
    const response = await axios.get(`${URI}&q=${search}&page=${page}`);
    const newArray = response.data.hits;
    this.setState(prevState => {
      return {
        images: [...prevState.images, ...newArray],
        page: prevState.page + 1,
      };
    });

    this.handleScroll();
  };

  handleScroll = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 500);
  };
  onSubmitHandler = ({ value }) => {
    this.setState({ search: value });
  };

  onLargeImgClick = ({ largeImageURL }) => {
    this.setState({ largeImageURL: largeImageURL });
  };

  onToggleModal = img => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      largeImageURL: img,
    }));
  };
  render() {
    const { images, showModal, largeImageURL } = this.state;
    return (
      <div className="App">
        <Toaster />

        {showModal && (
          <Modal onCloseModal={this.onToggleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
        <Searchbar onSubmit={this.onSubmitHandler} />
        {images.length < 1 ? (
          <LoaderSimbol />
        ) : (
          <ImageGallery
            images={images}
            onOpenModal={this.onToggleModal}
            onLargeImgClick={this.onLargeImgClick}
          />
        )}
        {images.length > 1 && (
          <Button name={'Load more'} onLoadMoreButton={this.onLoadMoreButton} />
        )}
      </div>
    );
  }
}

export default App;
