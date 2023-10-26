import React from "react";
import Breadcrumb from "../bredcrumb/breadcrumb";
import CounterArea from "../homes/home/counter-area";
import CourseCreateTopicArea from "./course-create-topic-area";

const CourseCreateTopic = () => {
  return (
    <>
      <Breadcrumb
        title="Study"
        subtitle="Study"
        isDbbl="Course"
      />
      <CourseCreateTopicArea />
      <CounterArea />
    </>
  );
};

export default CourseCreateTopic;
