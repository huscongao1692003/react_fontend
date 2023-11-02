import axios from "axios";
import { useState } from "react";

function CreateAssignment({ courseData, setCourseData }) {
  const [topicId, setTopicId] = useState(null);
  const [lessonData, setLessonData] = useState({
    assignmentId: null,
    assignmentTitle: "",
    topic: "",
    number: null,
    compulsory: null,
    lessonId: null,
    status: "",
  });

  const TopicIdHTML = courseData?.lessons?.map((topic, index) => (
    <option value={topic?.lessonId} key={index}>
      {topic.name}
    </option>
  ));

  const createNewLesson = async () => {
    let newLessonData = [...courseData?.lessons];
    let newLessons = [];

    newLessonData.forEach((lesson, index) => {
      if (lesson?.lessonId == topicId) {
        lesson?.listAssignment?.push(lessonData);
      }
      newLessons.push(lesson);
    });

    const url = `https://drawproject-production.up.railway.app/api/v1/assignments`;
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    try {
      const response = await axios.post(url, lessonData, { headers: config });
      if (response.data.status === "OK") {
        alert("success");
        setCourseData({ ...courseData, lessons: newLessons });
        setLessonData({
          assignmentId: null,
          assignmentTitle: "",
          topic: "",
          number: null,
          lessonId: null,
          compulsory: null,
          status: "",
        });
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
      id="modalLesson"
      tabindex="-1"
      aria-labelledby="modalLessonLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalLessonLabel">
              Add New Assignment
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
              <div className="mb-3">
                <label for="inputEmailAddress" className="small mb-1">
                  Topic Id
                </label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  value={topicId}
                  onChange={(e) => {
                    setTopicId(e.target.value);
                    setLessonData({ ...lessonData, lessonId: topicId });
                  }}
                >
                  <option selected disabled>
                    Choose the lesson 
                  </option>
                  {TopicIdHTML}
                </select>
              </div>
              <div className="mb-3">
                <label for="inputEmailAddress" className="small mb-1">
                  Assignment Id
                </label>
                <input
                  type="number"
                  placeholder="Enter lesson id"
                  className="form-control ng-untouched ng-pristine ng-invalid"
                  value={lessonData?.lessonId}
                  onChange={(e) => {
                    setLessonData({
                      ...lessonData,
                      assignmentId: parseInt(e.target.value),
                    });
                  }}
                />
              </div>
              <div className="mb-3">
                <label for="inputEmailAddress" className="small mb-1">
                  Assignment Title
                </label>
                <input
                  type="text"
                  placeholder="Enter name"
                  className="form-control ng-untouched ng-pristine ng-invalid"
                  value={lessonData?.name}
                  onChange={(e) => {
                    setLessonData({
                      ...lessonData,
                      assignmentTitle: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="mb-3">
                <label for="inputEmailAddress" className="small mb-1">
                  Number
                </label>
                <input
                  type="number"
                  placeholder="Enter index"
                  className="form-control ng-untouched ng-pristine ng-invalid"
                  value={lessonData?.index}
                  onChange={(e) => {
                    setLessonData({
                      ...lessonData,
                      index: parseInt(e.target.value),
                    });
                  }}
                />
              </div>
              <div className="mb-3">
                <label class="form-check-label" for="flexRadioDefault2">
                  Topic
                </label>
                <input
                  type="text"
                  placeholder="Enter url"
                  className="form-control ng-untouched ng-pristine ng-invalid"
                  value={lessonData?.url}
                  onChange={(e) => {
                    setLessonData({
                      ...lessonData,
                      topic: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="mb-3">
                <label for="inputEmailAddress" className="small mb-1">
                  Status
                </label>
                <input
                  type="text"
                  placeholder="Enter name"
                  className="form-control ng-untouched ng-pristine ng-invalid"
                  value={lessonData?.status}
                  onChange={(e) => {
                    setLessonData({
                      ...lessonData,
                      status: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="mb-3">
                <label for="inputEmailAddress" className="small mb-1">
                  Compulsory
                </label>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    value={true}
                    checked={lessonData?.compulsory == "true"}
                    onChange={(e) =>
                      setLessonData({
                        ...lessonData,
                        compulsory: e.target.value,
                      })
                    }
                    id="true"
                  />
                  <label class="form-check-label" for="true">
                    True
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    value={false}
                    checked={lessonData?.compulsory == "false"}
                    onChange={(e) =>
                      setLessonData({
                        ...lessonData,
                        compulsory: e.target.value,
                      })
                    }
                    id="false"
                  />
                  <label class="form-check-label" for="false">
                    False
                  </label>
                </div>
              </div>
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
              onClick={createNewLesson}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAssignment;
