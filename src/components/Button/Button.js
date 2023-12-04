import { Component } from "react";
import css from "./Button.module.css";

class Button extends Component {
  handleOnClick = (evt) => {
    evt.preventDefault();
    this.props.next();
  };
  render() {
    return (
      <div className={css.container}>
      <button className={css.Button} onClick={this.handleOnClick}>
        Load more
      </button>
      </div>
    );
  }
}

export default Button;
