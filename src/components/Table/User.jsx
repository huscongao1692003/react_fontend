import React from 'react'
import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


const User = () => {

   const columns = [
      { field: 'id', headerName: 'ID', width: 90 },
      {
         field:"avatar",
         headerName: "Avatar",
         width: 150,
         renderCell: (params)=>{
            return <img style={{width: "40px", height:"40px"}} src={params.row.img || "/assets/img/icon/c-details-avata-01.png"} alt="" />
         }
      },
      
      
      {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: false,
      },
      {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: false,
      },
      {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 150,
        editable: false,
      },
      {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
          `${params.row.firstName || ''} ${params.row.lastName || ''}`,
      },
      {
         field:"status", 
         headerName:"Status", 
         width:300, 
         type:"boolean",
         sortable: false,
      },
      // {
      //    field:"action",
      //    headerName: "Action",
      //    width: 300,
      //    renderCell: (params)=>{
      //       return <div className="action">
      //          <div className="view">View</div>
      //          <div className="delete">Delete</div>
      //       </div>
      //    }
      // },
    ];
    
    const rows = [
      { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, status:true },
      { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, status:true },
      { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, status:true },
      { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, status:true },
      { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, status:true },
      { id: 6, lastName: 'Melisandre', firstName: null, age: 150, status:true },
      { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, status:true },
      { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, status:true },
      { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, status:true },
    ];

  return (
   <>
   <h3>Users</h3>
      
    <div className='dataTable'>
      <button>Add User</button>
      <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        slots={{toolbar:GridToolbar}}
        slotProps={{
         toolbar:{
            showQuickFilter:true,
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
    </div></>
  )
}

export default User
