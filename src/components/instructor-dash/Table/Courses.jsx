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
  Button,
} from '@mui/material';
import Spinner from 'react-bootstrap/Spinner';
import { useRouter } from 'next/router';
import Dropdown from 'react-bootstrap/Dropdown'; // Import Bootstrap Dropdown
import Modal from 'react-bootstrap/Modal';
import { ListGroup } from 'react-bootstrap';

export default function CourseTable() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Control the dropdown visibility
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const router = useRouter();

  useEffect(() => {
    axios
      .get('https://drawproject-production.up.railway.app/api/v1/courses/viewcourses?page=1&eachPage=8', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setCourses(response.data.data);
        setLoading(false);
      });
  }, [accessToken]);

  const handleStudentOfCourseClick = (course) => {
    // Fetch the list of students for the selected course
    axios
      .get(`https://drawproject-production.up.railway.app/api/v1/courses/${course.courseId}/student`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setStudents(response.data.data); // Update with the response data property
        setSelectedCourse(course);
        setDropdownOpen(true); // Open the Bootstrap dropdown
      });
  };

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ paddingTop: '300px', paddingBottom: '300px' }}>
        <Spinner animation="grow" variant="#80808029" size="lg" />
      </div>
    );
  }

  return (
    <div className="Table">
      <h3>Courses</h3>
      <TableContainer component={Paper} style={{ boxShadow: '0px 13px 20px 0px #80808029' }}>
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
                  <Button variant="outlined" color="secondary" onClick={() => handleStudentOfCourseClick(course)}>
                    Student Of Course
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => router.push(`/edit-course/${course.courseId}`)} // Example route for editing the course
                  >
                    Edit Course
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dropdown show={dropdownOpen} onToggle={(isOpen) => setDropdownOpen(isOpen)}>
        <Dropdown.Toggle id="dropdown-menu-align-responsive-1" variant="secondary" >
          Students of {selectedCourse ? selectedCourse.courseTitle : ''}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {students.map((student) => (
            <Dropdown.Item key={student.userID}>
              <ListGroup>
                <ListGroup.Item>{student.fullName}</ListGroup.Item>
                <ListGroup.Item>Email: {student.email}</ListGroup.Item>
                <ListGroup.Item>Status: {student.status}</ListGroup.Item>
                <ListGroup.Item>Progress: {student.progressDTO.progress}</ListGroup.Item>
                <ListGroup.Item>Status: {student.progressDTO.status}</ListGroup.Item>
              </ListGroup>
            </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
    );
}
