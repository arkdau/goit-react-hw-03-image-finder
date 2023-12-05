import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import { Component } from "react";
import css from "./ImageGallery.module.css";
// import * as basicLightbox from "basiclightbox";

class ImageGallery extends Component {
  handleOnClick = ((evt) => {
    evt.preventDefault();

    const elem = evt.target;
    const src = elem.currentSrc;
    console.log("src: ", src);

    if (elem.tagName === "IMG") {
      // create modal
      // const instance = basicLightbox.create(`
      //   <div class="overlay">
      //     <div class="modal">
      //       <img src=${src} width="1280" height=auto>
      //     </div>
      //   </div>
      // `);
      // instance.show();
      this.props.selectImage(src);
      this.props.showModal();
    }
  });
  render() {
    return (
      <ul className={css.ImageGallery} onClick={this.handleOnClick}>
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
