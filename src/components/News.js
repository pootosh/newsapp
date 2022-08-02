import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  };

  constructor(props) {
    
    super();
    
    this.state = {
      article: [],
      loading: false,
      page: 1,
      
    };
    
  }

  async updateNews() {
    this.props.setProgress(0)
    this.setState({ loading: true });

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1a304df361ae45e08b7c4510e1c8e342&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    await this.setState({
      article: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100)
  }

  async componentDidMount() {
    this.updateNews();
  }


  fetchMoreData = async () => {
    this.props.setProgress(0)
    let pageNext = this.state.page + 1;
    this.setState({ page: pageNext });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1a304df361ae45e08b7c4510e1c8e342&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    await this.setState({
      article: this.state.article.concat(parsedData.articles),
      totalArticles: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100)
  };

  i = 1;
  defaultImageUrl =
    "https://www.udayavani.com/wp-content/uploads/2022/07/galaxy-620x361.jpg";
  render() {
    return (
      <div className="my-2">
        <div className="text-center" style={{ margin: "20px 0px" }}>
          <h4>Top Headlines</h4>
        </div>

        <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          //To put endMessage and loader to the top.
          
          hasMore={this.state.article.length <= this.state.totalArticles}
          loader={<Loading />}
          scrollableTarget="scrollableDiv"
        >
          <div className="row my-3">
            {this.state.article.map((element) => {
              return (
                <div className="container col-md-4" key={this.i++}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={
                      !element.urlToImage
                        ? this.defaultImageUrl
                        : element.urlToImage
                    }
                    newsUrl={element.url ? element.url : ""}
                    author={element.author ? element.author : ""}
                  />
                </div>
              );
            })}
            
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
