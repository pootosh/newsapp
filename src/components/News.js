import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  render() {
    return (
      <div className="container my-2">
        <h4>Top Headlines</h4>
        <div className="row my-3 align-items-center">
          <div className="col-md-4">
            <NewsItem title="My Title" description="My Description" />
          </div>

          <div className="col-md-4 ">
            <NewsItem title="My Title" description="My Description" />
          </div>

          <div className="col-md-4 ">
            <NewsItem title="My Title" description="My Description" />
          </div>
        </div>
      </div>
    );
  }
}

export default News;
