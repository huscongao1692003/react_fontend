// CourseCreateTopicArea.tsx

import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import TopicItem from "./topic-item";
import { ModalCreateLesson, ModalCreateAssignment } from "./Modal";

function CourseCreateTopicArea({ courseId }) {
  const [courseData, setCourseData] = useState({
    lessons: [],
    index: "",
    topicTitle: "",
    topicId: "",
  });

  const getCourseData = async () => {
    const url = `https://drawproject-production-012c.up.railway.app/api/v1/courses/${courseId}/topic`;
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await axios.get(url, config);
      if (response.data.status === "OK") {
        setCourseData(response.data.data[0]);
      } else {
        console.error(response);
      }
      // You can process the response data here
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async () => {
    const url = `https://drawproject-production-012c.up.railway.app/api/v1/courses/${courseId}/topic`;
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.post(url, courseData, config);
      if (response.data.status === "OK") {
        alert("success");
      } else {
        console.error(response);
      }
      // You can process the response data here
    } catch (e) {
      console.error(e);
    }
  };

  const TopicItemsHTML = courseData?.lessons?.map((item, index) => (
    <TopicItem key={index} data={item} />
  ));

  useEffect(() => {
    if (courseId) {
      getCourseData();
    }
  }, [courseId]);

  return (
    <div style={{ minHeight: "50vh" }}>
      <ModalCreateLesson
        courseData={courseData}
        setCourseData={setCourseData}
        courseId={courseId}
      />
      <ModalCreateAssignment
        courseData={courseData}
        setCourseData={setCourseData}
      />
      <div className="d-flex justify-content-center align-items-center mt-4">
        <button
          type="button"
          className="btn btn-outline-success m-2"
          data-bs-toggle="modal"
          data-bs-target="#modalTopic"
        >
          Add New Lesson
        </button>
        <button
          type="button"
          className="btn btn-outline-success m-2"
          data-bs-toggle="modal"
          data-bs-target="#modalLesson"
        >
          Add New Lesson
        </button>
      </div>
      {TopicItemsHTML}
    </div>
  );
}

export default CourseCreateTopicArea;
