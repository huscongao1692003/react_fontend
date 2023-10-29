
import React from "react";
import Breadcrumb from "../bredcrumb/breadcrumb";
import MyOrderLists from "./my-order-list-area";

const MyOrderList = () => {
  return (
    <>
      <Breadcrumb title="My Order List" subtitle="My Order List" isDbbl="Order" />
      <MyOrderLists />
      
    </>
  );
};

export default MyOrderList;
