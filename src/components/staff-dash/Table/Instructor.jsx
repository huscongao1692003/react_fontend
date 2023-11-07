import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Spinner from 'react-bootstrap/Spinner';


const Instructor = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  const handleDisableUser = (userId) => {
    axios.put(`https://drawproject-production-012c.up.railway.app/api/v1/admin/user/${userId}`,null, {
      headers: { "Authorization": `Bearer ${accessToken}` },
    })
  .then((response) => {
    axios.get('https://drawproject-production-012c.up.railway.app/api/v1/admin/user', {
      headers: { "Authorization": `Bearer ${accessToken}` }
    })
    .then((response) => {
      const usersWithId = response.data.map((user, index) => ({
        id: user.userId,
        role:user.roles.name,
        ...user,
      }));
      setUsers(usersWithId);
      setLoading(false);
    })
    console.log(`User with ID ${userId} has been disabled.`);
  })
  .catch((error) => {
    console.error(`Error disabling user with ID ${userId}:`, error);
  });
  };


  useEffect(() => {
    axios.get('https://drawproject-production-012c.up.railway.app/api/v1/admin/user', {
      headers: { "Authorization": `Bearer ${accessToken}` }
    })
    .then((response) => {
      // Assign a unique id to each user using userId
      const usersWithId = response.data.map((user, index) => ({
        id: user.userId,
        role:user.roles.name,
        ...user,
      }));
      setUsers(usersWithId);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
      setLoading(false);
    });
  }, []);

  const columns = [
    { field: 'userId', headerName: 'User ID', width: 120 },
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'mobileNum', headerName: 'Mobile Number', width: 150 },
    {
      field: 'role', // This should correctly access the role name
      headerName: 'Role',
      width: 150,
    },
    {
      field: 'disableUser',
      headerName: 'Disable User',
      width: 150,
      renderCell: (params) => (
        <button
          onClick={() => handleDisableUser(params.row.userId)} // Call your API function here
          >
          Disable
        </button>
        ),
    },
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
      <h3 className='mt-30'>Users</h3>

      <div className='dataTable bg-transparent'>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={users}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            slots={{toolbar: GridToolbar}}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              }
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
    )
}

export default Instructor;