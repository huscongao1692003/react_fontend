import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

import { Pagination } from "@mui/material";
import DisplayCourse from "./display-course";

const CourseListArea = () => {
  const [loading, setLoading] = useState(true);

  const [courses, setCourses] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [styleData, setStyleData] = useState([]);
  const [skillData, setSkillData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [selectedStar, setSelectedStar] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSkillChange = (e, id) => {
    setPage(1);
    if (e.target.checked) {
      return setSelectedSkill([...selectedSkill, id]);
    }
    setSelectedSkill((prev) => prev.filter((val) => val !== id));
  };

  const handleCategoryChange = (e, id) => {
    setPage(1);
    if (e.target.checked) {
      return setSelectedCategory([...selectedCategory, id]);
    }
    setSelectedCategory((prev) => prev.filter((val) => val !== id));
  };

  const handleStyleChange = (e, id) => {
    setPage(1);
    if (e.target.checked) {
      return setSelectedStyle([...selectedStyle, id]);
    }
    setSelectedStyle((prev) => prev.filter((val) => val !== id));
  };

  const handleStarChange = (e) => {
    setSelectedStar(e.target.value);
  };

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

  useEffect(() => {
    const fetchCoursesByStar = async () => {
      setLoading(true);
      try {
        const queryParams = {
          eachPage: 4,
          page: page,
          star: selectedStar,
        };

        //check query
        if (selectedSkill.length > 0) {
          queryParams.skill = selectedSkill;
        }
        if (selectedCategory.length > 0) {
          queryParams.category = selectedCategory;
        }
        if (selectedStyle.length > 0) {
          queryParams.style = selectedStyle;
        }

        const url = `https://drawproject-production.up.railway.app/api/v1/courses?${new URLSearchParams(
          queryParams
        )}`;

        const response = await axios.get(url);
        const data = response.data.data;
        setCourses(data);
        setLoading(false);
        setPage(response.data.page);
        setTotalPage(response.data.totalPage);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchCoursesByStar();
  }, [page, selectedSkill, selectedStar, selectedStyle, selectedCategory]);

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
                  <select
                    style={{ width: "auto" }}
                    onChange={(e) => handleStarChange(e)}
                  >
                    <option value="0">All star</option>
                    <option value="5">5 star</option>
                    <option value="4">4 star</option>
                    <option value="3">3 star</option>
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
                          id={`flexCheckChecked${item.id}`}
                          onClick={(e) => handleSkillChange(e, item.id)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`flexCheckChecked${item.id}`}
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
                          id={`flexCheckChecked${item.id}`}
                          onClick={(e) => handleCategoryChange(e, item.id)} // Add onClick event for star filter
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`flexCheckChecked${item.id}`}
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
                          id={`flexCheckChecked${item.id}`}
                          onClick={(e) => handleStyleChange(e, item.id)} // Add onClick event for star filter
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`flexCheckChecked${item.id}`}
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
              ) : courses.length === 0 ? (
                <div style={{ opacity: "0.5" }} className="d-flex flex-column align-items-center">
                  <img
                    src="../../../assets/img/course/empty-course.gif"
                    alt=""
                  />
                  <div className="content">Empty Course</div>
                </div>
              ) : (
                <DisplayCourse courses={courses} />
              )}
            </div>
            <div className="d-flex justify-content-center">
              <Pagination
                page={page}
                count={totalPage}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseListArea;
