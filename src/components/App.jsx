import { Component } from "react";
import css from "./styles.css";
import fetchGetAllItems from "./services/PixabayAPI";
import SearchBar from "./SearchBar/SearchBar";
import Images from "./ImageGallery/Images";
import Loader from "./Loader/Loader";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";

const DEFAULT_QUERY = "";

class App extends Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.getPage = this.getPage.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.selectImage = this.selectImage.bind(this);
    this.escspePress = this.escspePress.bind(this);
    this.Submit = this.Submit.bind(this);
  }

  state = {
    images: [],
    isLoading: false,
    errorMsg: "",
    totalHits: 0,
    totalPage: 0,
    page: 0,
    query: "",
    show: false,
    imageSelect: "",
  };

  setTotalPage(totalHits) {
    const totalPage = Math.ceil(totalHits / 12);
    return totalPage;
  }

  nextPage() {
    let pageTemp = this.state.page;
    if (this.state.page < this.state.totalPage) {
      pageTemp += 1;
    } else {
      pageTemp = 1;
    }
    this.setState({
      page: pageTemp,
    });
    return pageTemp;
  }

  getTotalPage() {
    return this.setTotalPage(this.state.totalHits);
  }
  getPage() {
    return this.state.page;
  }

  componentDidMount() {
    this.fetchData(DEFAULT_QUERY);
  }

  componentWillUnmount() {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.page !== prevState.page) {
      this.fetchData(this.state.query, this.state.page);
    }
    // console.log("selectImage: ", this.state.imageSelect);
  }

  async fetchData(q, page) {
    try {
      this.setState({
        isLoading: true,
        // images: [],
        errorMsg: "",
        page: page,
        query: q,
      });
      const images = await fetchGetAllItems(q, page);
      // console.log("images: ", images);

      if (page === undefined || page === 1) {
        this.setState({
          images: [],
        });
      }
      let imageSum = [];
      if (page === 1) {
        imageSum = images.hits;
      } else {
        imageSum = [...this.state.images, ...images.hits];
      }
      let maxPages = this.setTotalPage(images.totalHits);
      this.setState({
        images: imageSum,
        totalHits: images.totalHits,
        totalPage: maxPages,
      });
    } catch (err) {
      console.error(err.message);
      this.setState({
        errorMsg: err.message,
      });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  selectImage = (src) => {
    this.setState({
      imageSelect: src,
    });
  };

  // Close modal window
  escspePress(e) {
    e.preventDefault();
    if (e.key === "Escape") {
      this.hideModal();
      this.selectImage("");
    }
  }

  Submit(q, page) {
    // this.fetchData();
    this.setState({
      query: q,
      page: page,
    });
  }

  render() {
    return (
      <div className="App">
        <SearchBar onSubmit={this.Submit} />
        {this.state.isLoading && <Loader />}
        {this.state.errorMsg && (
          <div className="error">{this.state.errorMsg}</div>
        )}
        <Modal
          show={this.state.show}
          handleClose={this.hideModal}
          escape={this.escspePress}
        >
          <div className={css.Overlay}>
            <div className={css.Modal}>
              <img
                src={this.state.imageSelect}
                alt=""
              />
            </div>
          </div>
        </Modal>
        {!this.state.errorMsg && (
          <Images
            data={this.state.images}
            selectImage={this.selectImage}
            showModal={this.showModal}
          />
        )}
        {(this.state.totalPage > 1) &&
          (
            <Button
              next={this.nextPage}
            />
          )}
      </div>
    );
  }
}

export default App;
