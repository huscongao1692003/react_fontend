import Link from "next/link";
import React from "react";
import SEO from "../common/seo";
import PayCancel from "../components/payment/payment-cancel";
import WrapperFour from "../layout/wrapper-4";

const Cancel = () => {
    return (
        <WrapperFour>
            <SEO pageTitle={"Pay Cancel"} />
            <PayCancel />
        </WrapperFour>
        );
};

export default Cancel;