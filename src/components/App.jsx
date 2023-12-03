import { Component } from "react";
import fetchGetAllItems from "./services/PixabayAPI";
import SearchBar from "./SearchBar/SearchBar";
import Images from "./ImageGallery/Images";
import Loader from "./Loader/Loader";

const DEFAULT_QUERY = "react";

class App extends Component {
  state = {
    images: [],
    isLoading: false,
    errorMsg: "",
  };

  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData(DEFAULT_QUERY);
  }

  async fetchData(q) {
    try {
      this.setState({
        isLoading: true,
        images: [],
        errorMsg: "",
      });
      // console.log(query);
      const images = await fetchGetAllItems(q);
      console.log("images: ", images.hits);
      this.setState({
        images: images.hits,
      });
      // console.log(articles.hits);
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
