import React from "react";
import SEO from "../common/seo";
import WrapperFour from "../layout/wrapper-4";
import Settings from "../components/form/settings-form";
import Breadcrumb from "../components/bredcrumb/breadcrumb";

const index = () => {
  return (
    <WrapperFour>
      <SEO pageTitle={"Settings"} />
      <Breadcrumb title="Settings" subtitle="Settings" isDbbl="Pages" />
      <Settings/>
    </WrapperFour>
  );
};

export default index;
