import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";
import Spinner from "react-bootstrap/Spinner";
import { EmbedPDF } from "@simplepdf/react-embed-pdf";
import Popup from "reactjs-popup";
import Button from 'react-bootstrap/Button';

function CourseCreateTopicArea() {
  const router = useRouter();
  const { id } = router.query;
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLessons, setShowLessons] = useState({});
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [url, setUrl] = useState("");

  const getCourseData = async () => {
    const url = `https://drawproject-production-012c.up.railway.app/api/v1/courses/${id}/topic`;
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      setLoading(true);
      const response = await axios.get(url, config);
      if (response.data.status === "OK") {
        setCourseData(response.data.data);
        const initialShowLessons = {};
        response.data.data.forEach((topic) => {
          initialShowLessons[topic.topicId] = false;
        });
        setShowLessons(initialShowLessons);
        setLoading(false);
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

  const toggleLessonsVisibility = (topicId) => {
    setShowLessons((prevShowLessons) => ({
      ...prevShowLessons,
      [topicId]: !prevShowLessons[topicId],
    }));
  };
  const toggleVideo = (url) => {
   setUrl(url);
   setIsVideoOpen(true)
  };

  if (loading) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ paddingTop: "300px", paddingBottom: "300px" }}
      >
        <Spinner animation="grow" variant="success" size="lg" />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "50vh" }}>
      {courseData.map((topic, topicIndex) => (
        <div
          key={topic.topicId}
          className="card card-header-actions"
          style={{ width: "70%", margin: "2% auto" }}
        >
          <div className="card-header d-flex justify-content-between align-items-center">
            <p className="mb-0 font-weight-bold">{topic.topicTitle}</p>
            <div>
              <button
                onClick={() => toggleLessonsVisibility(topic.topicId)}
                type="button"
                className="btn btn-sm btn-outline-success m-1"
              >
                {showLessons[topic.topicId] ? "Hide Lessons" : "Show Lessons"}
              </button>
            </div>
          </div>
          {showLessons[topic.topicId] && (
            <div className="card-body">
              {topic.lessons.map((lesson, lessonIndex) => (
                <div key={lesson.lessonId}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <div className="icon"></div>
                      <div className="ms-4">
                        <div
                          className="text-xs text-muted"
                          style={{ fontWeight: "600" }}
                        >
                          Lesson {lessonIndex + 1}: {lesson.name}
                        </div>
                        <div>
                          {lesson.typeFile === "video" ? (
                            <div>
                              <div className="c-video-thumb p-relative mb-25">
                                <img
                                  src="/assets/img/bg/suit-bg-02.png"
                                  alt="video-bg"
                                />
                                <div className="c-video-icon">
                                  <a
                                    className="popup-video"
                                    onClick={() => toggleVideo(lesson.url)}
                                  >
                                    <i className="fi fi-sr-play"></i>
                                  </a>
                                </div>
                              </div>
                              <Popup
                                      open={isVideoOpen}
                                      onClose={() => setIsVideoOpen(false)}
                                    >
                                      <div>
                                        <ReactPlayer url={url} controls/>
                                        <Button variant="success" className="mt-10" onClick={close}>Close</Button>
                                      </div>
                                    </Popup>
                            </div>
                          ) : lesson.typeFile === "pdf" ? (
                            <div>
                              <h1>PDF Viewer</h1>
                              <EmbedPDF>
                                <a href={lesson.url}>
                                  Opens <strong>{lesson.name}</strong>
                                </a>
                              </EmbedPDF>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  {lessonIndex + 1 !== topic.lessons.length && <hr />}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}


export default CourseCreateTopicArea;
