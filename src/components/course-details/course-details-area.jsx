// import VideoPopup from "@/src/modals/video-popup";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import PostComment from "../form/post-comment";
import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import ReactPlayer from "react-player";
import Popup from "reactjs-popup";
import { Pagination } from "@mui/material";
import Button from "react-bootstrap/Button";

const CourseDetailsArea = () => {
  const [courseData, setCourseData] = useState({});
  const [instructorData, setInstructorData] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const [feedbackData, setFeedbackData] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [edit, setEdit] = useState(false);
  const [loading, isLoading] = useState(false);
  const [isPay, setIsPay] = useState(false);
  const [isVac, setVac] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const [url, setUrl] = useState("");

  const storedUserRole =
    typeof window !== "undefined" ? localStorage.getItem("roles") : null;
  const isLoggedIn =
    typeof window !== "undefined" ? localStorage.getItem("isLoggedIn") : null;
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const [avatar, setAvatar] = useState("/assets/img/icon/course-avata-05.png");

  console.log(accessToken);

  const handlePageChange = (event, value) => {
    setPage(value); // This should update the page state
  };
  const toggleVideo = (url) => {
    setUrl(url);
    setIsVideoOpen(true);
  };

  useEffect(() => {
    isLoading(true);
    if (storedUserRole === "ROLE_INSTRUCTOR") {
      axios
        .get(
          `https://drawproject-production-012c.up.railway.app/api/v1/courses/${id}/check-enroll`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        )
        .then((response) => {
          isLoading(false);

          if (response.data.status === "ACCEPTED") {
            setEdit(true);
          } else {
            setEdit(false);
          }
        })
        .catch((error) => {
          isLoading(false);

          console.error("Error fetching course data:", error);
        });
    }
    if (storedUserRole === "ROLE_CUSTOMER") {
      axios
        .get(
          `https://drawproject-production-012c.up.railway.app/api/v1/courses/${id}/check-enroll`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        )
        .then((response) => {
          isLoading(false);

          if (response.data.status === "ACCEPTED") {
            setIsPay(true);
          } else {
            setIsPay(false);
          }
          if (response.data.status === "NOT_ACCEPTABLE") {
            setVac(true);
          } else {
            setVac(false);
          }
          if (
            response.data.status === "NOT_ACCEPTABLE" &&
            response.data.data === "Close"
          ) {
            setIsBanned(true);
          } else {
            setIsBanned(false);
          }
        })
        .catch((error) => {
          isLoading(false);

          console.error("Error fetching course data:", error);
        });
    }

    axios
      .get(
        `https://drawproject-production-012c.up.railway.app/api/v1/courses/${id}`
      )
      .then((response) => {
        setCourseData(response.data.data);
        setUrl(response.data.data.videoIntro);
        const queryParams = {
          eachPage: 4,
          page: page,
        };
        axios
          .get(
            `https://drawproject-production-012c.up.railway.app/api/v1/courses/${id}/feedback?${new URLSearchParams(
              queryParams
            )}`
          )
          .then((responseFeedback) => {
            const decodedData = responseFeedback.data.data.map((feedback) => ({
              ...feedback,
            }));
            if (decodedData.avatar != null) {
              setAvatar(decodedData.avatar);
            }
            setTotalPage(responseFeedback.data.totalPage);
            console.log(responseFeedback.data.totalPage);
            setFeedbackData(decodedData);
            isLoading(false);
          })
          .catch((error) => {
            console.log(error);
            isLoading(false);
          });

        const instructorId = response.data.data.instructorId;
        axios
          .get(
            `https://drawproject-production-012c.up.railway.app/api/v1/instructor/${instructorId}`
          )
          .then((instructorResponse) => {
            setInstructorData(instructorResponse.data);
          })
          .catch((instructorError) => {
            console.error("Error fetching instructor data:", instructorError);
          });
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
      });
  }, [id, page]);
  const renderStarIcons = (averageStar) => {
    const starIcons = [];
    const roundedAverageStar = Math.round(averageStar); // Round to the nearest whole number

    for (let i = 1; i <= 5; i++) {
      if (i <= roundedAverageStar) {
        // Full star
        starIcons.push(<i key={i} className="fi fi-ss-star"></i>);
      } else if (i - 1 < averageStar && i > averageStar) {
        // Half star
        starIcons.push(<i key={i} className="fi fi-ss-star-half"></i>);
      } else {
        // Empty star
        starIcons.push(<i key={i} className="fi fi-rs-star"></i>);
      }
    }

    return starIcons;
  };
  if (loading == true) {
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
    <>
      <section
        className="c-details-area pt-120 pb-50 wow fadeInUp"
        data-wow-duration=".8s"
        data-wow-delay=".2s"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="c-details-wrapper mr-25">
                <div className="c-details-thumb p-relative mb-40">
                  <img
                    src={`${courseData.image || "c-details-bg-01.jpg"}`}
                    alt="details-bg"
                  />
                  <div className="c-details-ava d-md-flex align-items-center">
                    <img
                      src="/assets/img/icon/course-avata-05.png"
                      alt="avata"
                    />
                    <span>
                      By <a href="#">{instructorData.userName}</a>
                    </span>
                  </div>
                </div>
                <div className="course-details-content mb-45">
                  <div className="tpcourse__category mb-15">
                    <ul className="tpcourse__price-list d-flex align-items-center">
                      <li>
                        <a className="c-color-green" href="#">
                          {courseData.categoryName}
                        </a>
                      </li>
                      <li>
                        <a className="c-color-yellow" href="#">
                          {courseData.drawingStyleName}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="tpcourse__ava-title mb-25">
                    <h4 className="c-details-title">
                      <a href="#">{courseData.courseTitle}</a>
                    </h4>
                  </div>
                  <div className="tpcourse__meta course-details-list">
                    <ul className="d-flex align-items-center">
                      <li>
                        <div className="rating-gold d-flex align-items-center">
                          <div className="tpcourse__rating-icon">
                            <span>
                              {courseData.averageStar
                                ? courseData.averageStar.toFixed(1)
                                : "N/A"}
                            </span>
                            {renderStarIcons(courseData.averageStar)}
                          </div>
                        </div>
                      </li>
                      <li>
                        <img
                          src="/assets/img/icon/c-meta-01.png"
                          alt="meta-icon"
                        />{" "}
                        <span>{courseData.numLesson} Classes</span>
                      </li>
                      <li>
                        <img
                          src="/assets/img/icon/c-meta-02.png"
                          alt="meta-icon"
                        />{" "}
                        <span>{courseData.numStudent} Students</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="c-details-about mb-40">
                  <h5 className="tp-c-details-title mb-20">
                    About This Course
                  </h5>
                  <p>{courseData.description}</p>
                  <p>{courseData.information}</p>
                </div>

                <div className="c-details-review pb-15">
                  <div className="c-review-title-wrapper">
                    <h5 className="c-review-title mb-40">Review</h5>
                  </div>
                  <div className="course-reviewer-item-wrapper">
                    {Array.isArray(feedbackData) &&
                      feedbackData.map((feedback, i) => (
                        <div
                          key={i}
                          className="course-reviewer-item d-flex mb-25"
                        >
                          <div className="course-review-ava">
                            <img src={avatar} alt="details-avata" />
                          </div>
                          <div className="course-review-content p-relative">
                            <h5 className="course-ava-title mb-15">
                              {feedback.username}
                            </h5>
                            <div className="tpcourse__rating-icon d-flex align-items-center mb-10">
                              {renderStarIcons(feedback.star)}
                            </div>
                            <p>{feedback.feedbackInformation}</p>
                          </div>
                        </div>
                      ))}
                    <Pagination
                      page={page}
                      count={totalPage}
                      onChange={handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-12">
              <div className="c-details-sidebar">
                <div className="c-video-thumb p-relative mb-25">
                  <img src={courseData.image} alt="video-bg" />
                  <div
                    className="c-video-icon"
                    onClick={() => toggleVideo(url)}
                  >
                    <a
                      className="popup-video"
                      onClick={() => setIsVideoOpen(true)}
                    >
                      <i className="fi fi-sr-play"></i>
                    </a>
                  </div>
                  <Popup
                    open={isVideoOpen}
                    onClose={() => setIsVideoOpen(false)}
                  >
                    <div>
                      <ReactPlayer url={url} controls />
                      {/* <Button variant="success" className="mt-10" onClick={close}>Close</Button> */}
                    </div>
                  </Popup>
                </div>
                <div className="course-details-widget">
                  <div className="cd-video-price">
                    <h3 className="pricing-video text-center mb-15">
                      ${courseData.price || "29.99"}
                    </h3>
                    <div className="cd-pricing-btn text-center mb-30">
                      {isLoggedIn === "true" &&
                      storedUserRole === "ROLE_CUSTOMER" &&
                      isPay == false ? (
                        <Link
                          className="tp-vp-btn"
                          href={`/check-out?idCourse=${courseData.courseId}`}
                        >
                          Check Out
                        </Link>
                      ) : (
                        <></>
                      )}
                      {isLoggedIn === "true" &&
                      storedUserRole === "ROLE_CUSTOMER" &&
                      isPay == true &&
                      isVac == false ? (
                        <>
                          <Link
                            className="tp-vp-btn-green"
                            href={`/study?id=${id}`}
                          >
                            Enroll
                          </Link>
                        </>
                      ) : (
                        <></>
                      )}

                      {isLoggedIn === "true" &&
                      storedUserRole === "ROLE_CUSTOMER" &&
                      isBanned ? (
                        <>
                          <strong style={{ color: "red" }}>
                            You have been banned to this course
                          </strong>
                        </>
                      ) : (
                        <></>
                      )}

                      {isLoggedIn === "true" &&
                      storedUserRole === "ROLE_INSTRUCTOR" &&
                      edit == true ? (
                        <>
                          <Link
                            className="tp-vp-btn"
                            href={`/create-lesson?idCourse=${id}`}
                          >
                            Create Lesson
                          </Link>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="cd-information mb-35">
                    <ul>
                      <li>
                        <i className="fa-light fa-calendars"></i>{" "}
                        <label>Lesson</label>{" "}
                        <span>{courseData.numLesson || "36"}</span>
                      </li>
                      <li>
                        <i className="fi fi-rr-chart-pie-alt"></i>{" "}
                        <label>Quizess</label>{" "}
                        <span>{courseData.numQuiz || "6"}</span>
                      </li>
                      <li>
                        <i className="fi fi-rr-user"></i>{" "}
                        <label>Students</label>{" "}
                        <span>{courseData.numStudent || "105"}</span>
                      </li>
                      <li>
                        <i className="fa-light fa-clock-desk"></i>{" "}
                        <label>Duration</label>{" "}
                        <span>{courseData.duration || "16 Hours"}</span>
                      </li>
                      <li>
                        <i className="fi fi-sr-stats"></i>{" "}
                        <label>Skill Level</label>{" "}
                        <span>{courseData.skillName || "Beginner"}</span>
                      </li>
                      <li>
                        <i className="fi fi-rr-comments"></i>{" "}
                        <label>Language</label>{" "}
                        <span>{courseData.language || "English"}</span>
                      </li>
                      <li>
                        <i className="fi fi-rs-diploma"></i>{" "}
                        <label>Certificate</label>{" "}
                        <span>{courseData.certificate ? "Yes" : "No"}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="c-details-social">
                    <h5 className="cd-social-title mb-25">Share Now:</h5>
                    <a href="#">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a href="#">
                      <i className="fa-brands fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="#">
                      <i className="fa-brands fa-youtube"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isLoggedIn === "true" &&
        storedUserRole === "ROLE_CUSTOMER" &&
        isPay == true ? (
          <>
            <div className="container">
              <PostComment />
            </div>
          </>
        ) : (
          <></>
        )}
      </section>

      {/* video modal start */}
      {/* <VideoPopup
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={"W-bgMEvrd2E"}
      /> */}

      {/* video modal end */}
    </>
  );
};

export default CourseDetailsArea;
