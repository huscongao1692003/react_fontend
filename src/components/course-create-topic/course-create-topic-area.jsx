// CourseCreateTopicArea.tsx

import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import TopicItem from "./topic-item";
import { ModalCreateLesson, ModalCreateAssignment } from "./Modal";

function CourseCreateTopicArea({ courseId }) {
  const [topics, setTopics] = useState([]);
  const [refetch, setRefetch] = useState(0);
  const [courseData, setCourseData] = useState({
    lessons: [],
    index: "",
    topicTitle: "",
    topicId: "",
  });
  useEffect(() => {
    setCourseData((prevData) => ({ ...prevData, lessons: topics }));
  }, [topics]);
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
        // Assuming that response.data.data contains an array of all topics
        setTopics(response.data.data); // This line is changed
      } else {
        console.error(response);
      }
    } catch (e) {
      console.error(e);
    }
  };
  
  useEffect(() => {
    if (courseId) {
      getCourseData();
    }
  }, [courseId]);
  

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
        courseId={courseId}
      />
      <div className="d-flex justify-content-center align-items-center mt-4">
        <button
          type="button"
          className="btn btn-outline-success m-2"
          data-bs-toggle="modal"
          data-bs-target="#modalTopic"
        >
          Add New Topic
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
      <div>
      {topics.length > 0 ? topics.map((topic) => (
  <TopicItem key={topic.topicId} data={topic} setRefetch={setRefetch} refetch={refetch} />
)) : ""}
    </div>
    </div>
  );
}

export default CourseCreateTopicArea;
