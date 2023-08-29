import s from './ImageGalleryItem.module.css';

type Props = {
  id: string;
  webformatURL: string;
  onLargeImgClick: (args: string) => void;
  largeImageURL: string;
};

const ImageGalleryItem = ({
  id,
  webformatURL,
  onLargeImgClick,
  largeImageURL,
}: Props) => (
  <li key={id} id={id} className={s.ImageGalleryItem}>
    <img
      className={s.ImageGalleryItem_image}
      src={webformatURL}
      alt=""
      onClick={() => onLargeImgClick(largeImageURL)}
    />
  </li>
);

export default ImageGalleryItem;
