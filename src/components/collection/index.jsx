import React from "react";
import Breadcrumb from "../bredcrumb/breadcrumb";
import Collection from "./collection"

const index = () => {
  return (
    <>
      <Breadcrumb  title="My Collection" subtitle="collection" />
      <Collection />
      
    </>
  );
};

export default index;