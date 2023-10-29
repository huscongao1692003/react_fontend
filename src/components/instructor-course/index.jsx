
import React from "react";
import Breadcrumb from "../bredcrumb/breadcrumb";
import MyCourseListArea from "./my-course-list-area";

const MyCourseList = () => {
  return (
    <>
      <Breadcrumb title="My Course List" subtitle="My Course List" isDbbl="Course" />
      <MyCourseListArea />
      
    </>
  );
};

export default MyCourseList;
