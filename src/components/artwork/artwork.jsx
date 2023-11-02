import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

function Artwork() {
  const [artwork, setArtwork] = useState({
    categoryId: 0,
    status: "Open",
    requestImage: null,
  });

  const fileInputRef = useRef(null);
  const router = useRouter();
  const { userId } = router.query;
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [artworkData, setArtworkData] = useState([]); // State for artwork data

  const { id } = router.query;

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setArtwork({ ...artwork, requestImage: selectedFile });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://drawproject-production.up.railway.app/api/v1/category"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchArtworkData = async () => {
      try {
        const response = await axios.get(
          `https://drawproject-production.up.railway.app/api/v1/instructor/${userId}/artworks?page=1&eachPage=5&categoryId=0`
        );
        setArtworkData(response.data.data);
      } catch (error) {
        console.error("Error fetching artwork data:", error);
      }
    };

    fetchArtworkData();
    fetchCategories();
  }, [userId]);

  const submitPostData = async () => {
    try {
      if (localStorage.getItem("accessToken")) {
        setLoading(true);
        const accessToken = localStorage.getItem("accessToken");
        console.log(accessToken);
        const headers = {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        };
        const url =
          "https://drawproject-production.up.railway.app/api/v1/instructor/artworks";
        const formData = new FormData();
        formData.append("categoryId", artwork.categoryId);
        formData.append("status", artwork.status);
        formData.append("requestImage", artwork.requestImage);

        const response = await axios.post(url, formData, { headers });

        if (response.status === 200) {
          setLoading(false);
          fetchArtworkData();
          alert("Artwork created successfully");
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
            <div className="card-header">Artwork Picture</div>
            <div className="card-body text-center">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />

              <img
                src={artwork?.requestImage ? URL.createObjectURL(artwork.requestImage) : "https://as1.ftcdn.net/v2/jpg/01/94/55/90/1000_F_194559085_coSk1DYPdHWAYxI74GM9VjyAL4x7OjSq.jpg"}
                alt=""
                className="img-account-profile rounded-circle mb-2"
              />
              <div className="small font-italic text-muted mb-4">
                {artwork?.requestImage?.name
                  ? artwork?.requestImage?.name
                  : "JPG or PNG no larger than 5 MB"}
              </div>
              <button
                type="button"
                className="tp-btn"
                onClick={handleButtonClick}
              >
                {artwork?.requestImage?.name
                  ? "Change image"
                  : "Upload new image"}
              </button>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="card mb-4">
            <div className="card-header">Artwork Details</div>
            <div className="card-body">
              <form noValidate>
                <div className="mb-3">
                  <label htmlFor="inputCategory" className="small mb-1">
                    Category
                  </label>
                  <select
                    className="form-control"
                    onChange={(e) =>
                      setArtwork({
                        ...artwork,
                        categoryId: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value={0}>Select a category</option>
                    {categories.map((category) => (
                      <option
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </div>

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
          <h2>My Artwork</h2>
          <div className="row">
            {artworkData.map((item, i) => (
              <div key={i} className="col-xl-6 col-lg-12 col-md-6">
                <div className="tpcourse mb-40">
                  <div className="tpcourse__thumb p-relative w-img fix">
                    <img src={item.image} alt="artwork-thumb" />
                  </div>
                  <div className="tpcourse__content-2">
                    <div className="tpcourse__category mb-10">
                      {item.categoryName}
                    </div>
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

export default Artwork;
