import React from "react";
import SEO from "../common/seo";
import WrapperFour from "../layout/wrapper-4";
import PostCreate from "../components/post";

const index = () => {
    return (
        <WrapperFour>
            <SEO pageTitle={"Create Post"} />
            <PostCreate />
        </WrapperFour>
        );
};

export default index;
