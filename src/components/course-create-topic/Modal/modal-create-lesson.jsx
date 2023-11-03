import { useState,useEffect } from "react";
import axios from "axios";

function CreateLesson({ courseData, setCourseData, courseId }) {
 
  const [topicData, setTopicData] = useState({
    topicTitle: "",
    number: 0, // Assuming number is a default value you want to start with
  });
  const[topicIdData,setTopicIdData] = useState(0)

  useEffect(() => {
    const getTopics = async () => {
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
          setTopicIdData(response.data.data);
          const maxNumber = response.data.data.reduce(
            (max, topic) => Math.max(max, topic.number), 0
          );
          setTopicData({ ...topicData, number: maxNumber + 1 });
        } else {
          console.error(response);
        }
      } catch (e) {
        console.error(e);
      }
    };
    
    if (courseId) {
      getTopics();
    }
  }, [courseId]); // Only re-run the effect if courseId changes

  const handleSubmitCreateNewTopic = async () => {
    const url = `https://drawproject-production-012c.up.railway.app/api/v1/courses/${courseId}/topic`;
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
       
    try {
      const response = await axios.post(url, topicData, config);
      if (response.data.status === "OK") {
        alert("success");
        setCourseData({
          ...courseData,
          lessons: [...courseData?.lessons, topicData],
        });
        getCourseData();
       
      } else {
        console.error(response);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="modal fade" id="modalTopic" tabIndex="-1" aria-labelledby="modalTopicLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalTopicLabel">
              Add New Topic
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="topicTitle" className="form-label">Topic Title</label>
                <input type="text" className="form-control" id="topicTitle" value={topicData.topicTitle} onChange={(e) => setTopicData({ ...topicData, topicTitle: e.target.value })} />
              </div>
              <div className="mb-3">
                <label htmlFor="number" className="form-label">Number</label>
                <input type="number" className="form-control" id="number" value={topicData.number} onChange={(e) => setTopicData({ ...topicData, number: parseInt(e.target.value) })} />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-success" onClick={handleSubmitCreateNewTopic}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateLesson;
