import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { randomColor } from "utils/utils"

const CourseListArea = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedStar, setSelectedStar] = useState(0);
  const [styleData, setStyleData] = useState([]);
  const [skillData, setSkillData] = useState([]);
  const placeholderImage = "/assets/img/instructor.png";
  const courseImage = "/assets/img/course/course.jpg";

  //
  useEffect(() => {
    axios
      .get(
        "https://drawproject-production.up.railway.app/api/v1/courses/feature"
      )
      .then((response) => {
        setCategoryData(response.data.data.Category);
        setStyleData(response.data.data.Style);
        setSkillData(response.data.data.Skill);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //

  useEffect(() => {
    // Function to fetch courses based on the selected star rating
    const fetchCoursesByStar = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://drawproject-production.up.railway.app/api/v1/courses?page=1&eachPage=4`,
          {
            params: {
              star: selectedStar,
            },
          }
        );
        const data = response.data.data;
        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchCoursesByStar();
  }, [selectedStar]);

  const handleCategoryFilter = (star) => {
    setSelectedStar(star);
  };

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

  return (
    <>
      <section
        className="course-list-area pb-120 wow fadeInUp"
        data-wow-duration=".8s"
        data-wow-delay=".2s"
      >
        <div className="container">
          <div className="row text-center">
            <div className="col-lg-12">
              <div className="section-title mb-60">
                <span className="tp-sub-title-box mb-15">Our Courses</span>
                <h2 className="tp-section-title">Explore Popular Courses</h2>
              </div>
            </div>
          </div>
          <div className="row mb-20">
            <div className="col-lg-4 col-md-12 courser-list-width mb-60">
              <div className="course-sidebar">
                <div className="country-select d-flex align-items-center">
                  <div className="title">
                    <p
                      className="course-sidebar__title reset-element"
                      style={{ marginRight: "1rem" }}
                    >
                      Star{" "}
                    </p>
                  </div>
                  <select style={{ width: "auto" }}>
                    <option value="3">3 star</option>
                    <option value="2">2 star</option>
                    <option value="1">1 star</option>
                  </select>
                </div>
                <div className="course-sidebar__widget mb-50">
                  <div className="course-sidebar__info c-info-list">
                    <h4 className="course-sidebar__title mb-35">
                      Course Level
                    </h4>
                    {skillData.map((item) => (
                      <div key={item.id} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckChecked"
                          onClick={() => handleCategoryFilter(item.id)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked"
                        >
                          {item.name}
                        </label>
                        <span className="f-right">{item.courseCount}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="course-sidebar__widget mb-50">
                  <div className="course-sidebar__info c-info-list">
                    <h4 className="course-sidebar__title mb-35">Category</h4>

                    {categoryData.map((item) => (
                      <div key={item.id} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault5"
                          onClick={() => handleCategoryFilter(item.id)} // Add onClick event for star filter
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault5"
                        >
                          {item.name}
                        </label>
                        <span className="f-right">{item.courseCount}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="course-sidebar__widget mb-50">
                  <div className="course-sidebar__info c-info-list">
                    <h4 className="course-sidebar__title mb-35">Style</h4>

                    {styleData.map((item) => (
                      <div key={item.id} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault5"
                          onClick={() => handleCategoryFilter(item.id)} // Add onClick event for star filter
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault5"
                        >
                          {item.name}
                        </label>
                        <span className="f-right">{item.courseCount}</span>
                      </div>
                    ))}
                  </div>
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
              ) : (
                courses.map((course, i) => (
                  <div key={i} className="tpcourse tp-list-course mb-40">
                    <div className="row g-0">
                      <div className="col-xl-4 course-thumb-width">
                        <div className="tpcourse__thumb p-relative w-img fix">
                          <Link href={`/course-details?id=${course.courseId}`}>
                            <img
                              src={
                                course.image && course.image !== "null"
                                  ? course.image
                                  : courseImage
                              }
                              alt="course-avatar"
                              onError={(e) => {
                                e.target.src = courseImage;
                              }}
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="col-xl-8  course-text-width">
                        <div className="course-list-content">
                          <div className="tpcourse__category mb-10">
                            <ul className="tpcourse__price-list d-flex align-items-center">
                              <li>
                                <Link
                                  className={randomColor()}
                                  href="/course-details"
                                >
                                  {course.skill}
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className={randomColor()}
                                  href="/course-details"
                                >
                                  {course.category}
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <div className="tpcourse__ava-title mb-15">
                            <h4 className="tpcourse__title tp-cours-title-color">
                              <Link
                                href={`/course-details?id=${course.courseId}`}
                              >
                                {course.courseTitle}
                              </Link>
                            </h4>
                          </div>
                          <div className="tpcourse__meta tpcourse__meta-gap pb-15 mb-15">
                            <ul className="d-flex align-items-center">
                              <li>
                                <img
                                  src="/assets/img/icon/c-meta-01.png"
                                  alt="meta-icon"
                                />
                                <span>{course.numLesson} Lessons</span>
                              </li>
                              <li>
                                <img
                                  src="/assets/img/icon/c-meta-02.png"
                                  alt="meta-icon"
                                />
                                <span>291 Students</span>
                              </li>
                            </ul>
                          </div>
                          <div className="tpcourse__rating d-flex align-items-center justify-content-between">
                            <div className="tpcourse__rating-icon">
                              {renderStarIcons(course.averageStar)}
                              <span>{course.averageStar.toFixed(1)}</span>
                              {/* <p>({course.numReviews})</p> */}
                            </div>
                            <div className="tpcourse__pricing">
                              <h5 className="price-title">${course.price}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="basic-pagination text-center">
            <nav>
              <ul>
                <li>
                  <Link href="/blog">
                    <i className="far fa-angle-left"></i>
                  </Link>
                </li>
                <li>
                  <span className="current">1</span>
                </li>
                <li>
                  <Link href="/blog">2</Link>
                </li>
                <li>
                  <Link href="/blog">3</Link>
                </li>
                <li>
                  <Link href="/blog">
                    <i className="far fa-angle-right"></i>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseListArea;
