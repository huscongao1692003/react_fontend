import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

function Cetificate() {
  const [certificate, setCertificate] = useState({
    image: [],
    imagePreviews: [], // To store image preview URLs
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
    const imagesArray = Array.from(selectedFiles);
    
    // Set files
    setCertificate((prev) => ({ ...prev, image: imagesArray }));

    // Create image previews
    const imagePreviews = imagesArray.map((file) =>
      URL.createObjectURL(file)
    );
    setCertificate((prev) => ({ ...prev, imagePreviews }));
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
          formData.append(`listImages`, image);
        });
  
        try {
          const response = await axios.post(url, formData, { headers });
  
          if (response.status === 200) {
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
              {/* Display image previews */}
         <div className="image-preview-container">
          {certificate.imagePreviews.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Preview ${index}`}
              className="img-preview img-account-profile"
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          ))}
        </div>
        <input
          type="file"
          multiple // Allow multiple files to be selected
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
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
