import { Component } from "react";
import css from "./Button.module.css";

class Button extends Component {
  handleOnClick = (evt) => {
    evt.preventDefault();
    this.props.next();
  };
  render() {
    return (
      <button className={css.Button} onClick={this.handleOnClick}>
        Load more
      </button>
    );
  }
}

export default Button;
