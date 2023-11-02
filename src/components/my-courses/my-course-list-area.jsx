import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { Pagination } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";

const MyCourseListArea = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const router = useRouter();

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    // First, fetch the user's ID
    axios
      .get(`https://drawproject-production-012c.up.railway.app/api/v1/users/id`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        const userId = response.data;

        const queryParams = {
          eachPage: 4,
          page: page,
        };
        const url = `https://drawproject-production-012c.up.railway.app/api/v1/user/${userId}/courses?${new URLSearchParams(
          queryParams
        )}`;

        axios
          .get(url, {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
          .then((response) => {
            const dataCourse = response.data.data;
            setPage(response.data.page);
            setTotalPage(response.data.totalPage);
            setCourses(dataCourse);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching courses:", error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error fetching user ID:", error);
        setLoading(false);
      });
  }, [accessToken, page]);

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
    <>
      <section className="course-list-area pb-120 wow fadeInUp">
        <div className="container-fluid">
          <div className="row text-center">
            <div className="col-lg-12">
              <div className="section-title mb-60">
                <span className="tp-sub-title-box mb-15">My Courses</span>
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-md-12 course-item-width ml-30">
            {loading ? (
              <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ paddingTop: "300px", paddingBottom: "300px" }}
              >
                <Spinner animation="grow" variant="success" size="lg" />
              </div>
            ) : courses.length === 0 ? (
              <div
                style={{ opacity: "0.5" }}
                className="d-flex flex-column align-items-center"
              >
                <img src="../../../assets/img/course/empty-course.gif" alt="" />
                <div className="content">Empty Course</div>
              </div>
            ) : (
              <>
                <div className="container">
                  <div className="row text-center">
                    <div className="col-lg-12">
                      <div className="section-title mb-60"></div>
                    </div>
                  </div>
                  <div className="row mb-20 col-lg-12 ">
                    <div className="col-lg-12 col-md-12 course-item-width ml-30">
                      {courses.map((course, i) => (
                        <div key={i} className="tpcourse tp-list-course mb-40">
                          <div className="row g-0">
                            <div className="col-xl-4 course-thumb-width">
                              <div className="tpcourse__thumb p-relative w-img fix">
                                <Link href={`/course-details?id=${course.courseId}`}>
                                  <img src={course.image} alt="course-thumb" />
                                </Link>
                              </div>
                            </div>
                            <div className="col-xl-8  course-text-width">
                              <div className="course-list-content">
                                <div className="tpcourse__category mb-10">
                                  <ul className="tpcourse__price-list d-flex align-items-center">
                                    <li>
                                      <Link className={course.ct_color} href="/course-details">
                                        {course.skill}
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className={course.cn_color} href="/course-details">
                                        {course.category}
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                                <div className="tpcourse__ava-title mb-15">
                                  <h4 className="tpcourse__title tp-cours-title-color">
                                    <Link href={`/course-details?id=${course.courseId}`}>
                                      {course.courseTitle}
                                    </Link>
                                  </h4>
                                </div>
                                <div className="tpcourse__meta tpcourse__meta-gap pb-15 mb-15">
                                  <ul className="d-flex align-items-center">
                                    <li>
                                      <img src="/assets/img/icon/c-meta-01.png" alt="meta-icon" />
                                      <span>{course.numLesson} Lessons</span>
                                    </li>
                                    <li>
                                      <img src="/assets/img/icon/c-meta-02.png" alt="meta-icon" />
                                      <span>{course.numStudent} Students</span>
                                    </li>
                                  </ul>
                                </div>
                                <div className="tpcourse__rating d-flex align-items-center justify-content-between">
                                  <div className="tpcourse__rating-icon">
                                    {renderStarIcons(course.averageStar)}
                                    <span>{course.averageStar.toFixed(1)}</span>
                                    <p>({course.numReviews})</p>
                                  </div>
                                  <div className="tpcourse__pricing">
                                    <h5 className="price-title">${course.price}</h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="d-flex justify-content-center">
            <Pagination page={page} count={totalPage} onChange={handlePageChange} />
          </div>
        </div>
      </section>
    </>
  );
};

export default MyCourseListArea;
