import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

function Cetificate() {
  const [certificate, setCertificate] = useState({
    image: [],
  });

  const fileInputRef = useRef(null);
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [certificateData, setCertificateData] = useState([]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    // Convert FileList to an array and update the state
    const imagesArray = Array.from(selectedFiles);
    setCertificate({ ...certificate, images: imagesArray });
  };

  useEffect(() => {
    async function fetchCertificateData() {
      try {
        const response = await axios.get(
          `https://drawproject-production-012c.up.railway.app/api/v1/instructor/${id}/certificates`
        );
        setCertificateData(response.data.data);
      } catch (error) {
        console.error("Error fetching certificate data:", error);
      }
    }

    fetchCertificateData();
  }, [id]);

  const submitPostData = async () => {
    try {
      if (localStorage.getItem("accessToken")) {
        setLoading(true);
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        };
        const url =
          "https://drawproject-production-012c.up.railway.app/api/v1/instructor/certificates";

        // Create a new FormData object
        const formData = new FormData();

        // Append each selected image to the formData
        certificate.image.forEach((image, index) => {
          formData.append(`images[${index}]`, image);
        });

        try {
          const response = await axios.post(url, formData, { headers });

          if (response.status === 201) {
            setLoading(false);
            fetchCertificateData();
            alert("Certificates created successfully");
          }
        } catch (error) {
          console.error("Error creating certificates:", error);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container-xl px-4 mt-100 mb-100">
      <div className="row gx-4">
        <div className="col-xl-4">
          <div className="card">
            <div className="card-header">Cetificate Image</div>
            <div className="card-body text-center">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <img
                src="https://as1.ftcdn.net/v2/jpg/01/94/55/90/1000_F_194559085_coSk1DYPdHWAYxI74GM9VjyAL4x7OjSq.jpg"
                alt=""
                className="img-account-profile rounded-circle mb-2"
              />
              <div className="small font-italic text-muted mb-4">
                {certificate.image.length === 0
                  ? "JPG or PNG no larger than 5 MB"
                  : `${certificate.image.length} images selected`}
              </div>
              <button
                type="button"
                className="tp-btn"
                onClick={handleButtonClick}
              >
                Upload Images
                </button>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="card mb-4">
            <div className="card-header">Cetificate Details</div>
            <div className="card-body">
              <form noValidate>
                <button
                  type="button"
                  className="tp-btn"
                  onClick={submitPostData}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}{" "}
                </button>
              </form>
              <div className="mb-3"></div>
            </div>
          </div>
          <h2>My Cetificate</h2>
          <div className="row">
          {certificateData.map((certificate) => (
              <div key={certificate.certificateId} className="col-md-4 mb-4">
                <div className="card">
                  <img
                    src={certificate.image}
                    alt={`Artwork ${certificate.certificateId}`}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <p className="card-text">{certificate.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cetificate;
