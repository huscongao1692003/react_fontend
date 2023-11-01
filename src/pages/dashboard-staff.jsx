import React from "react";
import SEO from "../common/seo";
import DashboardStaff from "../components/staff-dash";

const index = () => {
  return (
    <>
      <SEO pageTitle={"Dashboard"} />
      <DashboardStaff/>
    </>
  );
};

export default index;
