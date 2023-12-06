import { Component } from "react";
import css from "./ImageGalleryItem.module.css";

class ImageGalleryItem extends Component {
  render() {
    // console.log("Item-data: ", this.props.data);
    return (
      this.props.data.map((image) => (
        <li key={image.id} className={css.ImageGalleryItem}>
          <img src={image.webformatURL} data-scr={image.largeImageURL} alt="" />
        </li>
      ))
    );
  }
}

export default ImageGalleryItem;
