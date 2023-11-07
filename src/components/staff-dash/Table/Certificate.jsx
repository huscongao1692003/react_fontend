import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Button,
  Spinner,
  Container,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { Pagination } from "@mui/material";


const Instructor = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCertificatesModal, setShowCertificatesModal] = useState(false);
  const [showArtworksModal, setShowArtworksModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [currentCertificates, setCurrentCertificates] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const [currentArtworks, setCurrentArtworks] = useState([]);
  const handlePageChange = (event, value) => {
    setPage(value);
    setLoading(true)
  };

  const handleShowArtworks = async (userId) => {
    try {
      const response = await axios.get(
        `https://drawproject-production-012c.up.railway.app/api/v1/instructor/${userId}/artworks?status=close`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setCurrentArtworks(response.data.data);
      setSelectedUserId(userId);
      setShowArtworksModal(true);
    setShowCertificatesModal(false); // You may want to use separate modals for certificates and artworks
    } catch (error) {
      console.error("Error fetching artworks:", error);
    }
  };

  const handleArtworkAction = async (artworkId, action) => {
    try {
      // Assume there's an API endpoint to accept/reject artwork
      const response = await axios.put(
        `https://drawproject-production-012c.up.railway.app/api/v1/staff/artworks/${action}?artworkId=${artworkId}`,null,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      // Fetch artworks again to update UI
      handleShowArtworks(selectedUserId);
    } catch (error) {
      console.error("Error updating artwork status:", error);
    }
  };

  const handleShowCertificates = async (userId) => {
    try {
      const response = await axios.get(
        `https://drawproject-production-012c.up.railway.app/api/v1/instructor/${userId}/certificates?status=close`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setCurrentCertificates(response.data.data);
      setSelectedUserId(userId);
      setShowCertificatesModal(true);
    setShowArtworksModal(false); 
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };
  const handleCertificateAction = async (certificateId, action) => {
    try {
      // Assume there's an API endpoint to accept/reject certificate
      const response = await axios.put(
        `https://drawproject-production-012c.up.railway.app/api/v1/staff/certificates/${action}?certificateId=${certificateId}`,null,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      // Fetch certificates again to update UI
      handleShowCertificates(selectedUserId);
    } catch (error) {
      console.error("Error updating certificate status:", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `https://drawproject-production-012c.up.railway.app/api/v1/users/instructors?page=${page}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setUsers(response.data.data);
  setTotalPage(response.data.totalPage)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, [accessToken,page,handleArtworkAction,handleCertificateAction]);

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h3>Instructor</h3>
      <Row xs={1} md={2} lg={3} className="g-4">
        {users.map((user) => (
          <Col key={user.userId}>
            <Card>
              <Card.Body>
                <Card.Title>{user.username}</Card.Title>
                <Card.Text>Email: {user.email}</Card.Text>
                <Card.Text>Waiting Artwork: {user.numOfArtWorkClose}</Card.Text>
                <Card.Text>Artwork: {user.numOfArtWorkOpen}</Card.Text>
                <Card.Text>Waiting Certificate: {user.numOfCertificateClose}</Card.Text>
                <Card.Text>Certificate: {user.numOfCertificateOpen}</Card.Text>
                <Card.Text>Mobile: {user.mobileNum}</Card.Text>

                <Button
                  variant="danger"
                  onClick={() => handleShowArtworks(user.userId)}
                >
                  Artwork
                </Button>
                <Button
                  variant="danger"
                  className="ms-2"
                  onClick={() => handleShowCertificates(user.userId)}
                >
                  Certificate
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {/* Modal for displaying certificates */}
      <Modal show={showCertificatesModal} onHide={() => setShowCertificatesModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Certificates</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentCertificates.map((certificate) => (
            <div key={certificate.certificateId} className="text-center mb-3">
              <img
                src={certificate.image}
                alt="Certificate"
                style={{ maxWidth: "100%" }}
              />
              <div className="mt-2">
                <Button
                  variant="success"
                  onClick={() =>
                    handleCertificateAction(certificate.certificateId, "accept")
                  }
                >
                  Accept
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() =>
                    handleCertificateAction(certificate.certificateId, "reject")
                  }
                >
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </Modal.Body>
      </Modal>
      <Modal show={showArtworksModal} onHide={() => setShowArtworksModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Artworks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentArtworks.map((artwork) => (
            <div key={artwork.artworkId} className="text-center mb-3">
              <img
                src={artwork.image}
                alt="Artwork"
                style={{ maxWidth: "100%" }}
              />
              <div className="mt-2">
                <Button
                  variant="success"
                  onClick={() =>
                    handleArtworkAction(artwork.artworkId, "accept")
                  }
                >
                  Accept
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() =>
                    handleArtworkAction(artwork.artworkId, "reject")
                  }
                >
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </Modal.Body>
      </Modal>
      <div className="d-flex justify-content-center mt-10 mb-10">
            <Pagination page={page} count={totalPage} onChange={handlePageChange} />
          </div>
    </Container>
  );
};

export default Instructor;
