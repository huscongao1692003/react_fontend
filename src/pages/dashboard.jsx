import React from "react";
import SEO from "../common/seo";
import WrapperFour from "../layout/wrapper-4";
import SignIn from "../components/sign-in";
import Dashboard from "../components/dashbard";

const index = () => {
  return (
    <>
      <SEO pageTitle={"Dashboard"} />
      {/* <SignIn /> */}
      <Dashboard/>
    </>
  );
};

export default index;
