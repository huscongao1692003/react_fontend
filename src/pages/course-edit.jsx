import React from "react";
import SEO from "../common/seo";
import CourseEdit from "../components/course-edit";
import WrapperFour from "../layout/wrapper-4";

const index = () => {
  return (
    <WrapperFour>
      <SEO pageTitle={"Course Edit"} />
      <CourseEdit />
    </WrapperFour>
  );
};

export default index;
