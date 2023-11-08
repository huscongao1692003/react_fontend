import { useState } from "react";
import LessionItem from "./lesson-item";
import axios from "axios";

function TopicItem({ data, setRefetch, refetch } ) {
  const { topicTitle, lessons } = data;

  const handleDeleteTopic = async (topicId) => {
    const url = `https://drawproject-production-012c.up.railway.app/api/v1/courses/topic/${topicId}/close`;
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
  
    try {
      const response = await axios.put(url,null, config); // Assuming the API expects a DELETE request for closing a topic
      if (response.data.status === "OK") {
        alert("Topic deleted successfully");
        setRefetch(refetch + 1);
        window.location.reload();
        // to refresh the list
      } else {
        console.error('Failed to delete topic:', response);
      }
    } catch (e) {
      console.error('Error during topic deletion:', e);
    }
  }
  const handleDeleteLesson = async (lessonId) => {
    const url = `https://drawproject-production-012c.up.railway.app/api/v1/lessons?lessonId=${lessonId}`;
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.delete(url, config);
      if (response.data.status === "OK") {
        alert("Lesson deleted successfully");
        setRefetch(refetch + 1);
        window.location.reload();
         // to refresh the list
      } else {
        console.error('Failed to delete lesson:', response);
      }
    } catch (e) {
      console.error('Error during lesson deletion:', e);
    }
  };

  return (
    <div
      className="card card-header-actions"
      style={{ width: "70%", margin: "2% auto" }}
    >
      <div className="card-header d-flex justify-content-between align-items-center">
        <p className="mb-0 font-weight-bold">{topicTitle}</p>
        <div>
        <button
          type="button"
          className="btn btn-sm btn-outline-danger"
          onClick={() => handleDeleteTopic(data.topicId)} // Assuming data contains a property topicId
        >
          Delete
        </button>
        </div>
      </div>
      <div className="card-body">{lessons.map((lesson, index) => (
          <LessionItem key={lesson.lessonId} data={lesson} handleDeleteLesson={handleDeleteLesson} />
        ))}</div>
    </div>
  );
}

export default TopicItem;
