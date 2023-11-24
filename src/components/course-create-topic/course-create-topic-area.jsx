// CourseCreateTopicArea.tsx

import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import TopicItem from "./topic-item";
import { ModalCreateLesson, ModalCreateAssignment } from "./Modal";
import Spinner from "react-bootstrap/Spinner";

function CourseCreateTopicArea({ courseId }) {
  const [topics, setTopics] = useState([]);
  const [refetch, setRefetch] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
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
    setLoading(true);
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
      setLoading(false); 
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      getCourseData();
    }
  }, [courseId, refresh]);

  return (
    <div style={{ minHeight: "50vh" }}>
      <ModalCreateLesson
        courseData={courseData}
        setCourseData={setCourseData}
        courseId={courseId}
        setRefresh={setRefetch}
        refresh={refresh}
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
        {loading ? (
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ paddingTop: "300px", paddingBottom: "300px" }}
          >
            <Spinner animation="grow" variant="success" size="lg" />
          </div>
        ) : topics.length > 0 ? (
          topics.map((topic) => (
            <TopicItem
              key={topic.topicId}
              data={topic}
              setRefetch={setRefetch}
              refetch={refetch}
            />
          ))
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default CourseCreateTopicArea;
