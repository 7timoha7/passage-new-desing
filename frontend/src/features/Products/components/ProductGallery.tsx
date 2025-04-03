import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { apiURL } from '../../../constants';
import './BtnClose.css';
import './ProductGallery.css';

interface Props {
  images: string[];
}

const ProductGallery: React.FC<Props> = ({ images }) => {
  const galleryImages = images.map((image) => ({
    original: apiURL + '/' + image,
    thumbnail: apiURL + '/' + image,
    originalHeight: 600,
    originalWidth: 600,
    thumbnailHeight: 50, // Фиксированная высота миниатюры
    thumbnailWidth: 50, // Фиксированная ширина миниатюры
  }));

  const handleScreenChange = (isFullScreen: boolean) => {
    if (isFullScreen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      galleryRef.current?.exitFullScreen();
    }
  };

  const galleryRef = React.useRef<ImageGallery>(null);

  return (
    <ImageGallery
      ref={galleryRef}
      items={galleryImages}
      onScreenChange={handleScreenChange}
      onClick={() => galleryRef.current?.fullScreen()}
      lazyLoad={true}
      renderFullscreenButton={(onClick, isFullscreen) =>
        isFullscreen ? (
          <div
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
            }}
          >
            <button className="button" onClick={() => galleryRef.current?.exitFullScreen()}>
              <span className="X"></span>
              <span className="Y"></span>
              <div className="close">Close</div>
            </button>
          </div>
        ) : null
      }
    />
  );
};

export default ProductGallery;
