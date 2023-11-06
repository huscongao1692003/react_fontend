import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Spinner from 'react-bootstrap/Spinner';

const User = () => {
    const [posts, setPosts] = useState([]); // Rename users to posts
    const [loading, setLoading] = useState(true);
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

    
    const handleDisablePost = (postId) => {
        axios.put(`https://drawproject-production-012c.up.railway.app/api/v1/admin/post/${postId}`,null, {
            headers: { "Authorization": `Bearer ${accessToken}` },
        })
  .then((response) => {
      axios.get('https://drawproject-production-012c.up.railway.app/api/v1/admin/posts', {
          headers: { "Authorization": `Bearer ${accessToken}` }
      })
   .then((response) => {
          const extractedPosts = response.data.data.map((post) => ({
              title: post.title,
              description: post.description,
              image: post.image,
              body: post.body,
              postId: post.postId, // You may want to keep postId
              ...post
          }));
          setPosts(extractedPosts);
          setLoading(false);
   })
      console.log(`User with ID ${userId} has been disabled.`);
  })
  .catch((error) => {
      console.error(`Error disabling user with ID ${userId}:`, error);
  });
    };
    useEffect(() => {
        // Update the endpoint and request method to POST
        axios
      .post('https://drawproject-production-012c.up.railway.app/api/v1/admin/posts', {
          // You can provide request data here, if needed
      }, {
          headers: { "Authorization": `Bearer ${accessToken}` }
      })
      .then((response) => {
          const extractedPosts = response.data.data.map((post) => ({
              title: post.title,
              description: post.description,
              image: post.image,
              body: post.body,
              postId: post.postId, // You may want to keep postId
              // Add more fields if needed
          }));
          setPosts(extractedPosts);
          setLoading(false);
      })
      .catch((error) => {
          console.error('Error fetching post data:', error);
          setLoading(false);
      });
        }, [accessToken]);

    const columns = [
        { field: 'postId', headerName: 'Id', width: 100 },
        { field: 'title', headerName: 'Title', width: 300 },
        { field: 'image', headerName: 'Image', width: 200 },
        { field: 'description', headerName: 'Description', width: 200 },
        { field: 'body', headerName: 'Body', width: 650 },
        {
      field: 'disablePost',
      headerName: 'Disable Post',
      width: 150,
      renderCell: (params) => (
        <button
          onClick={() => handleDisablePost(params.row.postId)} // Call your API function here
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
        <h3 className='mt-30'>Posts</h3>

        <div className='dataTable'>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={posts}
                    columns={columns}
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

export default User;
