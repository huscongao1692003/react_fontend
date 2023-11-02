import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Paper,
} from '@mui/material';
import Spinner from 'react-bootstrap/Spinner';

export default function ContactTable() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  useEffect(() => {
    // Make an API request to fetch contact data
    axios.get('https://drawproject-production-012c.up.railway.app/api/v1/admin/contact', {
      headers: { "Authorization": `Bearer ${accessToken}` }
    }).then((response) => {
      setContacts(response.data);
      setLoading(false);
    });
  }, [accessToken]);

  const handleCloseContact = async (id) => {
    setLoading(true);

    try {
      // Set the headers as a separate object
      const headers = {
        "Authorization": `Bearer ${accessToken}`
      };

      await axios.put(`https://drawproject-production-012c.up.railway.app/api/v1/admin/contact/${id}`, null, { headers });
      alert("Close contact msg successfully");
      setLoading(false);
      axios.get('https://drawproject-production-012c.up.railway.app/api/v1/admin/contact', { headers }).then((response) => {
        setContacts(response.data);
        setLoading(false);
      });
    } catch (error) {
      // Handle any errors that may occur during the API request.
      console.error('Error closing contact:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ paddingTop: '300px', paddingBottom: '300px' }}>
        <Spinner animation="grow" variant="light" size="lg"/>
      </div>
      );
  }

  return (
    <div className="Table">
      <h3>Contacts</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: '0px 13px 20px 0px #80808029' }}
        >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Close Contact</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.contactId}>
                <TableCell component="th" scope="row">
                  {contact.name}
                </TableCell>
                <TableCell>{contact.mobileNum}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.message}</TableCell>
                <TableCell>{contact.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleCloseContact(contact.contactId)}
                    variant="outlined"
                    color="secondary"
                    >
                    Close
                  </Button>
                </TableCell>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    );
}
