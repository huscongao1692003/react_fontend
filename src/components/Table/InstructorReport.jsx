import { useState } from "react";
import axios from "axios";
import { message, Image, Spin } from 'antd'; // Import Spin from Ant Design

// Define the placeholder image source
const placeholderImage = "/assets/img/report.jpg";
const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

function CourseCreateArea() {
  const [reportData, setReportData] = useState({
    studentId: "",
    courseId: "",
    message: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreview(null);
    }

    setReportData({ ...reportData, image: selectedFile });
  };

  const submitReportData = async () => {
    try {
      setLoading(true); // Set loading to true when starting the request

      const url = "https://drawproject-production-012c.up.railway.app/api/v1/courses/student/report";
      const formData = new FormData();
      formData.append("studentId", reportData.studentId);
      formData.append("courseId", reportData.courseId);
      formData.append("message", reportData.message);
      formData.append("image", reportData.image);

      const response = await axios.post(url, formData, {
        headers:{
          Authorization: `Bearer ${accessToken}`,
        }
      });

      if (response.data.status !== "BAD_REQUEST" && response.data.status !== "NOT_FOUND" && response.data.status !== "CONFLICT") {
        message.success("Report sent successfully");
        setReportData({
          studentId: "",
          courseId: "",
          message: "",
          image: null,
        });
        setImagePreview(null);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code other than 2xx
        const errorMessage = error.response.data.message;
        message.error(errorMessage);
      } else if (error.request) {
        // The request was made but no response was received
        message.error("No response received from the server");
      } else {
        // Other errors
        message.error("Something went wrong");
      }
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false when the request is completed
    }
  };

  return (
    <>
      <div className="reportContainer ">
        <div className="container-xl px-4 mt-100 mb-100">
          <div className="row gx-4">
            <div className="">
              <div className="card bg-transparent color-border-form-dashboard">
                <div className="card-header text-center">Report</div>
                <div className="card-body text-center">
                  <input
                    type="file"
                    onChange={handleFileChange}
                  />
                  {/* Add the placeholder image */}
                  <Image
                    src={imagePreview || placeholderImage}
                    alt="Selected"
                    style={{ maxWidth: '100%', maxHeight: '200px' }}
                  />
                  <div className="mb-3">
                    <label htmlFor="reportMessage" className="small mb-1">
                      Message
                    </label>
                    <textarea
                      id="reportMessage"
                      rows="3"
                      className="form-control bg-transparent color-border-form-dashboard"
                      placeholder="Input report message here."
                      value={reportData.message}
                      onChange={(e) => setReportData({ ...reportData, message: e.target.value })}
                    ></textarea>
                  </div>
                  <label htmlFor="courseId" className="small mb-1">Course ID</label>
                  <input
                    type="number"
                    id="courseId"
                    placeholder="Input Course Id"
                    className="form-control mb-3 bg-transparent color-border-form-dashboard"
                    value={reportData.courseId}
                    onChange={(e) => setReportData({ ...reportData, courseId: parseInt(e.target.value) })}
                  />

                  <label htmlFor="studentId" className="small mb-1">Student ID</label>
                  <input
                    type="number"
                    id="studentId"
                    placeholder="Input Student Id"
                    className="form-control mb-3 bg-transparent color-border-form-dashboard"
                    value={reportData.studentId}
                    onChange={(e) => setReportData({ ...reportData, studentId: parseInt(e.target.value) })}
                  />

                  <button
                    type="button"
                    className="tp-btn"
                    onClick={submitReportData}
                    disabled={loading} // Disable the button while loading
                  >
                    {loading ? <Spin /> : "Submit Report"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseCreateArea;
