import { useRouter } from "next/router";
import SEO from "@/src/common/seo";
import WrapperFour from "@/src/layout/wrapper-4";
import CourseCreateTopic from "../components/course-create-topic";


function CreateTopic() {
  const router = useRouter();
  const courseId = router.query.id;
  return (
    <>
      <WrapperFour>
        <SEO pageTitle={"Create Topic"} />
        <CourseCreateTopic courseId={courseId} />
      </WrapperFour>
    </>
  );
}

export default CreateTopic;
