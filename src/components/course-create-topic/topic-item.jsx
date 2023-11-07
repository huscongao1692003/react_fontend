import { useState } from "react";
import LessionItem from "./lesson-item";
import axios from "axios";

function TopicItem({ data, setRefetch, refetch } ) {
  const { topicTitle, lessons } = data;

  // const hanldDeleteTopic = async (id) => {
  //   console.log("asdfasdf");
  //   const url = `https://drawproject-production-012c.up.railway.app/api/v1/courses/topic/${id}/close`;
  //   const accessToken = localStorage.getItem("accessToken");
  //   const config = {
  //     headers: {
  //       Accept: "*/*",
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   };
  //   try {
  //     const response = await axios.put(url, null, config);
  //     if (response.data.status === "OK") {
  //       alert("success");
  //       setRefetch(refetch + 1);
  //     } else {
  //       console.error(response);
  //     }
  //     // You can process the response data here
  //   } catch (e) {
  //     console.error(e);
  //   } 
  // }

  return (
    <div
      className="card card-header-actions"
      style={{ width: "70%", margin: "2% auto" }}
    >
      <div className="card-header d-flex justify-content-between align-items-center">
        <p className="mb-0 font-weight-bold">{topicTitle}</p>
        <div>
          <button type="button" className="btn btn-sm btn-outline-success m-1">
            Edit
          </button>
          <button type="button" className="btn btn-sm btn-outline-danger">
            Delete
          </button>
        </div>
      </div>
      <div className="card-body">{lessons.map((lesson, index) => (
          <LessionItem key={lesson.lessonId} data={lesson} />
        ))}</div>
    </div>
  );
}

export default TopicItem;
