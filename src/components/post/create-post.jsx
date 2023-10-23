import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

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
  const [descriptionError, setDescriptionError] = useState("");
  const [categories, setCategories] = useState([]);

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

      // Check description length and set error message if it exceeds the limit
      if (description.length > 250) {
          setDescriptionError("Description must not exceed 250 characters");
      } else {
          setDescriptionError("");
      }
  };

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
    try {
      if (localStorage.getItem("accessToken")) {
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
              alert("Post created successfully");
          }
      }
    } catch (e) {
        console.error(e);
    }
  };

  return (
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
                              {courseData?.requestImage?.name
                    ? courseData?.requestImage?.name
                    : "JPG or PNG no larger than 5 MB"}
                          </div>
                          <button
                              type="button"
                              className="tp-btn"
                              onClick={handleButtonClick}
                              >
                              {courseData?.requestImage?.name
                    ? "Change image"
                    : "Upload new image"}
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
                                      onChange={(e) =>
                      setCourseData({
                          ...courseData,
                          title: e.target.value,
                      })
                    }
                                  />
                              </div>
                              <div className="mb-3">
                  <label htmlFor="inputCategory" className="small mb-1">
                    Category
                  </label>
                  <select
                    className="form-control"
                    onChange={(e) =>
                      setCourseData({
                        ...courseData,
                        categoryId: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value={0}>Select a category</option>
                    {categories.map((category) => (
                      <option key={category.categoryId} value={category.categoryId}>
                        {category.categoryName}
                      </option>
                      ))}
                  </select>
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
                  {descriptionError && (
                    <div className="text-danger">{descriptionError}</div>
                  )}
                </div>
                              <div className="mb-3">
                                  <label htmlFor="inputReadingTime" className="small mb-1">
                                      Reading Time
                                  </label>
                                  <input
                                      type="number"
                                      placeholder="Enter reading time"
                                      className="form-control"
                                      onChange={(e) =>
                      setCourseData({
                          ...courseData,
                          readingTime: parseInt(e.target.value),
                      })
                    }
                                  />
                              </div>
                              <div className="mb-3">
                                  <label htmlFor="inputBody" className="small mb-1">
                                      Body
                                  </label>
                                  <textarea
                                      className="form-control"
                                      rows="3"
                                      onChange={(e) =>
                      setCourseData({
                          ...courseData,
                          body: e.target.value,
                      })
                    }
                                      ></textarea>
                              </div>
                              {/* Your submit button */}
                              <button
                                  type="button"
                                  className="tp-btn"
                                  onClick={submitPostData}
                                  >
                                  Submit
                              </button>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      );
}

export default CourseCreateArea;
