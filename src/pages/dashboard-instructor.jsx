import React from "react";
import SEO from "../common/seo";
import DashboardInstructor from "../components/instructor-dash";

const index = () => {
  return (
    <>
      <SEO pageTitle={"Dashboard"} />
    <DashboardInstructor/>
    </>
  );
};

export default index;
