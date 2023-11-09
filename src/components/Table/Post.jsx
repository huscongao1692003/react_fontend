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
        axios.put(`https://drawproject-production-012c.up.railway.app/api/v1/admin/post/${postId}`, null, {
            headers: { "Authorization": `Bearer ${accessToken}` },
        })
            .then((response) => {
                axios.get('https://drawproject-production-012c.up.railway.app/api/v1/admin/posts', {
                    headers: { "Authorization": `Bearer ${accessToken}` }
                })
                    .then((response) => {
                        const extractedPosts = response.data.data.map((post) => ({
                            id: post.postId, // Assign postId to id
                            title: post.title,
                            description: post.description,
                            body: post.body,
                            ...post
                        }));
                        setPosts(extractedPosts);
                        setLoading(false);
                    })
                console.log(`Post with ID ${postId} has been disabled.`);
            })
            .catch((error) => {
                console.error(`Error disabling post with ID ${postId}:`, error);
            });
    };

    useEffect(() => {
        axios
            .get('https://drawproject-production-012c.up.railway.app/api/v1/admin/posts', {
                headers: { "Authorization": `Bearer ${accessToken}` }
            })
            .then((response) => {
                const extractedPosts = response.data.data.map((post) => ({
                    id: post.postId, // Assign postId to id
                    title: post.title,
                    description: post.description,
                    body: post.body,
                    ...post
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
        { field: 'id', headerName: 'Id', width: 100 }, // Use 'id' as the field name
        { field: 'title', headerName: 'Title', width: 300 },
        { field: 'description', headerName: 'Description', width: 200 },
        { field: 'status', headerName: 'Status', width: 100 },
        { field: 'body', headerName: 'Body', width: 650 },
        {
            field: 'disablePost',
            headerName: 'Disable Post',
            width: 150,
            renderCell: (params) => (
                <button
                    onClick={() => handleDisablePost(params.row.id)} // Call your API function here
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
        <h3>Posts</h3>
        <div className='dataTable bg-transparent'>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={posts}
                    columns={columns}
                    getRowId={(row) => row.id.toString()} // Specify a custom ID for each row
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
