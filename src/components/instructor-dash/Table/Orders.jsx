import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Spinner from 'react-bootstrap/Spinner';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  useEffect(() => {
    axios
      .get('https://drawproject-production-012c.up.railway.app/api/v1/instructor/orders', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        const ordersWithId = response.data.map((order, index) => ({
          ...order,
          id: index, // Generate a unique ID based on the row index
        }));
        setOrders(ordersWithId);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching orders data:', error);
        setLoading(false);
      });
    }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 }, // Display the ID column
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'fullName', headerName: 'Full Name', width: 200 },
    { field: 'courseName', headerName: 'Course Name', width: 200 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'price', headerName: 'Price', width: 120 },
    ];

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ paddingTop: '300px', paddingBottom: '300px' }}>
        <Spinner animation="grow" variant="light" size="lg" />
      </div>
      );
  }

  return (
    <>
    <h3>Orders</h3>

    <div className="dataTable">
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={orders}
          columns={columns}
          getRowId={(row) => row.id} // Specify the ID field
          initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnFilter
          disableDensitySelector
          disableColumnSelector
        />
      </Box>
    </div>
    </>
    );
};

export default Order;
