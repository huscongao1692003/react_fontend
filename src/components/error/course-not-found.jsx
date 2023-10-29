import React from "react";

const CourseNotFound = () => {
  return (
    <>
      <div className="notification">
        <div className="content">
          <h5>No Course Found</h5>
          <p>
            There are no Course now. Please purchars course to see here!!!
          </p>
        </div>
        <div className="image">
          <img src="../../../assets/img/icon/not-found-content.png" alt="" />
        </div>
      </div>
    </>
  );
};

export default CourseNotFound;
