import React, { useState, useEffect } from "react";
import { AutoComplete } from "antd";
import { useDebounce } from "@/hooks/debounce";
const axios = require("axios");
import { useStore, actions } from "@/src/store";
import Link from "next/link";

const defaultCourseImage = "/assets/img/course/course.jpg";

const renderCourse = (id, image, title, instructorName, type) => ({
  value: type + "" + id,
  title: title,
  label: (
    <Link href={`/course-details?id=${id}`}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ width: "10%", marginRight: "1rem" }}>
          <img
            src={image && image != null ? image : defaultCourseImage}
            alt="course-avatar"
            onError={(e) => {
              e.target.src = defaultCourseImage;
            }}
          />
        </div>
        <div
          className="content"
          style={{ display: "flex", flexDirection: "column", width: "80%" }}
        >
          <span
            style={{
              fontWeight: "bold",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </span>
          <span style={{ fontSize: "0.7rem" }}>
            <strong>Course</strong> {instructorName}
          </span>
        </div>
      </div>
    </Link>
  ),
});

const renderTag = (id, name, type) => ({
  value: type + "" + id,
  title: name,
  label: (
    <Link href={`/course-list`}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "10%",
            marginRight: "1rem",
            textAlign: "center",
            fontSize: "1rem",
          }}
        >
          <i className="fa-solid fa-tag"></i>
        </div>
        <div
          className="content"
          style={{ display: "flex", flexDirection: "column", width: "80%" }}
        >
          <span
            style={{
              fontWeight: "bold",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: "1rem",
            }}
          >
            {name}
          </span>
        </div>
      </div>
    </Link>
  ),
});

let options = [];

const SearchBar = ({ setIsSearching }) => {
  const [value, setValue] = useState("");
  const [courses, setCourses] = useState([]);
  const [tags, setTags] = useState({});
  const searchValueDebounce = useDebounce(value);
  const [state, dispatch] = useStore();
  const [searchValue, setSearchValue] = useState("");
  


  const onSelect = (data) => {
    dispatch(actions.setValueInputGlobal(data));
    setSearchValue(state.search)
  };

  const onChange = (data) => {
    options = [];
    if (data.length >= 2) {
      setValue(data);
    }
  };

  useEffect(() => {
    const fetchCoursesByStar = async () => {
      setIsSearching(true);
      try {
        const queryParams = {
          search: searchValueDebounce,
        };

        const url = `https://drawproject-production.up.railway.app/api/v1/courses/search?${new URLSearchParams(
          queryParams
        )}`;
        options = [];
        const response = await axios.get(url);
        setTags(response.data.data.tags);
        setCourses(response.data.data.course);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCoursesByStar();
  }, [searchValueDebounce]);

  useEffect(() => {
    options = [];
    if (tags.Category) {
      tags.Category.forEach((category) => {
        options.push(
          renderTag(category.categoryId, category.categoryName, "ca")
        );
      });
    }
    if (tags.Style) {
      tags.Style.forEach((style) => {
        options.push(
          renderTag(style.drawingStyleId, style.drawingStyleName, "st")
        );
      });
    }
    courses.forEach((course) => {
      options.push(
        renderCourse(
          course.courseId,
          course.image,
          course.courseTitle,
          course.fullName,
          "co"
        )
      );
    });
    setIsSearching(false);
  }, [courses, tags]);

  return (
    <>
      <AutoComplete
        popupClassName="certain-category-search-dropdown"
        style={{
          width: 250,
        }}
        onSelect={onSelect}
        onSearch={onChange}
        options={options}
        placeholder="What do you need?"
      />
      <br />
    </>
  );
};

export default SearchBar;
