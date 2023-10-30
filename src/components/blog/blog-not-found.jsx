import React from "react";

const BlogNotFound = () => {
  return (
    <>
      <div className="notification">
        <div className="content">
          <h5>No Posts Found</h5>
          <p>
            There are no posts that match your current filters. Try removing
            some of them to get better results.
          </p>
        </div>
        <div className="image">
          <img src="../../../assets/img/icon/not-found-content.png" alt="" />
        </div>
      </div>
    </>
  );
};

export default BlogNotFound;
