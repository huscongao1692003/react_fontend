import React from "react";
import SEO from "../common/seo";
import WrapperFour from "../layout/wrapper-4";
import Collection from "../components/collection";
import Breadcrumb from "../components/bredcrumb/breadcrumb";

const index = () => {
  return (
    <WrapperFour>
      <SEO pageTitle={"Collection"} />
      <Collection/>
    </WrapperFour>
  );
};

export default index;