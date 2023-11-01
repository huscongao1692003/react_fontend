import SEO from "../common/seo";
import WrapperFour from "../layout/wrapper-4";
import CourseCreateTopic from "../components/study";

function index() {
    return (
        <WrapperFour>
            <SEO pageTitle={"Study"} />
            <CourseCreateTopic />
        </WrapperFour>
        );
}

export default index;
