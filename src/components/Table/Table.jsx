import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Spinner from 'react-bootstrap/Spinner';


const CustomerTable = () => {
  const [orders, setOrders] = useState([]); // Update to []
  const [loading, setLoading] = useState(true);
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  useEffect(() => {
    axios
      .get('https://drawproject-production-012c.up.railway.app/api/v1/admin/orders', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        const dataWithIds = response.data.map((row, index) => ({
          ...row,
          id: index + 1, // Generate a unique id for each row
        }));
        setOrders(dataWithIds);
        setLoading(false);
      });
  }, [accessToken]);

  const columns = [
    { field: 'fullName', headerName: 'Name', width: 200 },
    { field: 'username', headerName: 'Tracking ID', width: 200 },
    { field: 'courseName', headerName: 'Date', width: 200 },
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
      <div className='dataTable bg-transparent' >
          <DataGrid
          style={{ border: '1px solid #333' }}
            rows={orders} // Update to use the new data
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSize={5}
            checkboxSelection
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            components={{
              Toolbar: GridToolbar,
            }}
          />
      </div>
    </>
  );
};

export default CustomerTable;