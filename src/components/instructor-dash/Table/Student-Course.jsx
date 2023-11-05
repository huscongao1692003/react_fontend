"use client"

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
  TableFooter,
  TablePagination,
  Button,
} from "@mui/material";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { message, Modal } from "antd";
import Backdrop from '@mui/material/Backdrop';
import { Pagination } from "@mui/material";

const StudentOfCourse = ({ courseId, isModalOpen, setIsModalOpen }) => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [isOverlay, setIsOverlay] = useState(false);
  const [page, setPage] = useState(0);
  const [eachPage, setEachPage] = useState(4);
  const [totalPage, setTotalPage] = useState(1);
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  message.config({
    maxCount: 1,
  });

  const handleOk = () => {
    setIsModalOpen(false);
  };

  function handlePageChange(event, page) {
    setPage(page);
  }

  function handleEachPageChange(event) {
    setEachPage(+event.target.value);
    setPage(0);
  }

  useEffect(() => {
    // Fetch the list of students for the selected course
    const loadingMessage = message.loading("Loading...", 0);
    setIsOverlay(true);
    const fetchStudents = async () => {
      try {
        const queryParams = {
          eachPage: eachPage,
          page: page + 1,
        };

        const url = `https://drawproject-production-012c.up.railway.app/api/v1/courses/${courseId}/student?${new URLSearchParams(
          queryParams
        )}`;

        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log("response.data.data: ", response.data.data);
        setStudents(response.data.data); // Update with the response data property
        loadingMessage();
        setIsOverlay(false);
        setIsModalOpen(true);
        setIsloading(false);
        setTotalPage(response.data.totalElements);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudents();
  }, [page, eachPage]);

  function formatCreatedAt(createdAtArray) {
    if (!createdAtArray || createdAtArray.length !== 6) {
      return "Invalid Date";
    }

    const [year, month, day, hours, minutes, seconds] = createdAtArray;
    const date = new Date(year, month - 1, day, hours, minutes, seconds); // Month is 0-based, so we subtract 1
    return date.toLocaleString();
  }

  return (
    <div>
      {isOverlay ? (
        <div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer - 190 }}
            open={isOverlay}
            style={{
              width: "84.2%",
              right: "0",
              left: "12.5rem",
              height: "84.5%",
              top: "3rem",
              backgroundColor: "rgba(0, 0, 0, 0.05)",
            }}
          ></Backdrop>
        </div>
      ) : (
        ""
      )}

      {isLoading ? "" : <Modal
        title="Student of course"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleOk}
        className="ant-modal-custom"
        centered={true}
      >
        <TableContainer
          component={Paper}
          style={{
            boxShadow: "0px 13px 20px 0px #80808029",
            textAlignLast: "center",
          }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Student ID</TableCell>
                <TableCell>Avatar</TableCell>
                <TableCell>Full name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Study at</TableCell>
                <TableCell>Progress</TableCell>
                <TableCell>Status Study</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.userID}>
                  <TableCell style={{ width: "10%" }}>
                    {student.userID}
                  </TableCell>
                  <TableCell>
                    <Space wrap size={16}>
                      <Avatar
                        size="large"
                        src={student.avatar}
                        icon={<UserOutlined />}
                      />
                    </Space>
                  </TableCell>
                  <TableCell>{student.fullName}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    {student.progressDTO.updatedAt === null
                      ? student.progressDTO.createdAt === null
                        ? "Not Study"
                        : formatCreatedAt(student.progressDTO.createdAt)
                      : formatCreatedAt(student.progressDTO.updatedAt)}
                  </TableCell>
                  <TableCell>{student.progressDTO.progress}</TableCell>
                  <TableCell>{student.progressDTO.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[4, 6, 8]}
            component="div"
            count={totalPage}
            rowsPerPage={eachPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleEachPageChange}
        />
      </Modal>
}
    </div>
  );
};

export default StudentOfCourse;
