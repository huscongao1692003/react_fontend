import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import Spinner from 'react-bootstrap/Spinner';

const ReportUser = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newReport, setNewReport] = useState({ studentId: '', courseId: '', message: '' });
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

    const handleAcceptReport = (studentId, courseId) => {
        axios.post(`https://drawproject-production.up.railway.app/api/v1/staff/reportstudent/accept`, {
            studentId,
            courseId
        }, {
            headers: { "Authorization": `Bearer ${accessToken}` },
        })
            .then((response) => {
                console.log(`Report for Student ID ${studentId} and Course ID ${courseId} has been accepted.`);
                // Refresh the reports data
                fetchReports();
            })
            .catch((error) => {
                console.error(`Error accepting report for Student ID ${studentId} and Course ID ${courseId}:`, error);
            });
    };

    const handleRejectReport = (studentId, courseId, message) => {
        axios.post(`https://drawproject-production.up.railway.app/api/v1/staff/reportstudent/reject`, {
            studentId,
            courseId,
            message
        }, {
            headers: { "Authorization": `Bearer ${accessToken}` },
        })
            .then((response) => {
                console.log(`Report for Student ID ${studentId} and Course ID ${courseId} has been rejected.`);
                // Refresh the reports data
                fetchReports();
            })
            .catch((error) => {
                console.error(`Error rejecting report for Student ID ${studentId} and Course ID ${courseId}:`, error);
            });
    };

    const handleNewReportChange = (event) => {
        setNewReport({ ...newReport, [event.target.name]: event.target.value });
    };

    const handleCreateReport = () => {
        axios.post(`https://drawproject-production.up.railway.app/api/v1/staff/reportstudent`, newReport, {
            headers: { "Authorization": `Bearer ${accessToken}` },
        })
            .then((response) => {
                console.log(`New report created for Student ID ${newReport.studentId} and Course ID ${newReport.courseId}.`);
                // Clear the form and refresh the reports data
                setNewReport({ studentId: '', courseId: '', message: '' });
                fetchReports();
                alert('Report created successfully!');
            })
            .catch((error) => {
                console.error(`Error creating report for Student ID ${newReport.studentId} and Course ID ${newReport.courseId}:`, error);
                alert('Error creating report. Please try again.');
            });
    };
    

    const fetchReports = () => {
        axios
            .get('https://drawproject-production.up.railway.app/api/v1/staff/reportstudent?page=1&eachPage=4&studentId=4&courseId=1', {
                headers: { "Authorization": `Bearer ${accessToken}` }
            })
            .then((response) => {
                const extractedReports = response.data.data.map((report) => ({
                    id: report.reportId,
                    studentId: report.studentId,
                    courseId: report.courseId,
                    message: report.message,
                    status: report.status,
                    // Add more fields if needed
                }));
                setReports(extractedReports);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching report data:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchReports();
    }, [accessToken]);

    const columns = [
        { field: 'id', headerName: 'Id', width: 100 },
        { field: 'studentId', headerName: 'Student ID', width: 150 },
        { field: 'courseId', headerName: 'Course ID', width: 150 },
        { field: 'message', headerName: 'Message', width: 300 },
        { field: 'status', headerName: 'Status', width: 100 },
        {
            field: 'acceptReport',
            headerName: 'Accept Report',
            width: 150,
            renderCell: (params) => (
                <button onClick={() => handleAcceptReport(params.row.studentId, params.row.courseId)}>
                    Accept
                </button>
            ),
        },
        {
            field: 'rejectReport',
            headerName: 'Reject Report',
            width: 150,
            renderCell: (params) => (
                <button onClick={() => handleRejectReport(params.row.studentId, params.row.courseId, 'none')}>
                    Reject
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
            <h3>Report User</h3>
            <div className='dataTable'>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={reports}
                        columns={columns}
                        getRowId={(row) => row.id.toString()}
                        initialState={{ pageSize: 4 }}
                    />
                </Box>
            </div>
            <div className='newReportForm'>
                <h4>Create New Report</h4>
                <div>
                    <label htmlFor='studentId'>Student ID:</label>
                    <input type='text' id='studentId' name='studentId' value={newReport.studentId} onChange={handleNewReportChange} />
                </div>
                <div>
                    <label htmlFor='courseId'>Course ID:</label>
                    <input type='text' id='courseId' name='courseId' value={newReport.courseId} onChange={handleNewReportChange} />
                </div>
                <div>
                    <label htmlFor='message'>Message:</label>
                    <textarea id='message' name='message' value={newReport.message} onChange={handleNewReportChange} />
                </div>
                <button onClick={handleCreateReport}>Create Report</button>
            </div>
        </>
    );
};

export default ReportUser;
