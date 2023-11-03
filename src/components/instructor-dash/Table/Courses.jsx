import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
} from '@mui/material';
import { useRouter } from 'next/router';
import { message } from 'antd';
import StudentOfCourse from './Student-Course';
import { useStore, actions } from "@/src/store";

const CourseTable = ({ setSelected }) => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [userId, setUserId] = useState(0)
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseId, setCourseId] = useState(0);
  const [state, dispatch] = useStore();

  message.config({
    maxCount: 1
  })

  //get course data and save it to context
  const onSelect = (id) => {
    const course = courses.find(object => object.courseId === id);
    dispatch(actions.setValueCourse(course));
    setSelected(3);
  };

  useEffect(() => {
    
    const loadingMessage = message.loading('Loading...', 0);
    
    axios
        .get(`https://drawproject-production-012c.up.railway.app/api/v1/users/id`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          setUserId(response.data);
          console.log(response.data)
        })
        .catch((error) => {
          console.error("Error fetching user ID:", error);
        });
    axios
      .get(`https://drawproject-production-012c.up.railway.app/api/v1/instructor/${userId}/courses?page=1&eachPage=8`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setCourses(response.data.data);
        loadingMessage();
        
      });
      
  }, [accessToken, userId]);

  

  return (
    <div className="Table">
      

       {
        isModalOpen ? <StudentOfCourse courseId={courseId} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />  : ""
       }
      

      <h3>Courses</h3>
      <TableContainer component={Paper} style={{ boxShadow: '0px 13px 20px 0px #80808029', backgroundColor: "transparent", textAlignLast: "center" }}>
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
                  <Button variant="outlined" color="secondary" onClick={() => (setIsModalOpen(true), setCourseId(course.courseId))}>
                    Student
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {onSelect(course.courseId)}} // Example route for editing the course
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    );
}


export default CourseTable;