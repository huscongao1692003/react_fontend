import SEO from "../common/seo";
import WrapperFour from "../layout/wrapper-4";
import CourseCreateTopic from "../components/course-create-topic";
import { useRouter } from "next/router";

function index() {
  const router = useRouter();
  const courseId = router.query.id;
  return (
    <WrapperFour>
      <SEO pageTitle={"Create Topic"} />
      <CourseCreateTopic courseId={courseId} />
    </WrapperFour>
  );
}

export default index;
