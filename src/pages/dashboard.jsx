import React from "react";
import SEO from "../common/seo";
import Dashboard from "../components/dashbard";

const index = () => {
  return (
    <>
      <SEO pageTitle={"Dashboard"} />
      <Dashboard/>
    </>
  );
};

export default index;
