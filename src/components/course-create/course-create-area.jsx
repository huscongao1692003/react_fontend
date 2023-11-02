import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Spin, message } from 'antd';

function CourseCreateArea() {
  const [courseData, setCourseData] = useState({
    price: 0,
    information: "",
    style: 0,
    skill: 0,
    courseId: 10,
    image: null,
    description: "",
    courseTitle: "",
    category: 0,
  });
  const [err, setErr] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [styles, setStyles] = useState([]); // State variable to store styles data
  const [categories, setCategories] = useState([]); // State variable to store categories data
  const [skills, setSkills] = useState([]); // State variable to store skills data

  const error = () => {
    message.error("Something has error!!!");
    message.config({
      maxCount: 3,
    });
    setErr("");
  };

  const success = () => {
    message.success("Create Course successful");
    message.config({
      maxCount: 1,
    });
    setSuccessMsg("");
  };

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setCourseData({ ...courseData, image: selectedFile });
  };

  const submitCourseData = async () => {
    const loadingMessage = message.loading("Processing...", 0);
    setIsloading(true);

    if (
      courseData.courseTitle.length < 5 ||
      courseData.description.length < 5 ||
      courseData.information.length < 5 ||
      courseData.description.length > 255 ||
      !courseData.category ||
      !courseData.style ||
      !courseData.skill ||
      !courseData.price ||
      !courseData.image
    ) {
      setErr("Validation error: Please check your inputs.");
      setSuccessMsg("");
      loadingMessage();
      setIsloading(false);
      return;
    }
    try {
      if (localStorage.getItem("accessToken")) {
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
          Accept: "*/*",
          Authorization: `Bearer ${accessToken}`,
        };
        const url = `https://drawproject-production-012c.up.railway.app/api/v1/courses`;
        const formData = new FormData();
        formData.append("courseTitle", courseData.courseTitle);
        formData.append("category", courseData.category);
        formData.append("description", courseData.description);
        formData.append("readingTime", courseData.readingTime);
        formData.append("image", courseData.image);
        formData.append("style", courseData.style);
        formData.append("information", courseData.information);
        formData.append("courseId", courseData.courseId);
        formData.append("price", courseData.price);
        formData.append("skill", courseData.skill);

        const response = await axios.post(url, formData, { headers });

        if (response.data.status !== "BAD_REQUEST") {
          setErr("");
          setSuccessMsg("Create course successfully.");
        }
      }
    } catch (e) {
      setErr("Something error!!!.");
      setSuccessMsg("");
      console.error(e);
    }
    loadingMessage();
    setIsloading(false);
  };

  useEffect(() => {
    // Fetch API data for styles, categories, and skills
    const fetchData = async () => {
      try {
        const stylesResponse = await axios.get("https://drawproject-production-012c.up.railway.app/api/v1/style");
        const categoriesResponse = await axios.get("https://drawproject-production-012c.up.railway.app/api/v1/category");
        const skillsResponse = await axios.get("https://drawproject-production-012c.up.railway.app/api/v1/skill");

        setStyles(stylesResponse.data.data);
        setCategories(categoriesResponse.data);
        setSkills(skillsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {err !== "" && successMsg === ""
        ? error()
        : err === "" && successMsg !== "" && success()}
      <div className="container-xl px-4 mt-100 mb-100">
        <div className="row gx-4">
          <div className="col-xl-4">
            <div className="card">
              <div className="card-header">Course Picture</div>
              <div className="card-body text-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />

                <img
                  src="https://as1.ftcdn.net/v2/jpg/01/94/55/90/1000_F_194559085_coSk1DYPdHWAYxI74GM9VjyAL4x7OjSq.jpg"
                  alt=""
                  className="img-account-profile rounded-circle mb-2"
                />
                <div className="small font-italic text-muted mb-4">
                  {courseData?.image?.name
                    ? courseData?.image?.name
                    : "JPG or PNG no larger than 5 MB"}
                </div>
                <button
                  type="button"
                  className="tp-btn"
                  onClick={handleButtonClick}
                >
                  {courseData?.image?.name
                    ? "Change image"
                    : "Upload new image"}
                </button>
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="card mb-4">
              <div className="card-header">Course Details</div>
              <div className="card-body">
                <form
                  novalidate=""
                  className="ng-untouched ng-pristine ng-valid"
                >
                  <div className="mb-3">
                    <label for="inputUsername" className="small mb-1">
                      Course Title (how the course name will appear to other
                      users on the site)
                    </label>
                    <input
                      id="inputCourseTitle"
                      type="text"
                      placeholder="Enter course title"
                      className="form-control"
                      onChange={(e) => {
                        setCourseData({
                          ...courseData,
                          courseTitle: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label for="inputFirstName" className="small mb-1">
                        Category
                      </label>
                      <select
                        placeholder="Select your category"
                        className="form-control"
                        onChange={(e) => {
                          setCourseData({
                            ...courseData,
                            category: parseInt(e.target.value),
                          });
                        }}
                      >
                        <option value={0}>Select a category</option>
                        {categories.map((category) => (
                          <option key={category.categoryId} value={category.categoryId}>
                            {category.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label for="inputLastName" className="small mb-1">
                        Style
                      </label>
                      <select
                        placeholder="Select your style"
                        className="form-control"
                        onChange={(e) => {
                          setCourseData({
                            ...courseData,
                            style: parseInt(e.target.value),
                          });
                        }}
                      >
                        <option value={0}>Select a style</option>
                        {styles.map((style) => (
                          <option key={style.drawingStyleId} value={style.drawingStyleId}>
                            {style.drawingStyleName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label for="inputOrgName" className="small mb-1">
                        Skill
                      </label>
                      <select
                        placeholder="Select your skill"
                        className="form-control"
                        onChange={(e) => {
                          setCourseData({
                            ...courseData,
                            skill: parseInt(e.target.value),
                          });
                        }}
                      >
                        <option value={0}>Select a skill</option>
                        {skills.map((skill) => (
                          <option key={skill.skillId} value={skill.skillId}>
                            {skill.skillName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label for="inputLocation" className="small mb-1">
                        Price
                      </label>
                      <input
                        type="number"
                        placeholder="Enter your price"
                        className="form-control"
                        onChange={(e) => {
                          setCourseData({
                            ...courseData,
                            price: parseInt(e.target.value),
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label for="inputUsername" className="small mb-1">
                      Description
                    </label>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      onChange={(e) => {
                        setCourseData({
                          ...courseData,
                          description: e.target.value,
                        });
                      }}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label for="inputUsername" className="small mb-1">
                      Information
                    </label>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      onChange={(e) => {
                        setCourseData({
                          ...courseData,
                          information: e.target.value,
                        });
                      }}
                    ></textarea>
                  </div>
                  <Spin spinning={isLoading}>
                    <button
                      type="button"
                      className="tp-btn"
                      onClick={submitCourseData}
                    >
                      Submit
                    </button>
                  </Spin>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseCreateArea;
