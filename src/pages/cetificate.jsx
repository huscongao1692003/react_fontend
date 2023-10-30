import React from "react";
import SEO from "../common/seo";
import WrapperFour from "../layout/wrapper-4";
import Cetificate from "../components/cetificate";

const index = () => {
  return (
    <WrapperFour>
      <SEO pageTitle={"Cetificate"} />
      <Cetificate/>
    </WrapperFour>
  );
};

export default index;