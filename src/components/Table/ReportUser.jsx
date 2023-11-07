import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button } from '@mui/material';
import Spinner from 'react-bootstrap/Spinner';

const MyComponent = () => {
  const placeholderImage = "/assets/img/report.jpg";
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://drawproject-production-012c.up.railway.app/api/v1/staff/reportstudent?page=1&eachPage=10&studentId=0&courseId=0'
      );
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleReject = async (studentId, courseId, message) => {
    try {
      await axios.put(
        `https://drawproject-production-012c.up.railway.app/api/v1/staff/reportstudent/reject?studentId=${studentId}&courseId=${courseId}&message=${encodeURIComponent(
          message
        )}`
      );
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAccept = async (studentId, courseId, message) => {
    try {
      await axios.put(
        `https://drawproject-production-012c.up.railway.app/api/v1/staff/reportstudent/accept?studentId=${studentId}&courseId=${courseId}&message=${encodeURIComponent(
          message
        )}`
      );
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ paddingTop: '300px', paddingBottom: '300px' }}>
        <Spinner animation="grow" variant="light" size="lg" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="mt-30">Report Students</h1>
      <TableContainer component={Paper} className="bg-transparent">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Course ID</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={`${item.reportStudentId.studentId}-${item.reportStudentId.courseId}`}>
                <TableCell>{item.reportStudentId.studentId}</TableCell>
                <TableCell>{item.reportStudentId.courseId}</TableCell>
                <TableCell>{item.message}</TableCell>
                <TableCell>
                  <img
                    src={item.image ? item.image : placeholderImage}
                    alt="Report Image"
                    style={{ width: '100px' }}
                    onError={(e) => {
                      e.target.src = placeholderImage;
                    }}
                  />
                </TableCell>
                <TableCell>
                  {item.status === 'Pending' && (
                    <div>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleReject(item.reportStudentId.studentId, item.reportStudentId.courseId, item.message)}
                      >
                        Reject
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleAccept(item.reportStudentId.studentId, item.reportStudentId.courseId, item.message)}
                      >
                        Accept
                      </Button>
                    </div>
                  )}
                  {item.status === 'Completed' && <div>Completed</div>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MyComponent;