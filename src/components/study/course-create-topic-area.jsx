import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import VideoPlayer from "@/src/components/video-player/VideoPlayer";

function CourseCreateTopicArea() {
  const router = useRouter();
  const { id } = router.query;
  const [courseData, setCourseData] = useState([]);

  const getCourseData = async () => {
    const url = `https://drawproject-production.up.railway.app/api/v1/courses/${id}/topic`;
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await axios.get(url, config);
      if (response.data.status === "OK") {
        setCourseData(response.data.data);
      } else {
        console.error(response);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (id) {
      getCourseData();
    }
  }, [id]);

  return (
    <div style={{ minHeight: "50vh" }}>
      {courseData.map((item, index) => (
        <div key={index} className="card card-header-actions" style={{ width: "70%", margin: "2% auto" }}>
          <div className="card-header d-flex justify-content-between align-items-center">
            <p className="mb-0 font-weight-bold">{item.topicTitle}</p>
            <div>
              <button type="button" className="btn btn-sm btn-outline-success m-1">
                See Lessons
              </button>
            </div>
          </div>
          <div className="card-body">
            {item.lessons.map((lesson, lessonIndex) => (
              <div key={lessonIndex}>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="icon"></div>
                    <div className="ms-4">
                      <div className="text-xs text-muted" style={{ fontWeight: "600" }}>
                        Lesson {lessonIndex + 1}: {lesson.name}
                      </div>
                      <div className="text-xs text-muted">{lesson.typeFile}</div>
                      <div>
                        <h1>Video Player Example</h1>
                        <VideoPlayer videoUrl={"https://www.youtube.com/watch?v=Y4k3aM0Su58"} />
                      </div>
                    </div>
                  </div>
                  <div className="ms-4 small">
                    <a href="javascript:void(0);" className="me-3">
                      Study
                    </a>
                  </div>
                </div>
                {lessonIndex + 1 !== item.lessons.length && <hr />}
              </div>
              ))}
          </div>
        </div>
        ))}
    </div>
    );
}

export default CourseCreateTopicArea;
