import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Spin, message } from 'antd';

function CourseCreateArea() {
  const [courseData, setCourseData] = useState({
    title: "",
    categoryId: 0,
    description: "",
    readingTime: 0,
    requestImage: null,
    body: "",
  });

  const fileInputRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsloading] = useState(false);

  // Add state variables for input validation errors
  const [titleError, setTitleError] = useState("");
  const [categoryIdError, setCategoryIdError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [readingTimeError, setReadingTimeError] = useState("");
  const [bodyError, setBodyError] = useState("");

  const error = () => {
    message.error("Something has an error");
    message.config({
      maxCount: 3
    });
    setErr("");
  };

  const success = () => {
    message.success("Create successful");
    message.config({
      maxCount: 1
    });
    setSuccessMsg("");
  }

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setCourseData({ ...courseData, requestImage: selectedFile });
  };
  const handleDescriptionChange = (e) => {
    const description = e.target.value;
    setCourseData({ ...courseData, description });
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://drawproject-production.up.railway.app/api/v1/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const submitPostData = async () => {
    // Clear previous error messages
    setTitleError("");
    setCategoryIdError("");
    setDescriptionError("");
    setReadingTimeError("");
    setBodyError("");

    const loadingMessage = message.loading('Processing your post...', 0);
    setIsloading(true);

    // Validation checks
    if (!courseData.title) {
      setTitleError("Title is required");
    }
    if (!courseData.categoryId) {
      setCategoryIdError("Category is required");
    }
    if (!courseData.description) {
      setDescriptionError("Description is required");
    }
    if (!courseData.readingTime) {
      setReadingTimeError("Reading Time is required");
    }
    if (!courseData.body) {
      setBodyError("Body is required");
    }

    // If any validation error is found, do not submit the form
    if (titleError || categoryIdError || descriptionError || readingTimeError || bodyError) {
      setIsloading(false);
      return;
    }

    try {
      if (localStorage.getItem("accessToken")) {
        setLoading(true);
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        };
        const url = "https://drawproject-production.up.railway.app/api/v1/post";
        const formData = new FormData();
        formData.append("title", courseData.title);
        formData.append("categoryId", courseData.categoryId);
        formData.append("description", courseData.description);
        formData.append("readingTime", courseData.readingTime);
        formData.append("requestImage", courseData.requestImage);
        formData.append("body", courseData.body);

        const response = await axios.post(url, formData, { headers });

        if (response.status === 201) {
          setErr("");
          setSuccessMsg("You have successfully created a post.");
        }
      }
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
    loadingMessage();
    setIsloading(false);
  };

  return (
    <>
    {err !== "" && successMsg === "" ? error() : err === "" && successMsg !== "" && success()}
    <div className="container-xl px-4 mt-100 mb-100">
      <div className="row gx-4">
        {/* Your file input and image display code */}
        <div className="col-xl-4">
          <div className="card">
            <div className="card-header">Post Picture</div>
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
                {courseData?.requestImage?.name ? courseData?.requestImage?.name : "JPG or PNG no larger than 5 MB"}
              </div>
              <button
                type="button"
                className="tp-btn"
                onClick={handleButtonClick}
              >
                {courseData?.requestImage?.name ? "Change image" : "Upload new image"}
              </button>
            </div>
          </div>
        </div>
        
        <div className="col-xl-8">
          <div className="card mb-4">
            <div className="card-header">Post Details</div>
            <div className="card-body">
              <form noValidate>
                <div className="mb-3">
                  <label htmlFor="inputCourseTitle" className="small mb-1">
                    Title
                  </label>
                  <input
                    id="inputCourseTitle"
                    type="text"
                    placeholder="Enter title"
                    className="form-control"
                    onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                  />
                  {titleError && <div className="text-danger">{titleError}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="inputCategory" className="small mb-1">
                    Category
                  </label>
                  <select
                    className="form-control"
                    onChange={(e) => setCourseData({ ...courseData, categoryId: parseInt(e.target.value) })}
                  >
                    <option value={0}>Select a category</option>
                    {categories.map((category) => (
                      <option key={category.categoryId} value={category.categoryId}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                  {categoryIdError && <div className="text-danger">{categoryIdError}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="inputDescription" className="small mb-1">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    rows="3"
                    onChange={handleDescriptionChange}
                    value={courseData.description}
                  ></textarea>
                  {descriptionError && <div className="text-danger">{descriptionError}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="inputReadingTime" className="small mb-1">
                    Reading Time
                  </label>
                  <input
                    type="number"
                    placeholder="Enter reading time"
                    className="form-control"
                    onChange={(e) => setCourseData({ ...courseData, readingTime: parseInt(e.target.value) })}
                  />
                  {readingTimeError && <div className="text-danger">{readingTimeError}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="inputBody" className="small mb-1">
                    Body
                  </label>
                  <textarea
                    className="form-control"
                    rows="3"
                    onChange={(e) => setCourseData({ ...courseData, body: e.target.value })}
                  ></textarea>
                  {bodyError && <div className="text-danger">{bodyError}</div>}
                </div>
                <Spin spinning={isLoading}>
                  <button
                    type="button"
                    className="tp-btn"
                    onClick={submitPostData}
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"} {/* Show loading or Submit text */}
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
