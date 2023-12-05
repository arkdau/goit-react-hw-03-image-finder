import { Component } from "react";
import fetchGetAllItems from "./services/PixabayAPI";
import SearchBar from "./SearchBar/SearchBar";
import Images from "./ImageGallery/Images";
import Loader from "./Loader/Loader";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";

const DEFAULT_QUERY = "react";

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
    // document.body.addEventListener("keydown", this.escspePress);
    // document.addEventListener('keydown', this.escspePress, false);
  }

  componentWillUnmount() {
    // document.removeEventListener('keydown', this.escspePress, false);
    // document.body.removeEventListener('keydown', this.escspePress);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("App-componentDidUpdate page: ", this.state.page);
    if (this.state.page !== prevState.page) {
      this.fetchData(this.state.query, this.state.page);
    }
    console.log("selectImage: ", this.state.imageSelect);
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
      console.log("query: ", q);
      console.log("page: ", page);
      const images = await fetchGetAllItems(q, page);
      console.log("images: ", images);

      if (page === undefined) {
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
      console.log("imageSum: ", imageSum);
      console.log("totalHits: ", images.totalHits);
      let maxPages = this.setTotalPage(images.totalHits);
      console.log("totalPage: ", maxPages);
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
      console.log("stat-query: ", this.state.query);
      console.log("state-page: ", this.state.page);
      console.log("state-images.hits: ", this.state.images);
      console.log("state-totalHits: ", this.state.totalHits);
      console.log("state-totalPage: ", this.state.totalPage);
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
      console.log(
        "event (keydown, escspePress) - listener was removed from body",
      );
    }
  }

  render() {
    return (
      <div className="App">
        <SearchBar onSubmit={this.fetchData} />
        {this.state.isLoading && <Loader />}
        {this.state.errorMsg && (
          <div className="error">{this.state.errorMsg}</div>
        )}
        <Modal
          show={this.state.show}
          handleClose={this.hideModal}
          escape={this.escspePress}
        >
          <div class="overlay">
            <div class="modal">
              <img
                src={this.state.imageSelect}
                alt=""
                width="800"
                height="auto"
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
              onClick={this.fetchData}
              next={this.nextPage}
              page={this.getPage}
              query={this.state.query}
            />
          )}
        {/*<button type="button" onClick={this.showModal}>Open</button>*/}
      </div>
    );
  }
}

export default App;
