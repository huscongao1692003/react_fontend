import FeatureArea from "@/src/common/feature-area";
import SuitableArea from "@/src/common/suitable-area";
import React from "react";
import Breadcrumb from "../bredcrumb/breadcrumb";
// import CounterArea from "../homes/home-3/counter-area";
import CourseArea from "./create-course"
const CreateCourse = () => {
  return (
    <>
      <Breadcrumb title="Create Course" subtitle="Create Course" isDbbl="Course" />
      {/* <FeatureArea style_about={true} /> */}
      <CourseArea />
      {/* <SuitableArea style_2={true} /> */}
      {/* <CounterArea /> */}
    </>
  );
};

export default CreateCourse;
