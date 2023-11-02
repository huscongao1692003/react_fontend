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


export default function CustomerTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  useEffect(() => {


    // Make an API request to fetch orders
    axios.get('https://drawproject-production-012c.up.railway.app/api/v1/admin/orders',
              { headers: {"Authorization" : `Bearer ${accessToken}`} }
    ).then((response) => {
      setOrders(response.data);
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
    <div className="staffTable">
      <h3>Orders</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: '0px 13px 20px 0px #80808029' }}
        >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Tracking ID</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.username}>
                <TableCell component="th" scope="row">
                  {order.fullName}
                </TableCell>
                <TableCell align="left">{order.username}</TableCell>
                <TableCell align="left">{order.courseName}</TableCell>
                <TableCell align="left">
                  <span className="status">{order.price}</span>
                </TableCell>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    );
}