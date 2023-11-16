import React from "react";
import SEO from "../common/seo";
import WrapperFour from "../layout/wrapper-4";
import Privacy from "../components/privacy-policy";
import BackToTop from "../lib/BackToTop";
import HeaderTwo from "../layout/headers/header-2";

const index = () => {
  return (
    <>
        <HeaderTwo />
        <SEO pageTitle={"Privacy"} />
        <Privacy />
        <BackToTop />
    </>
      
  );
};

export default index;
