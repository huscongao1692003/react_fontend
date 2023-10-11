import React from "react";
import SEO from "../common/seo";
import WrapperFour from "../layout/wrapper-4";
import CreateCourse from "../components/create-course";

const index = () => {
  return (
    <WrapperFour>
      <SEO pageTitle={"create-course"} />
      <CreateCourse />
    </WrapperFour>
  );
};

export default index;
