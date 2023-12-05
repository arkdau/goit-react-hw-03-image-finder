import React, { Component } from "react";
// import PropTypes from "prop-types";
import css from "./Modal.module.css";

// class Modal extends Component {
//   render() {
//     return (
//       <div class="overlay">
//         <div class="modal">
//           <img src="" alt="" />
//         </div>
//       </div>
//     );
//   }
// }

// export default Modal;

class Modal extends Component {
  constructor(props) {
    super(props);
    this.devReference = React.createRef();
  }

  showHideClassName;

  componentDidMount() {
    this.devReference.current.focus();
    // this.devReference.current.addEventListener("keydown", this.props.escspe);
  }

  componentDidUpdate() {
    this.devReference.current.focus();
  }

  render() {
    this.showHideClassName = this.props.show ? "modal" : "display-none";
    return (
      <div
        ref={this.devReference}
        className={css[this.showHideClassName]}
        onClick={this.props.handleClose}
        tabIndex={0}
        onKeyDown={this.props.escape}
      >
        <section className={css["modal-main"]}>
          {this.props.children}
        </section>
      </div>
    );
  }
}

// const Modal = ({ handleClose, show, children, escape, }) => {
//   const showHideClassName = show ? "modal" : "display-none";
//   console.log('show: ', showHideClassName);
//   return (
//     <div className={css[showHideClassName]} onClick={handleClose} tabIndex={0} onKeyDown={escape} autofocus >
//       <section className={css["modal-main"]}>
//         {children}
//         {/*<button type="button" onClick={handleClose}>
//           Close
//         </button>*/}
//       </section>
//     </div>
//   );
// };

export default Modal;
