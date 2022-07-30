import React, { Component } from "react";

export class NewsItem extends Component {
  render() {

    let {title, description, imageUrl, newsUrl} = this.props;
    return (
      <div>
        <div className="card my-3" style={{width: "18rem"}}>
          <img src={imageUrl} className="card-img-top" alt="..." style={{height: "150px"}} />
          <div className="card-body">
            <h5 className="card-title" style={{height: "80px"}}>{title.slice(0, 50)}...</h5>
            <p className="card-text">
              {description.slice(0, 100)}...
            </p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
              Read Mode
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
