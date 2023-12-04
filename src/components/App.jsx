import { Component } from "react";
import fetchGetAllItems from "./services/PixabayAPI";
import SearchBar from "./SearchBar/SearchBar";
import Images from "./ImageGallery/Images";
import Loader from "./Loader/Loader";
import Button from "./Button/Button";

const DEFAULT_QUERY = "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.getPage = this.getPage.bind(this);
  }

  state = {
    images: [],
    isLoading: false,
    errorMsg: "",
    totalHits: 0,
    totalPage: 0,
    page: 0,
    query: "",
  };

  // setTotalHits(total) {
  //   // this.setState({
  //   //   totalHits: total,
  //   // });
  //   this.setTotalPage();
  // }
  setTotalPage(totalHits) {
    const totalPage = Math.ceil(totalHits / 12);
    return totalPage;
    // this.setState({
    //   totalPage: totalPage,
    // });
  }
  // nextPage() {
  //   if (this.state.page < this.state.tatalPage) {
  //     let page = this.state.page;
  //     this.setState({
  //       page: ++page,
  //     });
  //   } else {
  //     this.setState({
  //       page: 1,
  //     });
  //   }
  //   return this.state.page;
  // }

  // nextPage() {
  //   if (this.state.page < this.state.totalPage) {
  //     let page = this.state.page;
  //     this.setState({
  //       page: ++page,
  //     });
  //   } else {
  //     this.setState({
  //       page: 1,
  //     });
  //   }
  //   return this.state.page;
  // }

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

  // constructor(props) {
  //   super(props);
  //   this.fetchData = this.fetchData.bind(this);
  // }

  componentDidMount() {
    this.fetchData(DEFAULT_QUERY);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("App-componentDidUpdate page: ", this.state.page);
    if (this.state.page !== prevState.page) {
      this.fetchData(this.state.query, this.state.page);
    }
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

      // const totalPage = this.setTotalPage(images.totalHits)
      // const imageSum = images.hits.map((image) => {
      // return this.state.images.push(image);
      // });

      // this.state.images.push(images.hits);
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
      // let imageSum = this.state.images;
      // imageSum.push(images.hits);
      console.log("imageSum: ", imageSum);
      console.log("totalHits: ", images.totalHits);
      let maxPages = this.setTotalPage(images.totalHits);
      console.log("totalPage: ", maxPages);
      this.setState({
        images: imageSum,
        totalHits: images.totalHits,
        totalPage: maxPages,
      });
      // console.log(articles.hits);
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

  render() {
    return (
      <div className="App">
        
        <SearchBar onSubmit={this.fetchData} />
        {this.state.isLoading && <Loader />}
        {this.state.errorMsg && (
          <div className="error">{this.state.errorMsg}</div>
        )}
        {!this.state.errorMsg && <Images data={this.state.images} />}
        {
          <Button
            onClick={this.fetchData}
            next={this.nextPage}
            page={this.getPage}
            query={this.state.query}
          />
        }
      </div>
    );
  }
}

export default App;

// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
//     >
//       React homework template
//     </div>
//   );
// };
