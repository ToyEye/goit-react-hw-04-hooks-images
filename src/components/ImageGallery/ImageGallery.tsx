import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';

type TImages = {
  id: string;
  webformatURL: string;
  largeImageURL: string;
};

type Props = {
  images: TImages[];
  onLargeImgClick: (args: string) => void;
};

const ImageGallery = ({ images, onLargeImgClick }: Props) => (
  <ul className={s.ImageGallery}>
    {images.map(({ id, webformatURL, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        id={id}
        webformatURL={webformatURL}
        onLargeImgClick={onLargeImgClick}
        largeImageURL={largeImageURL}
      />
    ))}
  </ul>
);

export default ImageGallery;
