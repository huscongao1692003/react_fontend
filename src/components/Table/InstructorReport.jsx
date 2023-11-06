import { useState } from "react";
import axios from "axios";
import { message, Image } from 'antd';

// Define the placeholder image source
const placeholderImage = "/assets/img/report.jpg";

function CourseCreateArea() {
  const [reportData, setReportData] = useState({
    studentId: 1,
    courseId: 1,
    message: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

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
      const url = "https://drawproject-production-012c.up.railway.app/api/v1/courses/student/report";
      const formData = new FormData();
      formData.append("studentId", reportData.studentId);
      formData.append("courseId", reportData.courseId);
      formData.append("message", reportData.message);
      formData.append("image", reportData.image);

      const response = await axios.post(url, formData);
      if (response.data.status !== "BAD_REQUEST") {
        message.success("Report sent successfully");
        setReportData({
          studentId: 1,
          courseId: 1,
          message: "",
          image: null,
        });
        setImagePreview(null);
      } else {
        message.error("Failed to send report");
      }
    } catch (error) {
      message.error("Something went wrong");
      console.error(error);
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
                    className="form-control mb-3 bg-transparent color-border-form-dashboard"
                    value={reportData.courseId}
                    onChange={(e) => setReportData({ ...reportData, courseId: parseInt(e.target.value) })}
                  />

                  <label htmlFor="studentId" className="small mb-1">Student ID</label>
                  <input
                    type="number"
                    id="studentId"
                    className="form-control mb-3 bg-transparent color-border-form-dashboard"
                    value={reportData.studentId}
                    onChange={(e) => setReportData({ ...reportData, studentId: parseInt(e.target.value) })}
                  />

                  <button
                    type="button"
                    className="tp-btn"
                    onClick={submitReportData}
                  >
                    Submit Report
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
