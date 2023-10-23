import React from "react";
import SEO from "../common/seo";
import WrapperFour from "../layout/wrapper-4";
import CourseCreate from "../components/course-create";

const index = () => {
  return (
    <WrapperFour>
      <SEO pageTitle={"Create Course"} />
      <CourseCreate />
    </WrapperFour>
  );
};

export default index;
