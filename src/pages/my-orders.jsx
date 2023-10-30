import React from "react";
import SEO from "../common/seo";
import MyOderLists from "../components/my-order";
import WrapperFour from "../layout/wrapper-4";

const index = () => {
    return (
        <WrapperFour>
            <SEO pageTitle={"My Order List"} />
            <MyOderLists />
        </WrapperFour>
        );
};

export default index;