import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import StudentOfCourse from "./Student-Course";
import { useStore, actions } from "@/src/store";
import { Spin, message, Space } from "antd";

const CourseTable = ({ setSelected }) => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [userId, setUserId] = useState(null);
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseId, setCourseId] = useState(0);
  const [state, dispatch] = useStore();
  const [err, setErr] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [restart, setRestart] = useState(true);

  message.config({
    maxCount: 1,
  });

  const error = () => {
    message.error("Network error");
    message.config({
      maxCount: 3,
    });
    setErr("");
  };

  const success = () => {
    message.success(successMsg);
    message.config({
      maxCount: 1,
    });
    setSuccessMsg("");
  };

  //get course data and save it to context
  const onSelect = (id) => {
    const course = courses.find((object) => object.courseId === id);
    dispatch(actions.setValueCourse(course));
    setSelected(3);
  };

  const closeCourse = async (courseId) => {
    const loadingMessage = message.loading("Processing login...", 0);
    setIsloading(true);

    axios
      .delete(
        `https://drawproject-production-012c.up.railway.app/api/v1/courses/${courseId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        setSuccessMsg("Close course successfully!");
        setRestart(true);
      })
      .catch((error) => {
        console.log(error);
      });
    loadingMessage();
    setIsloading(false);
  };

  const openCourse = async (courseId) => {
    const loadingMessage = message.loading("Processing login...", 0);
    setIsloading(true);
    axios
      .put(
        `https://drawproject-production-012c.up.railway.app/api/v1/courses/${courseId}/open`,null,
        {
          
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        setSuccessMsg("Open course successfully!");
        setRestart(true);
      })
      .catch((error) => {
        console.log(error);
      });
    loadingMessage();
    setIsloading(false);
  };

  useEffect(() => {
    const loadingMessage = message.loading("Loading...", 0);

    axios
      .get(
        `https://drawproject-production-012c.up.railway.app/api/v1/users/id`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        setUserId(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user ID:", error);
      });
    if (userId != null) {
      axios
        .get(
          `https://drawproject-production-012c.up.railway.app/api/v1/instructor/${userId}/all-courses`
        )
        .then((response) => {
          setCourses(response.data.data);
          loadingMessage();
        });
    }
  }, [accessToken, userId, restart]);

  return (
    <div className="Table">
      {err !== "" && successMsg === ""
        ? error()
        : err === "" && successMsg !== "" && success()}

      {isModalOpen ? (
        <StudentOfCourse
          courseId={courseId}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      ) : (
        ""
      )}

      <h3>Courses</h3>
      <TableContainer
        component={Paper}
        style={{
          boxShadow: "0px 13px 20px 0px #80808029",
          backgroundColor: "transparent",
          textAlignLast: "center",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "10%" }}>Course ID</TableCell>
              <TableCell>Course Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Lessons</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.courseId}>
                <TableCell>{course.courseId}</TableCell>
                <TableCell component="th" scope="row">
                  {course.courseTitle}
                </TableCell>
                <TableCell>{course.price}</TableCell>
                <TableCell>{course.status}</TableCell>
                <TableCell>{course.numLesson}</TableCell>
                <TableCell>
                  <Spin spinning={isLoading}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => (
                        setIsModalOpen(true), setCourseId(course.courseId)
                      )}
                    >
                      Student
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        onSelect(course.courseId);
                      }} // Example route for editing the course
                    >
                      Edit
                    </Button>
                    {course.status === "Open" ? (
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          closeCourse(course.courseId);
                        }} // Example route for editing the course
                      >
                        Close
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          openCourse(course.courseId);
                        }} // Example route for editing the course
                      >
                        Open
                      </Button>
                    )}
                  </Spin>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CourseTable;
