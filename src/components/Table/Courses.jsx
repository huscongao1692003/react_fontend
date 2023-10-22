import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';
import Spinner from 'react-bootstrap/Spinner';


export default function CourseTable() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  

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
              <TableCell>Number of Lessons</TableCell>
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
                <TableCell>{course.numLesson}</TableCell>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    );
}

