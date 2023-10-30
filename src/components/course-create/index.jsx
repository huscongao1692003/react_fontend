import React from "react";
import Breadcrumb from "../bredcrumb/breadcrumb";
import CounterArea from "../homes/home/counter-area";
import CourseCreateArea from "./course-create-area";

const CourseCreate = () => {
  return (
    <>
       <Breadcrumb
        title="Course Create"
        subtitle="Course Create"
        isDbbl="Course"
      /> 
      
      <CourseCreateArea />

      {/* <CounterArea /> */}
    </>
  );
};

export default CourseCreate;
