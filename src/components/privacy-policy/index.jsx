import React from "react";
import Breadcrumb from "../bredcrumb/breadcrumb";
import PrivacyPolicy from "./privacy-policy";

const Privacy = () => {
    return (
        <>
          <Breadcrumb  title="Privacy - Policy" subtitle="Privacy Policy" />
          <PrivacyPolicy />
        </>
      );
}

export default Privacy;