import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [article, setArticle] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [status, setStatus] = useState(true);

  const updateNews = async () => {
    props.setProgress(0);
    // setLoading(true);

    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    try {
      let data = await fetch(url);
      let parsedData = await data.json();

      setArticle(parsedData.articles);
      setTotalArticles(parsedData.totalResults);
      setStatus(true);
    } catch (error) {
      setStatus(false);
    } finally {
      // setLoading(false);
    }

    props.setProgress(100);
  };

  useEffect(() => {
    return () => {
      updateNews();
    };
  });

  const fetchMoreData = async () => {
    props.setProgress(0);
    let pageNext = page + 1;

    setPage(pageNext);

    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticle(article.concat(parsedData.articles));
      setStatus(true);
    } catch (error) {
      console.log(error);
      setStatus(false);
    } finally {
      // setLoading(false);
    }

    props.setProgress(100);
  };

  let i = 1;
  let defaultImageUrl =
    "https://www.udayavani.com/wp-content/uploads/2022/07/galaxy-620x361.jpg";

  return (
    <div className="my-2">
      <div
        className="text-center"
        style={{ margin: "20px 0px", marginTop: "70px" }}
      >
        <h4>Top Headlines</h4>
      </div>
      {!status && (
        <InfiniteScroll
          dataLength={article.length}
          next={fetchMoreData}
          //To put endMessage and loader to the top.

          hasMore={article.length <= totalArticles}
          loader={<Loading />}
          scrollableTarget="scrollableDiv"
        >
          <div className="row my-3">
            {status ? (
              article.map((element) => {
                return (
                  <div className="container col-md-4" key={i++}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageUrl={
                        !element.urlToImage
                          ? defaultImageUrl
                          : element.urlToImage
                      }
                      newsUrl={element.url ? element.url : ""}
                      author={element.author ? element.author : ""}
                    />
                  </div>
                );
              })
            ) : (
              <h6>
                You have made too many requests recently. Developer accounts are
                limited to 100 requests over a 24 hour period (50 requests
                available every 12 hours). Please upgrade to a paid plan if you
                need more requests.
              </h6>
            )}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

News.defaultProps = {
  country: "in",
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
};

export default News;
