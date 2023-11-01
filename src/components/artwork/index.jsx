import React from "react";
import Breadcrumb from "../bredcrumb/breadcrumb";
import Artwork from "./artwork"

const index = () => {
  return (
    <>
      <Breadcrumb  title="My Artwork" subtitle="artwork" />
      <Artwork />
      
    </>
  );
};

export default index;