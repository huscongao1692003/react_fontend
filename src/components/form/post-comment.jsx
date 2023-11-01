import React, { useState, useEffect } from "react";
import { Typography, Rating } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import { Spin, message, Space } from 'antd';



const PostComment = () => {
  const [rating, setRating] = useState(5);
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);
  const [userId, setUserId] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const { id } = router.query;
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };
  const handleFeedbackTextChange = (e) => {
    setFeedbackText(e.target.value);
  };

  useEffect(() => {
  
    if (accessToken) {
      axios
        .get(`https://drawproject-production.up.railway.app/api/v1/users/id`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          setUserId(response.data);
          console.log(response.data)
        })
        .catch((error) => {
          console.error("Error fetching user ID:", error);
        });
    }
  }, [accessToken]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedbackData = {
      star: rating, 
      userId: userId,
      feedbackInformation: feedbackText,
    };
  
    try {
      const loadingMessage = message.loading('Processing feedback...', 0);
        setIsloading(true);
      const response = await axios.post(`https://drawproject-production.up.railway.app/api/v1/courses/${id}/feedback`, feedbackData,
      { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      loadingMessage("Feedback successfull");
      setIsloading(false);
    } catch (error) {
     
      alert("Error submitting feedback", error);
    }
  };
  

  return (
    <>
    
    <div className="postbox__comment-form">
      <h3 className="postbox__comment-form-title">Write a feedback</h3>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <Typography 
            className="pb-20"
          component="legend">
            Give us a STAR!!!
          </Typography>
          <Rating
            size="large"
            className="pb-20"
            name="rating"
            value={rating}
            precision={1}
            onChange={handleRatingChange}
          />
          <div className="col-xxl-12">
            <div className="postbox__comment-input">
            <textarea
                name="feedbackText"
                placeholder="Enter your feedback ..."
                value={feedbackText}
                onChange={handleFeedbackTextChange}
              ></textarea>
            </div>
          </div>
          <div className="col-xxl-12">
            <div className="postbox__comment-btn">
            <Spin spinning={isLoading}>
              <button type="submit" className="tp-btn">
                Feedback
              </button>
              </Spin>
            </div>
          </div>
        </div>
      </form>
    </div>
    </>
  );
};

export default PostComment;
