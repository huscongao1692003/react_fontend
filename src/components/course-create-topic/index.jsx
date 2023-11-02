import React from "react";
import Breadcrumb from "../bredcrumb/breadcrumb";
import CounterArea from "../homes/home/counter-area";
import CourseCreateTopicArea from "./course-create-topic-area";

const CourseCreateTopic = ({ courseId }) => {
  return (
    <>
      <Breadcrumb
        title="Create Lesson"
        subtitle="Create Lesson"
        isDbbl="Course"
      />
      <CourseCreateTopicArea courseId={courseId} />
      <CounterArea />
    </>
  );
};

export default CourseCreateTopic;
