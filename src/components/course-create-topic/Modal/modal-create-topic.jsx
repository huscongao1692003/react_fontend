import { useState } from "react";

function CreateTopic({ courseData, setCourseData }) {
  const [step, setStep] = useState(1);

  const [topicData, setTopicData] = useState({
    typeFile: "",
    lessonId: "",
    url: "",
    name: "",
    index: 1,
    listAssignment: [],
  });

  const handleSubmitCreateNewTopic = () => {
    setCourseData({
      ...courseData,
      lessons: [...courseData?.lessons, topicData],
    });
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
              Add New Topic
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
                        id="text"
                        value={"text"}
                        checked={topicData?.typeFile == "text"}
                        onChange={(e) =>
                          setTopicData({
                            ...topicData,
                            typeFile: e.target.value,
                          })
                        }
                      />
                      <label class="form-check-label" for="text">
                        Text
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
                  <div className="mb-3">
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
                  </div>
                  <div className="mb-3">
                    <label class="form-check-label" for="flexRadioDefault2">
                      Url
                    </label>
                    <input
                      type="text"
                      placeholder="Enter url"
                      className="form-control ng-untouched ng-pristine ng-invalid"
                      value={topicData?.url}
                      onChange={(e) => {
                        setTopicData({
                          ...topicData,
                          url: e.target.value,
                        });
                      }}
                    />
                  </div>
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

export default CreateTopic;
