import React from "react";
import SEO from "../common/seo";
import WrapperFour from "../layout/wrapper-4";
import CourseDetails from "../components/course-details";

const index = () => {
  return (
    <WrapperFour>
      <SEO pageTitle={"Course Details"} />
      <CourseDetails />
    </WrapperFour>
  );
};

export default index;
