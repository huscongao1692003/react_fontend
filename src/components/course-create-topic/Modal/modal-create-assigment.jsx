import axios from "axios";
import { useState, useEffect } from "react";

function CreateAssignment({ courseData, setCourseData, courseId }) {
  const [topicId, setTopicId] = useState(null);
  const [topics, setTopics] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState("")
  const [lessonType, setLessonType] = useState("");
  const [newLessonNumber,setNewLessonNumber]= useState(1) // For storing the lesson type
  const [lessonData, setLessonData] = useState({
    // Updated state structure
    name: "",
    topic: "",
    number: null,
    lessonId: "",
    status: "",
    url: "",
    file: null,
  });
  const validateFields = () => {
    let tempErrors = {};
    tempErrors.topicId = topicId ? "" : "Topic must be selected.";
    // tempErrors.name = lessonData.name ? "" : "Lesson name is required.";
    tempErrors.typeFile = lessonType ? "" : "Lesson type is required.";
    tempErrors.url = lessonType === "video" && !lessonData.url ? "URL is required for video type." : "";
    setErrors(tempErrors);

    return Object.values(tempErrors).every(x => x === "");
  };
  const topicIdInt = parseInt(topicId);
  const getCourseData = async () => {
    const url = `https://drawproject-production-012c.up.railway.app/api/v1/courses/${courseId}/topic`;
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await axios.get(url, config);
      if (response.data.status === "OK") {
      
        // Assuming that response.data.data contains an array of all topics
        setTopics(response.data.data); // This line is changed
      } else {
        console.error(response);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    // Whenever topics or topicId changes, calculate the new lesson number
    const selectedTopic = topics.find(t => t.topicId.toString() === topicId);
    let maxLessonNumber = 0;

    if (selectedTopic && selectedTopic.lessons.length > 0) {
      maxLessonNumber = selectedTopic.lessons.reduce(
        (max, lesson) => Math.max(max, lesson.number), 0
      );
    }

    setNewLessonNumber(maxLessonNumber + 1);
  }, [topics, topicId]);
  useEffect(() => {
    if (courseId) {
      getCourseData();
    }
  }, [courseId]);
  const TopicIdHTML = topics.map((topic, index) => (
    <option value={topic.topicId} key={index}>
      {topic.topicTitle}
    </option>
  ));

  const createNewLesson = async () => {
    if (!validateFields()) {
      return;
    }
    setIsSubmitting(true);
    let newLessonData = [...courseData?.lessons];
    let newLessons = [];

    const selectedTopic = topics.find(t => t.topicId.toString() === topicId);

    const numberOfLessonsInTopic = selectedTopic
      ? selectedTopic.lessons.length
      : 0;

    newLessonData.forEach((lesson, index) => {
      if (lesson?.lessonId == topicId) {
        lesson?.listAssignment?.push(lessonData);
      }
      newLessons.push(lesson);
    });
    let maxLessonNumber = 0;
  
  
    if (selectedTopic && selectedTopic.lessons.length > 0) {
      maxLessonNumber = selectedTopic.lessons.reduce((max, lesson) => Math.max(max, lesson.number), 0);
    }
  

    const payload = {
      topicId: topicIdInt,
      number: newLessonNumber, // This will be the new lesson's number
      name: lessonData.assignmentTitle,
      typeFile: lessonType.toLowerCase(), // Ensure typeFile is lowercase
      ...(lessonType === "video" && { url: lessonData.url }),
    };
    const formData = new FormData();
    if (lessonType === "image" || lessonType === "pdf") {
      formData.append("number", newLessonNumber);
      formData.append("typeFile", lessonType.toLowerCase());
      formData.append("topicId", topicIdInt);
      formData.append("name", lessonData.assignmentTitle);
      formData.append("file", lessonData.file);
    } else {
      formData.append("number", newLessonNumber);
      formData.append("typeFile", lessonType.toLowerCase());
      formData.append("topicId", topicIdInt);
      formData.append("name", lessonData.assignmentTitle);
      formData.append("url", lessonData.url);
    }

    const url = `https://drawproject-production-012c.up.railway.app/api/v1/lessons`;
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        "Content-Type":
          lessonType === "video" ? "application/json" : "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await axios.post(url, formData, { headers: config });
      if (response.status === 200 || response.status === 201) {
        // Reload the page to update the data after successful creation
        window.location.reload();
      }
    } catch (e) {
      console.error(e);
    }
    finally {
      setIsSubmitting(false); // Set to false when submission ends, regardless of outcome
    }
  };
  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setLessonData({ ...lessonData, file: file });
    }
  };

  const handleLessonTypeChange = (event) => {
    setLessonType(event.target.value);
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
              <div className="mb-3">
                <label for="inputEmailAddress" className="small mb-1">
                  Topic Id
                </label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  value={topicId}
                  onChange={(e) => {
                    const newTopicId = e.target.value;
                    setTopicId(newTopicId);
                    // You don't need to set lessonId here, just topicId
                  }}
                >
                  <option selected disabled required>
                    Choose the Topic
                  </option>
                  {TopicIdHTML}
                </select>
                {errors.topicId && <div className="error">{errors.topicId}</div>}
              </div>
              <div className="mb-3">
            <label htmlFor="lessonType" className="small mb-1">
              Lesson Type
            </label>
            <select
              id="lessonType"
              required
              className="form-select"
              value={lessonType}
              onChange={handleLessonTypeChange}
            >
              <option value="">Select Type</option>
              <option value="video">Video</option>
              <option value="image">Image</option>
              <option value="pdf">PDF</option>
            </select>
            {errors.typeFile && <div className="error">{errors.typeFile}</div>}
          </div>

          {lessonType === "image" || lessonType === "pdf" ? (
            <div className="mb-3">
              <label htmlFor="fileUpload" className="small mb-1">
                Upload File
              </label>
              <input
                type="file"
                id="fileUpload"
                className="form-control"
                onChange={handleFileChange}
              />
            </div>
          ) : null}

          {lessonType === "video" ? (
            <div className="mb-3">
              <label htmlFor="videoUrl" className="small mb-1">
                Video URL
              </label>
              <input
                type="text"
                id="videoUrl"
                className="form-control"
                value={lessonData.url}
                onChange={(e) =>
                  setLessonData({ ...lessonData, url: e.target.value })
                }
              />
            </div>
          ) : null}
              <div className="mb-3">
                <label for="inputEmailAddress" className="small mb-1">
                  Lesson Name
                </label>
                <input
                required
                  type="text"
                  placeholder="Enter name"
                  className="form-control ng-untouched ng-pristine ng-invalid"
                  
                  onChange={(e) => {
                    setLessonData({
                      ...lessonData,
                      assignmentTitle: e.target.value,
                    });
                  }}
                />
                {/* {errors.name && <div className="error">{errors.name}</div>} */}

              </div>
              <div className="mb-3">
                <label for="inputEmailAddress" className="small mb-1">
                  Number
                </label>
                <input
                  type="number"
                  placeholder="index"
                  className="form-control ng-untouched ng-pristine ng-invalid"
                  value={newLessonNumber}
                  disabled
                  onChange={(e) => {
                    setLessonData({
                      ...lessonData,
                      index: parseInt(e.target.value),
                    });
                  }}
                />
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
              onClick={createNewLesson}disabled={isSubmitting} // Disable the button when submitting
              >
                {isSubmitting ? 'Adding...' : 'Add'} 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAssignment;
