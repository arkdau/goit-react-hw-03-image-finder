import { Component } from "react";
import PropTypes from "prop-types";
import css from "./SearchBar.module.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleKeyUp(event) {
    if (event.code === "Enter") {
      this.props.onSubmit(event.target.value);
    }
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const searchText = form.elements.searchInput.value;
    // const number = form.elements.number.value;
    console.log("onSubmit: ", searchText);
    this.props.onSubmit(searchText);
    form.reset();
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button
            type="submit"
            className={css.SearchFormButton}
          >
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            name="searchInput"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
      // <input
      //   className={css.query}
      //   placeholder={this.props.placeholder}
      //   onKeyUp={this.handleKeyUp}
      // />
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
