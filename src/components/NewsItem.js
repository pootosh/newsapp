const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author } = props;
  return (
    <div>
      <div className="card my-3 mx-auto" style={{ width: "18rem" }}>
        <img
          src={imageUrl}
          className="card-img-top"
          alt="..."
          style={{ height: "150px" }}
        />
        <div className="card-body">
          <h5 className="card-title" style={{ height: "80px" }}>
            {title.slice(0, 50)}...
          </h5>
          <p className="card-text">{description.slice(0, 100)}...</p>
          <p className="card-text">
            {author.length > 0 ? (
              <small className="text-muted">By {author}</small>
            ) : (
              ""
            )}
          </p>

          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-primary"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
