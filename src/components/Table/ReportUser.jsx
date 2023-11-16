import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button } from '@mui/material';
import { Image, Spin, message } from 'antd';
import { UilCheck, UilSpinnerAlt, UilTimes } from '@iconscout/react-unicons';

const MyComponent = () => {
  const placeholderImage = "/assets/img/report.jpg";
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isHandleRejectLoading, setHandleRejectIsloading] = useState(false);
  const [isHandleAcceptLoading, setHandleAcceptIsloading] = useState(false);
  const [isHandleDeleteLoading, setHandleDeleteIsloading] = useState(false);
  const loadingMessage = message.loading('Processing...', 1);

  useEffect(() => {
    fetchData();
  }, []);
  const error = () => {
    message.error(err);
    message.config({
        maxCount: 2,
        duration: 5000
    })
    setErr("");
  };

  const success = () => {
    message.success("Login successful")
    message.config({
        maxCount: 1
    })
    setSuccessMsg("");
  }
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
    loadingMessage(true);
    setHandleRejectIsloading(true);
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
    setHandleRejectIsloading(false);
    loadingMessage(false);
  };

  const handleAccept = async (studentId, courseId, message) => {
    loadingMessage(true);
    setHandleAcceptIsloading(true);
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
    setHandleAcceptIsloading(false);
    loadingMessage(false);
  };
  
  const handleDelete = async (studentId, courseId, message) => {
    setHandleDeleteIsloading(true);
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
    setHandleDeleteIsloading(false);
  };

  // if (loading) {
  //   return (
  //     <div className="d-flex flex-column justify-content-center align-items-center" style={{ paddingTop: '300px', paddingBottom: '300px' }}>
  //       <Spin size="large" />
  //     </div>
  //   );
  // }

  return (
    <div>
      <h1 className="mt-30">Report Students</h1>
      <TableContainer component={Paper} className="bg-transparent">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: 'center' }}>Student ID</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Course ID</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Message</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Image</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Status</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Actions</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={`${item.reportStudentId.studentId}-${item.reportStudentId.courseId}`}>
                <TableCell style={{ textAlign: 'center' }}>{item.reportStudentId.studentId}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{item.reportStudentId.courseId}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{item.message}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  <Image
                    src={item.image ? item.image : placeholderImage}
                    alt="Report Image"
                    style={{ width: '100px' }}
                    onError={(e) => {
                      e.target.src = placeholderImage;
                    }}
                  />
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                {item.status === 'Pending' && (
                    <div>
                      <UilSpinnerAlt />
                    </div>
                  )}
                  {item.status === 'Completed' && (
                    <div>
                    <UilCheck />
                  </div>
                  )}
                  {item.status === null && (
                    <div>
                    <UilTimes />
                  </div>
                  )}
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  {item.status === 'Pending' && (
                    <div>
                      <Button
                        variant="contained"
                        color="error"
                        style={{ marginRight: '8px' }}
                        onClick={() => handleReject(item.reportStudentId.studentId, item.reportStudentId.courseId, item.message)}
                      >
                        Reject
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleAccept(item.reportStudentId.studentId, item.reportStudentId.courseId, item.message)}
                      >
                        Accept
                      </Button>
                    </div>
                  )}
                  {item.status === 'Completed' && (
                    <div>
                    <Button
                      variant="contained"
                      color="error"
                      style={{ marginRight: '8px' }}
                      onClick={() => handleReject(item.reportStudentId.studentId, item.reportStudentId.courseId, item.message)}
                      disabled
                    >
                      Reject
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleAccept(item.reportStudentId.studentId, item.reportStudentId.courseId, item.message)}
                      disabled
                    >
                      Accept
                    </Button>
                  </div>
                  )}
                  {item.status === null && (
                    <div>
                    <Button
                      variant="contained"
                      color="error"
                      style={{ marginRight: '8px' }}
                      onClick={() => handleReject(item.reportStudentId.studentId, item.reportStudentId.courseId, item.message)}
                      disabled
                    >
                      Reject
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleAccept(item.reportStudentId.studentId, item.reportStudentId.courseId, item.message)}
                      disabled
                    >
                      Accept
                    </Button>
                  </div>
                  )}
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                <Button
                      variant="contained"
                      color="error"
                      style={{ marginRight: '8px' }}
                      onClick={() => handleDelete(item.reportStudentId.studentId, item.reportStudentId.courseId, item.message)}
                    >
                      Delete
                    </Button>
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