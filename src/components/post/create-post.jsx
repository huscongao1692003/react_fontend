import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Spin, message } from "antd";
import { Image } from "antd";
import TextEditor from "../editor/EditorComponent ";

function CourseCreateArea() {
  const [courseData, setCourseData] = useState({
    title: "",
    categoryId: 1,
    description: "",
    readingTime: 0,
    requestImage: null,
    body: "",
  });

  const fileInputRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [imagePre, setImagePre] = useState("");
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);

  // Add state variables for input validation errors
  const [titleError, setTitleError] = useState("");
  const [categoryIdError, setCategoryIdError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [readingTimeError, setReadingTimeError] = useState("");


  const checkReadingTime = (e) => {
    let readingTime = e.target.value;
    if (e.target.value < 0) {
      e.target.value = 0;
      readingTime = 0;
    } else if (e.target.value > 999) {
      e.target.value = e.target.value.substring(0, 3);
      readingTime = e.target.value.substring(0, 3);
    }
    console.log("reading time: ", readingTime);
    setCourseData({
      ...courseData,
      readingTime: parseInt(readingTime),
    });
  };

  const error = () => {
    message.error(err);
    message.config({
      maxCount: 3,
    });
    setErr("");
  };

  const success = () => {
    message.success("Create successful");
    message.config({
      maxCount: 1,
    });
    setSuccessMsg("");
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setCourseData({ ...courseData, requestImage: selectedFile });
    handleUpload(e);
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      setImagePre(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleDescriptionChange = (e) => {
    const description = e.target.value;
    setCourseData({ ...courseData, description });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://drawproject-production-012c.up.railway.app/api/v1/category"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const submitPostImage = async (list) => {
    //get list images from react-quill editor
    const images = courseData.body.match(/<img[^>]+src="([^">]+)"/g);
    //get src from <img>
    const imageUrls = images.map((image) => {
      const matches = image.match(/<img[^>]+src="([^">]+)"/);
      return matches[1];
    });
    //fetch images
    try {
      if (!localStorage.getItem("accessToken")) {
        return;
      }
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const url =
        "https://drawproject-production-012c.up.railway.app/api/v1/post/save-image";
      const formData = new FormData();
      for (const element of list) {
        formData.append("images", element);
      }
      const response = await axios.post(url, formData, { headers });
      if (response.status === 200) {
        setImageToContent(response.data);
      }
    } catch (error) {
      console.log(error);
    }

  }

  function setImageToContent(imgConvert) {
    //get list images from react-quill editor
    const images = courseData.body.match(/<img[^>]+src="([^">]+)"/g);
    //change src of <img> to new src
    const updatedImages = images.map((image, index) => {
      const updatedImage = image.replace(/src="([^">]+)"/, `src="${imgConvert[index]}"`);
      return updatedImage;
    });
    //update <img> after change src
    const updatedContent = courseData.body.replace(/<img[^>]+src="([^">]+)"/g, () => updatedImages.shift());
    //set new content to stored content
    setCourseData({ ...courseData, body: updatedContent });
  }

  const submitPostData = async () => {
    setImages(images.filter(function (obj) {
      return tags.includes(obj.id);
    }));
    //convert to list multipart files
    let list = images.map(item => item.file);
    //get image
    if (list.length > 0) {
      try {
        await submitPostImage(list);
      } catch (error) {
        // Xử lý lỗi nếu cần thiết
        console.log(error);
      }
    }
    console.log("courseData: ", courseData);

    // Clear previous error messages
    setErr("");

    const loadingMessage = message.loading('Uploading your post...', 0);

    // Validation checks
    if (!courseData.title) {
      setErr("Title is required");
    }
    else if (!courseData.description) {
      setErr("Description is required");
    }
    else if (!courseData.readingTime) {
      setErr("Reading Time is required");
    }
    else if (courseData.requestImage == null) {
      setErr("Thumbnail is required");
    }

    if (err !== "") {
      loadingMessage();
      return;
    }

    try {
      if (localStorage.getItem("accessToken")) {
        setLoading(true);
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        };
        const url =
          "https://drawproject-production-012c.up.railway.app/api/v1/post";
        const formData = new FormData();
        formData.append("title", courseData.title);
        formData.append("categoryId", courseData.categoryId);
        formData.append("description", courseData.description);
        formData.append("readingTime", courseData.readingTime);
        formData.append("requestImage", courseData.requestImage);
        formData.append("body", courseData.body);
        setIsloading(true);
        const response = await axios.post(url, formData, { headers });

        if (response.status === 201) {
          setErr("");
          setSuccessMsg("You have successfully created a post.");
          const delayDuration = 1500;
          setIsloading(false);
          setTimeout(() => {
            window.location.reload();
          }, delayDuration);
          loadingMessage();
        }
      }
    } catch (e) {
      loadingMessage();
      setIsloading(false);
    }

    setLoading(false);
    setIsloading(false);
  };

  return (
    <>
      {err !== "" && successMsg === ""
        ? error()
        : err === "" && successMsg !== "" && success()}
      <div className="px-4 mt-100 mb-100 row">
        <div className="row gx-4 col-xl-4">
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
                      setCourseData({ ...courseData, title: e.target.value })
                    }
                  />
                  {titleError && (
                    <div className="text-danger">{titleError}</div>
                  )}
                </div>
                <div className="mb-3 row">
                  <div className="category col-md-8">
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
                      {categories.map((category) => (
                        <option
                          key={category.categoryId}
                          value={category.categoryId}
                        >
                          {category.categoryName}
                        </option>
                      ))}
                    </select>
                    {categoryIdError && (
                      <div className="text-danger">{categoryIdError}</div>
                    )}
                  </div>
                  <div className="reading-time col-md-4">
                    <label htmlFor="inputReadingTime" className="small mb-1">
                      Reading Time
                    </label>
                    <div className="input-reading-time position-relative">
                      <input
                        type="number"
                        className="form-control"
                        onChange={(e) => checkReadingTime(e)}
                        value={courseData.readingTime}
                      />
                      {readingTimeError && (
                        <div className="text-danger">{readingTimeError}</div>
                      )}
                      <p
                        className="position-absolute"
                        style={{
                          right: "0.5rem",
                          top: "0.3rem",
                          fontSize: "0.8rem",
                          color: "black",
                        }}
                      >
                        Minus
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="inputDescription" className="small mb-1">
                    Summary
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
                <div className="mb-3 text-center">
                  <Spin spinning={isLoading}>
                    <button
                      type="button"
                      className="tp-btn"
                      onClick={submitPostData}
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Submit"}{" "}
                      {/* Show loading or Submit text */}
                    </button>
                  </Spin>
                </div>
              </form>
            </div>
          </div>
          <div className="card">
            <div className="card-header text-center">Thumbnail</div>
            <div className="card-body text-center">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />

              <Image
                src={
                  imagePre === ""
                    ? "https://as1.ftcdn.net/v2/jpg/01/94/55/90/1000_F_194559085_coSk1DYPdHWAYxI74GM9VjyAL4x7OjSq.jpg"
                    : imagePre
                }
                alt=""
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
          <TextEditor courseData={courseData} setCourseData={setCourseData}
            images={images} setImages={setImages} setTags={setTags} />
        </div>
      </div>
    </>
  );
}

export default CourseCreateArea;
