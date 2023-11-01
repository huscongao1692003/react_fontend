import React from "react";

const OrderNotFound = () => {
  return (
    <>
      <div className="notification">
        <div className="content">
          <h5>No Order Found</h5>
          <p>
            There are no Order now. Please purchars course to see order here!!!
          </p>
        </div>
        <div className="image">
          <img src="../../../assets/img/icon/not-found-content.png" alt="" />
        </div>
      </div>
    </>
  );
};

export default OrderNotFound;
