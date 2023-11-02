import React, { useState, useEffect } from "react";
import { AutoComplete } from "antd";
import { useDebounce } from "@/hooks/debounce";
const axios = require("axios");
import Link from "next/link";

const defaultCourseImage = "/assets/img/course/course.jpg";

const renderCourse = (id, image, title, instructorName, type) => ({
  value: type + "" + id,
  label: (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ width: "10%", marginRight: "1rem" }}>
        <img src={image && image != null ? image : defaultCourseImage} alt="course-avatar"
                onError={(e) => {
                  e.target.src = defaultCourseImage;
                }} />
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
  ),
});

const renderTag = (id, name, type) => ({
  value: type + "" + id,
  label: (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ width: "10%", marginRight: "1rem", textAlign: "center", fontSize: "1rem" }}>
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
            fontSize: "1rem"
          }}
        >
          {name}
        </span>
      </div>
    </div>
  ),
});


let options = [];

const SearchBar = ( {setIsSearching} ) => {
  const [value, setValue] = useState("");
  const [courses, setCourses] = useState([]);
  const [tags, setTags] = useState({});
  const searchValueDebounce = useDebounce(value);

  const onSelect = (data) => {
    if(data.startsWith("ca")) {
      
    } else if(data.startsWith("st")) {

    } else {
      <Link href="/course-details/1">
      </Link>
    }

  };
  const onChange = (data) => {
    options = [];
    if(data.length >= 2) {
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
    if(tags.Category) {
      tags.Category.forEach(category => {
        options.push(renderTag(category.categoryId, category.categoryName, "ca"));
      });
    };
    if(tags.Style) {
      tags.Style.forEach(style => {
        options.push(renderTag(style.drawingStyleId, style.drawingStyleName, "st"))
      });
    };
    courses.forEach(course => {
      options.push(renderCourse(course.courseId, course.image, course.courseTitle, course.fullName, "co"));
    })
    setIsSearching(false);
  }, [courses, tags]);

  return (
    <>
      <AutoComplete
        popupClassName="certain-category-search-dropdown"
        style={{
          width: 300,
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
