import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  Button,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';
import Spinner from 'react-bootstrap/Spinner';


export default function CourseTable() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  
  const handleOpenCourse = (courseId) => {
    axios.put(`https://drawproject-production.up.railway.app/api/v1/courses/${courseId}/open`, null, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then((response) => {
      console.log(`Course with ID ${courseId} has been opened.`);
    }).catch((error) => {
      console.error(`Error opening course with ID ${courseId}:`, error);
    });
  };

  const handleDisableCourse = (courseId) => {
    axios.put(`https://drawproject-production.up.railway.app/api/v1/admin/post/${courseId}`, null, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then((response) => {
      console.log(`Course with ID ${courseId} has been disabled.`);
    }).catch((error) => {
      console.error(`Error disabling course with ID ${courseId}:`, error);
    });
  };

  useEffect(() => {
    // Make an API request to fetch courses
    axios.get('https://drawproject-production.up.railway.app/api/v1/courses/viewcourses?page=1&eachPage=8',
              { headers: {"Authorization" : `Bearer ${accessToken}`} }
    ).then((response) => {
      setCourses(response.data.data);
      setLoading(false)
    });
    }, [accessToken]);
  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ paddingTop: '300px', paddingBottom: '300px' }}>
        <Spinner animation="grow" variant="light" size="lg"/>
      </div>
      );
  }
  return (
    <div className="Table">
      <h3>Courses</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: '0px 13px 20px 0px #80808029' }}
        >
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
                  <Button
                    onClick={() => handleOpenCourse(course.courseId)}
                    variant="outlined"
                    color="secondary"
                    >
                    Open Course
                  </Button>
                  <Button
                    onClick={() => handleDisableCourse(course.courseId)}
                    variant="outlined"
                    color="secondary"
                    >
                    Disable Course
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

