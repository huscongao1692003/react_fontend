import React from "react";

const PostNotFound = () => {
  return (
    <>
      <div className="notification">
        <div className="content">
          <h5>No Post Found</h5>
          <p>
            There are no Post now. Create Some Post for yourself!!!
          </p>
        </div>
        <div className="image">
          <img src="../../../assets/img/icon/not-found-content.png" alt="" />
        </div>
      </div>
    </>
  );
};

export default PostNotFound;
