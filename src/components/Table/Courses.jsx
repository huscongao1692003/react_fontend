import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  Button,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import Spinner from "react-bootstrap/Spinner";
import { Pagination } from "@mui/material";
import { Spin, message, Space, Modal, Input } from "antd";
const { TextArea } = Input;

export default function CourseTable() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [messReport, setMessReport] = useState("");
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseId, setCourseId] = useState(0);

  const handlePageChange = (event, value) => {
    setPage(value);
    setLoading(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    console.log("message: ", message);
    console.log("id: ", courseId);
    console.log("TokenList: ", accessToken);
    handleDelete();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const error = () => {
    message.error(err);
    message.config({
      maxCount: 3,
    });
    setErr("");
  };

  const success = () => {
    message.success("Successful");
    message.config({
      maxCount: 1,
    });
    setSuccessMsg("");
  };

  const handleDelete = () => {
    const loadingMessage = message.loading("Processing Delete...", 0);
    setIsLoading(true);
    axios
      .put(
        `https://drawproject-production-012c.up.railway.app/api/v1/staff/courses/report?id=${courseId}&message=${messReport}`,
        null,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        setErr("");
        setSuccessMsg("You have successfully deleted the course.");
        fetchCourses();
        loadingMessage();
      })
      .catch((error) => {
        alert(`Error deleting course with ID ${courseId}:`, error);
        loadingMessage();
      });
    setIsLoading(false);
  };

  const fetchCourses = () => {
    axios
      .get(
        `https://drawproject-production-012c.up.railway.app/api/v1/courses/viewcourses?page=${page}&eachPage=6`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        setCourses(response.data.data);
        setPage(response.data.page);
        setTotalPage(response.data.totalPage);
        setLoading(false);
      })
      .catch((error) => {
        // setErr("Error fetching courses.");
      });
  };

  useEffect(() => {
    fetchCourses();
  }, [accessToken, page]);

  if (loading) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ paddingTop: "300px", paddingBottom: "300px" }}
      >
        <Spinner animation="grow" variant="light" size="lg" />
      </div>
    );
  }

  return (
    <>
      {err !== "" && successMsg === ""
        ? error()
        : err === "" && successMsg !== "" && success()}
      <div className="Table mt-45">
        <h3>Courses</h3>
        <TableContainer className="bg-transparent" component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Course Title</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Course ID</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Number of Lessons</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.courseId}>
                  <TableCell component="th" scope="row">
                    {course.courseTitle}
                  </TableCell>
                  <TableCell>{course.price}</TableCell>
                  <TableCell>{course.courseId}</TableCell>
                  <TableCell>{course.status}</TableCell>
                  <TableCell>{course.numLesson}</TableCell>
                  <TableCell>
                    <Spin spinning={isLoading}>
                      <Button
                        onClick={() => (
                          setIsModalOpen(true), setCourseId(course.courseId)
                        )}
                        variant="outlined"
                        color="secondary"
                        disabled={course.status === "Close"}
                      >
                        Close Course
                      </Button>
                    </Spin>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Modal
            title="Reason report course (Optional)"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <TextArea
              value={messReport}
              onChange={(e) => setMessReport(e.target.value)}
              placeholder="You should input reason report to instructor clearly"
              autoSize={{
                minRows: 3,
                maxRows: 5,
              }}
            />
          </Modal>
          <div className="d-flex justify-content-center">
            <Pagination
              page={page}
              count={totalPage}
              onChange={handlePageChange}
            />
          </div>
        </TableContainer>
      </div>
    </>
  );
}
