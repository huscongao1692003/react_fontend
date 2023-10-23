import { useState, useRef } from "react";
import axios from "axios";
import { headers } from "@/next.config";

function CourseCreateArea() {
  const [courseData, setCourseData] = useState({
    price: "",
    information: "",
    style: "",
    skill: "",
    status: "",
    courseId: "",
    image: "",
    description: "",
    courseTitle: "",
    category: "",
  });

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setCourseData({ ...courseData, image: selectedFile });
  };

  const submitCourseData = async () => {
    try {
      if (localStorage.getItem("accessToken")) {
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer${accessToken}`,
        };
        const url =
          "https://drawproject-production.up.railway.app/api/v1/courses";

        const response = await axios.post(url, courseData, { headers });
        if (response.data.status != "BAD_REQUEST") {
          alert("Create course successfully");
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
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
                      <input
                        placeholder="Select your category"
                        className="form-control"
                        type="number"
                        onChange={(e) => {
                          setCourseData({
                            ...courseData,
                            category: parseInt(e.target.value),
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label for="inputLastName" className="small mb-1">
                        Style
                      </label>
                      <input
                        type="number"
                        placeholder="Select your style"
                        className="form-control"
                        onChange={(e) => {
                          setCourseData({
                            ...courseData,
                            style: parseInt(e.target.value),
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label for="inputOrgName" className="small mb-1">
                        Skill
                      </label>
                      <input
                        type="number"
                        placeholder="Select your skill"
                        className="form-control"
                        onChange={(e) => {
                          setCourseData({
                            ...courseData,
                            skill: parseInt(e.target.value),
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label for="inputLocation" className="small mb-1">
                        Price
                      </label>
                      <input
                        type="integer"
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
                  <button
                    type="button"
                    className="tp-btn"
                    onClick={submitCourseData}
                  >
                    Submit
                  </button>
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
