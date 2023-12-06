import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import { Component } from "react";
import css from "./ImageGallery.module.css";
// import * as basicLightbox from "basiclightbox";

class ImageGallery extends Component {
  handleOnClick = ((evt) => {
    evt.preventDefault();

    const elem = evt.target;
    // const src = elem.currentSrc;
    const largeImageURL = elem.dataset.scr;
    // console.log('elem: ', elem);
    // console.log('largeImageURL: ', largeImageURL);

    if (elem.tagName === "IMG") {
      this.props.selectImage(largeImageURL);
      this.props.showModal();
    }
  });
  render() {
    return (
      <ul className={css.ImageGallery} onClick={this.handleOnClick}>
        <ImageGalleryItem
          data={this.props.data}
        />
      </ul>
    );
  }
}

export default ImageGallery;
