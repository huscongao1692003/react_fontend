import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Spin, message } from "antd";
import { useStore, actions } from "@/src/store";
import { Image } from 'antd';
import Backdrop from '@mui/material/Backdrop';

function CourseCreateArea() {
  const [courseData, setCourseData] = useState({
    price: 0,
    information: "",
    style: 1,
    skill: 1,
    courseId: 0,
    image: null,
    description: "",
    courseTitle: "",
    category: 1,
  });

  const [err, setErr] = useState("");
  const router = useRouter();
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [styles, setStyles] = useState([]); // State variable to store styles data
  const [categories, setCategories] = useState([]); // State variable to store categories data
  const [skills, setSkills] = useState([]); // State variable to store skills data
  const [state, dispatch] = useStore();
  const [imagePre, setImagePre] = useState("");
  const [isOverlay, setIsOverlay] = useState(true);

  const error = (notifi) => {
    message.error(err);
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
    handleUpload(e);
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      setImagePre(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const submitCourseData = async () => {
    const loadingMessage = message.loading("Processing...", 0);
    setIsloading(true);

    if (courseData.courseTitle.length < 6) {
      setErr('Course title must be at least 6 characters long.');
      loadingMessage();
      setIsloading(false);
      return;
    } else if (courseData.description.length < 5) {
      setErr('Description must be at least 5 characters long.');
      loadingMessage();
      setIsloading(false);
      return;
    } else if (courseData.information.length < 5) {
      setErr('Information must be at least 5 characters long.');
      loadingMessage();
      setIsloading(false);
      return;
    } else if (courseData.description.length > 255) {
      setErr('Description must not exceed 255 characters.');
      loadingMessage();
      setIsloading(false);
      return;
    } else if(!courseData.image) {
      setErr('Please upload an image.');
      loadingMessage();
      setIsloading(false);
      return;
    }
      
    
    try {
      console.log(courseData);
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
          const delayDuration = 1500; // 3 seconds (adjust as needed)
          setTimeout(() => {
            window.location.reload();
          }, delayDuration);
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
    const loadingMessage = message.loading('Loading...', 0);
    setIsOverlay(true);
    const fetchData = async () => {
      try {
        if (Object.keys(state.data).length != 0) {
          setCourseData({
            ...courseData,
            courseTitle: state.data.courseTitle,
            price: state.data.price,
            information: state.data.information,
            style: state.data.drawingStyleId,
            skill: state.data.skillId,
            courseId: state.data.courseId,
            image: null,
            description: state.data.description,
            category: state.data.categoryId,
            image: state.data.image,
          });
          setImagePre(state.data.image);
          dispatch(actions.setValueCourse({}));
        }

        const stylesResponse = await axios.get(
          "https://drawproject-production-012c.up.railway.app/api/v1/style"
        );
        const categoriesResponse = await axios.get(
          "https://drawproject-production-012c.up.railway.app/api/v1/category"
        );
        const skillsResponse = await axios.get(
          "https://drawproject-production-012c.up.railway.app/api/v1/skill"
        );

        setStyles(stylesResponse.data.data);
        setCategories(categoriesResponse.data);
        setSkills(skillsResponse.data);
        setIsOverlay(false);
        loadingMessage();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    {isOverlay ? (
        <div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer - 190 }}
            open={isOverlay}
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          ></Backdrop>
        </div>
      ) : (
        ""
      )}
      {err !== "" && successMsg === ""
        ? error()
        : err === "" && successMsg !== "" && success()}
      <div className="container-xl px-4">
        <div className="row gx-4">
          <div className="col-md-4">
            <div className="card bg-transparent">
              <div className="card-header">Course Picture</div>
              <div className="card-body text-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />

                  <Image
                    src={imagePre === "" ? "https://as1.ftcdn.net/v2/jpg/01/94/55/90/1000_F_194559085_coSk1DYPdHWAYxI74GM9VjyAL4x7OjSq.jpg" : imagePre}
                    onError={(e) => (e.target.src = "https://as1.ftcdn.net/v2/jpg/01/94/55/90/1000_F_194559085_coSk1DYPdHWAYxI74GM9VjyAL4x7OjSq.jpg",
                                      message.error("Error loading image", 2))}
                    alt=""
                    width={290}
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
            <Spin spinning={isLoading}>
              <div className="submit-course mt-4 mb-3" style={{textAlign: "center"}}>
                <button
                  type="button"
                  className="tp-btn"
                  onClick={submitCourseData}
                >
                  Submit
                </button>
              </div>
            </Spin>
          </div>
          <div className="col-md-8">
            <div className="card mb-4 bg-transparent">
              <div className="card-header">Course Details</div>
              <div className="card-body">
                <form
                  noValidate=""
                  className="ng-untouched ng-pristine ng-valid"
                >
                  <div className="row">
                    <div className="mb-3 col-md-8">
                      <label htmlFor="inputUsername" className="small mb-1">
                        Course Title
                      </label>
                      <input
                        id="inputCourseTitle"
                        type="text"
                        placeholder="Enter course title"
                        className="form-control bg-transparent color-border-form-dashboard"
                        maxLength={40}
                        required
                        value={courseData.courseTitle}
                        onChange={(e) => {
                          setCourseData({
                            ...courseData,
                            courseTitle: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3 col-md-4">
                      <label htmlFor="inputLocation" className="small mb-1">
                        Price
                      </label>
                      <div className="input-price d-flex custom-input-price-course">
                        <span>$</span>
                        <input
                          type="number"
                          placeholder="Enter your price"
                          className="form-control bg-transparent color-border-form-dashboard"
                          required
                          value={courseData.price}
                          onChange={(e) => {
                            if (e.target.value < 0) {
                              e.target.value = 0;
                            } else if (e.target.value > 999999) {
                              e.target.value = 999999;
                            }
                            setCourseData({
                              ...courseData,
                              price: parseInt(e.target.value),
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 col-md-4">
                      <label htmlFor="inputFirstName" className="small mb-1">
                        Category
                      </label>
                      <select
                        className="form-control bg-transparent color-border-form-dashboard"
                        value={courseData.category}
                        onChange={(e) => {
                          setCourseData({
                            ...courseData,
                            category: parseInt(e.target.value),
                          });
                        }}
                      >
                        {categories.map((category) => (
                          <option
                            key={category.categoryId}
                            value={category.categoryId}
                          >
                            {category.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3 col-md-4">
                      <label htmlFor="inputLastName" className="small mb-1">
                        Style
                      </label>
                      <select
                        className="form-control bg-transparent color-border-form-dashboard"
                        value={courseData.style}
                        onChange={(e) => {
                          setCourseData({
                            ...courseData,
                            style: parseInt(e.target.value),
                          });
                        }}
                      >
                        {styles.map((style) => (
                          <option
                            key={style.drawingStyleId}
                            value={style.drawingStyleId}
                          >
                            {style.drawingStyleName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3 col-md-4">
                      <label htmlFor="inputOrgName" className="small mb-1">
                        Skill
                      </label>
                      <select
                        className="form-control bg-transparent color-border-form-dashboard"
                        value={courseData.skill}
                        onChange={(e) => {
                          setCourseData({
                            ...courseData,
                            skill: parseInt(e.target.value),
                          });
                        }}
                      >
                        {skills.map((skill) => (
                          <option key={skill.skillId} value={skill.skillId}>
                            {skill.skillName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="inputUsername" className="small mb-1">
                      Description
                    </label>
                    <textarea
                      className="form-control bg-transparent color-border-form-dashboard"
                      id="exampleFormControlTextarea1"
                      rows="4"
                      required
                      value={courseData.description}
                      onChange={(e) => {
                        setCourseData({
                          ...courseData,
                          description: e.target.value,
                        });
                      }}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="inputUsername" className="small mb-1">
                      Information
                    </label>
                    <textarea
                      className="form-control bg-transparent color-border-form-dashboard"
                      id="exampleFormControlTextarea1"
                      rows="4"
                      required
                      value={courseData.information}
                      onChange={(e) => {
                        setCourseData({
                          ...courseData,
                          information: e.target.value,
                        });
                      }}
                    ></textarea>
                  </div>
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
