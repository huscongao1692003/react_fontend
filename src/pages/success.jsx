import Link from "next/link";
import React from "react";
import SEO from "../common/seo";
import PaySuccess from "../components/payment/payment-success";
import WrapperFour from "../layout/wrapper-4";

const Success = () => {
    return (
        <WrapperFour>
            <SEO pageTitle={"Pay Success"} />
            <PaySuccess />
        </WrapperFour>
        );
};

export default Success;