import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import { Component } from "react";
import css from './ImageGallery.module.css'

class ImageGallery extends Component {
  render() {
    return (
      <ul className={css.ImageGallery}>
        {this.props.data.map((image) => (
          <ImageGalleryItem
            key={image.id}
            ImageURL={image.webformatURL}
            ImageLargeURL={image.largeImageURL}
          />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
