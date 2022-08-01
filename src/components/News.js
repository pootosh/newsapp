import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from 'prop-types';


export class News extends Component {

static defaultProps = {
  country:"in",
  category:"general",

}

static propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
}

  constructor() {
    super();
    this.state = {
      article: [],
      loading: false,
      page: 1,
    };
  }

  async updateOnClick(){
    this.setState({ loading: true });
    
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1a304df361ae45e08b7c4510e1c8e342&page=${
      this.state.page
    }&pageSize=${this.props.pageSize}`;
    
    let data = await fetch(url);
   
    let parsedData = await data.json();
    
    await this.setState({
      article: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    // this.setState({ loading: true, page: 1 });
    // console.log("Component Mounted ",this.state.page)
    // let url =
    //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1a304df361ae45e08b7c4510e1c8e342&page=${this.state.page}`;
    // let data = await fetch(url);
    // console.log("After fetch ",this.state.page)
    // let parsedData = await data.json();
    // let newsItemPerPage = parsedData.articles.length;
    // this.setState({
    //   article: parsedData.articles,
    //   noOfPages: Math.ceil(parsedData.totalResults / newsItemPerPage),
    //   loading: false,
    // });

      
    this.updateOnClick();
  }
  
  

  handleOnClickPrevious = async () => {
    // this.setState({ loading: true });
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1a304df361ae45e08b7c4510e1c8e342&page=${
    //   this.state.page - 1
    // }`;
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //   page: this.state.page - 1,
    //   article: parsedData.articles,
    //   loading: false,
    // });
    let pagePrev =  this.state.page-1;
    await this.setState({page : pagePrev});
    
    this.updateOnClick()
  };

  handleOnClickNext = async () => {
    // this.setState({ loading: true });
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1a304df361ae45e08b7c4510e1c8e342&page=${
    //   this.state.page + 1
    // }`;
    // let data = await fetch(url);
    // let parsedData = await data.json();

    // this.setState({
    //   page: this.state.page + 1,
    //   article: parsedData.articles,
    //   loading: false,
    // });
    let pageNext = this.state.page+1;
    await this.setState({page : pageNext});
    this.updateOnClick()
  };

  i = 1;
  defaultImageUrl = "https://www.udayavani.com/wp-content/uploads/2022/07/galaxy-620x361.jpg"
  render() {
    return (
      <div className="container my-2">
        <div className="text-center" style={{margin:"20px 0px"}}>
        <h4>Top Headlines</h4>
        </div>
        
        {this.state.loading && <Loading />}

        <div className="row my-3">
          {!this.state.loading && this.state.article.map((element) => {
            return (
              <div className="col-md-4" key={this.i++}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={
                    !element.urlToImage
                      ? this.defaultImageUrl
                      : element.urlToImage
                  }
                  newsUrl={element.url ? element.url : ""}
                  author = {element.author?element.author : ""}
                />
              </div>
            );
          })}
          <div className="d-flex justify-content-between">
            <div className="p-2">
              <button
                disabled={this.state.page <= 1}
                onClick={this.handleOnClickPrevious}
                type="button"
                className="btn btn-info"
              >
                &larr; Previous
              </button>
            </div>

            <div className="p-2">
              <button
                type="button"
                disabled={this.state.page === Math.floor(this.state.totalArticles/this.props.pageSize) }
                onClick={this.handleOnClickNext}
                className="btn btn-info"
              >
                
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
