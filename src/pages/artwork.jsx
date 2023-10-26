import React from "react";
import SEO from "../common/seo";
import WrapperFour from "../layout/wrapper-4";
import Artwork from "../components/artwork";

const index = () => {
  return (
    <WrapperFour>
      <SEO pageTitle={"Artwork"} />
      <Artwork/>
    </WrapperFour>
  );
};

export default index;