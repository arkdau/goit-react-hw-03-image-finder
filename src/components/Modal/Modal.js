// import { Component } from "react";
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









const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal" : "display-none";
  console.log('show: ', showHideClassName);
  return (
    <div className={css[showHideClassName]} onClick={handleClose}>
      <section className={css["modal-main"]}>
        {children}
        {/*<button type="button" onClick={handleClose}>
          Close
        </button>*/}
      </section>
    </div>
  );
};

export default Modal;
