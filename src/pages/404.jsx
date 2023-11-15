import Link from "next/link";
import React from "react";
import SEO from "../common/seo";
import ErrorPage from "../components/error";
import WrapperFour from "../layout/wrapper-4";

const Error = () => {
  return (
    <WrapperFour>
      <SEO pageTitle={"Maintenance page"} />
      <ErrorPage />
    </WrapperFour>
  );
};

export default Error;
