import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Spin, message } from "antd";
import { Pagination } from "@mui/material";
import { Image, Popconfirm, Button } from "antd";

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
  const [imagePre, setImagePre] = useState("");
  const [refress, setRefress] = useState(0);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    const imagesArray = Array.from(selectedFiles);

    // Set files
    setCertificate((prev) => ({ ...prev, image: imagesArray }));

    // Create image previews
    handleUpload(e);
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      setImagePre(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const loadingMessage = message.loading("Loading...", 0);
    async function fetchCertificateData() {
      try {
        const response = await axios.get(
          `https://drawproject-production-012c.up.railway.app/api/v1/instructor/${id}/certificates?status=Open`
        );
        setCertificateData(response.data.data);
      } catch (error) {
        console.error("Error fetching certificate data:", error);
      }
      loadingMessage();
    }

    fetchCertificateData();
  }, [id, refress]);

  const deleteCertificate = async (certificateId) => {
    const loadingMessage = message.loading("Deleting...", 0);
    try {
      const response = await axios.delete(
        `https://drawproject-production-012c.up.railway.app/api/v1/instructor/certificates/${certificateId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setRefress(refress + 1);
    } catch (error) {
      console.error("Error fetching delete certificate:", error);
      loadingMessage();
    }
    loadingMessage();
  };

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
            setRefress(refress + 1);

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
                <Image
                  src={
                    imagePre === ""
                      ? "https://as1.ftcdn.net/v2/jpg/01/94/55/90/1000_F_194559085_coSk1DYPdHWAYxI74GM9VjyAL4x7OjSq.jpg"
                      : imagePre
                  }
                  alt=""
                  width={290}
                  height={310}
                />
              </div>
              <input
                type="file"
                multiple // Allow multiple files to be selected
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <div className="button-handle d-flex align-items-center">
                <div className="upload">
                  <button
                    type="button"
                    className="tp-btn"
                    onClick={handleButtonClick}
                  >
                    Upload Images
                  </button>
                </div>
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="card mb-4">
            <div className="card-header">My Cetificates</div>
          </div>
          <div className="row">
            {certificateData.map((certificate) => (
              <div key={certificate.certificateId} className="col-md-4 mb-4">
                <div className="card">
                  <Image
                    src={certificate.image}
                    alt={`Certificate ${certificate.certificateId}`}
                    className="card-img-top"
                    width={"100%"}
                    height={"10rem"}
                  />
                  <div className="card-body">
                    <Popconfirm
                      title="Delete this artwork"
                      onConfirm={() => deleteCertificate(certificate.certificateId)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button danger style={{float: "right"}}>
                        <i class="fa-solid fa-trash"></i>
                      </Button>
                    </Popconfirm>
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
