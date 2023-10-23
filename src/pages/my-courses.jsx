import React from "react";
import SEO from "../common/seo";
import MyCourseList from "../components/my-courses";
import WrapperFour from "../layout/wrapper-4";

const index = () => {
    return (
        <WrapperFour>
            <SEO pageTitle={"My Course List"} />
            <MyCourseList />
        </WrapperFour>
        );
};

export default index;