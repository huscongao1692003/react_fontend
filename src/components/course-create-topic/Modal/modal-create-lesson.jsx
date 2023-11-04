import { headers } from "@/next.config";
import axios from "axios";
import { useState } from "react";

const generateUniqueFileName = (file) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const originalFileName = file.name;
  const fileExtension = originalFileName.split(".").pop();
  const uniqueFileName = `${timestamp}-${randomString}.${fileExtension}`;
  return uniqueFileName;
};
function CreateLesson({ courseData, setCourseData, courseId, setReload }) {
  const [step, setStep] = useState(1);

  const [topicData, setTopicData] = useState({
    typeFile: "",
    lessonId: "",
    url: "",
    name: "",
    index: 1,
    listAssignment: [],
  });

  const [lessonData, setLessonData] = useState({
    files: [],
    assignmentTitle: "",
    typeFile: "video",
    number: 2,
    url: "https://www.youtube.com/watch?v=57NtbLWUTzI",
  });

  const handleSubmitCreateNewTopic = async () => {
    // const url = `https://drawproject-production.up.railway.app/api/v1/courses/${courseId}/topic`;
    const url = `https://drawproject-production.up.railway.app/api/v1/assignments`;
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      "Content-Type":
        topicData.typeFile === "video"
          ? "application/json"
          : "multipart/form-data",
      Authorization: `Bearer ${accessToken}`,
    };
    const formData = new FormData();
    if (topicData.typeFile === "video") {
      formData.append("files", lessonData?.files);
    } else {
      for (let i = 0; i < lessonData.files.length; i++) {
        const uniqueFileName = generateUniqueFileName(lessonData.files[i]);
        formData.append("files", lessonData.files[i], uniqueFileName);
      }
    }
    formData.append("assignmentTitle", lessonData.assignmentTitle);
    try {
      const response = await axios.post(url, lessonData, { headers: config });
      if (response.data.status === "OK") {
        alert("success");
        setReload(true);
        setTimeout(() => {
          setReload(false);
        }, 500);
        // setCourseData({
        //   ...courseData,
        //   lessons: [...courseData?.lessons, topicData],
        // });
        // setLessonData({
        //   topic: "",
        //   files: [],
        // });
      } else {
        console.error(response);
      }
      // You can process the response data here
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      className="modal fade"
      id="modalTopic"
      tabindex="-1"
      aria-labelledby="modalTopicLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalTopicLabel">
              Add New Lesson
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form novalidate="" className="ng-untouched ng-pristine ng-invalid">
              {step == 1 ? (
                <>
                  <div className="mb-3">
                    <label for="inputEmailAddress" className="small mb-1">
                      Type file
                    </label>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        value={"pdf"}
                        checked={topicData?.typeFile == "pdf"}
                        onChange={(e) =>
                          setTopicData({
                            ...topicData,
                            typeFile: e.target.value,
                          })
                        }
                        id="pdf"
                      />
                      <label class="form-check-label" for="pdf">
                        PDF
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="image"
                        value={"image"}
                        checked={topicData?.typeFile == "image"}
                        onChange={(e) =>
                          setTopicData({
                            ...topicData,
                            typeFile: e.target.value,
                          })
                        }
                      />
                      <label class="form-check-label" for="image">
                        Image
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="video"
                        value={"video"}
                        checked={topicData?.typeFile == "video"}
                        onChange={(e) =>
                          setTopicData({
                            ...topicData,
                            typeFile: e.target.value,
                          })
                        }
                      />
                      <label class="form-check-label" for="video">
                        Video
                      </label>
                    </div>
                  </div>
                  {topicData?.typeFile && (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-success pl-3 pr-3"
                      style={{ padding: "6px 30px" }}
                      onClick={() => {
                        setStep(2);
                      }}
                    >
                      Next
                    </button>
                  )}
                </>
              ) : (
                <>
                  {/* <div className="mb-3">
                    <label for="inputEmailAddress" className="small mb-1">
                      Lesson Id
                    </label>
                    <input
                      type="number"
                      placeholder="Enter lesson id"
                      className="form-control ng-untouched ng-pristine ng-invalid"
                      value={topicData?.lessonId}
                      onChange={(e) => {
                        setTopicData({
                          ...topicData,
                          lessonId: parseInt(e.target.value),
                        });
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label for="inputEmailAddress" className="small mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter name"
                      className="form-control ng-untouched ng-pristine ng-invalid"
                      value={topicData?.name}
                      onChange={(e) => {
                        setTopicData({
                          ...topicData,
                          name: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label for="inputEmailAddress" className="small mb-1">
                      Index
                    </label>
                    <input
                      type="number"
                      placeholder="Enter index"
                      className="form-control ng-untouched ng-pristine ng-invalid"
                      value={topicData?.index}
                      onChange={(e) => {
                        setTopicData({
                          ...topicData,
                          index: parseInt(e.target.value),
                        });
                      }}
                    />
                  </div> */}
                  <div className="mb-3">
                    <label for="inputEmailAddress" className="small mb-1">
                      Topic
                    </label>
                    <input
                      type="text"
                      placeholder="Enter topic"
                      className="form-control ng-untouched ng-pristine ng-invalid"
                      value={lessonData?.assignmentTitle}
                      onChange={(e) => {
                        setLessonData({
                          ...lessonData,
                          assignmentTitle: e.target.value,
                        });
                      }}
                    />
                  </div>
                  {topicData?.typeFile === "video" ? (
                    <div className="mb-3">
                      <label class="form-check-label" for="flexRadioDefault2">
                        Url
                      </label>
                      <input
                        type="text"
                        placeholder="Enter url"
                        className="form-control ng-untouched ng-pristine ng-invalid"
                        // value={topicData?.url}
                        onChange={(e) => {
                          setLessonData({
                            ...lessonData,
                            files: e.target.value,
                          });
                        }}
                      />
                    </div>
                  ) : (
                    <div className="mb-3">
                      <label class="form-check-label" for="flexRadioDefault2">
                        File
                      </label>
                      <input
                        type="file"
                        multiple
                        className="form-control ng-untouched ng-pristine ng-invalid"
                        onChange={(e) => {
                          setLessonData({
                            ...lessonData,
                            files: e.target.files,
                          });
                        }}
                      />
                    </div>
                  )}
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-success pl-3 pr-3"
                    style={{ padding: "6px 30px" }}
                    onClick={() => {
                      setStep(1);
                    }}
                  >
                    Back
                  </button>
                </>
              )}
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSubmitCreateNewTopic}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateLesson;
