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
  const { id } = router.query;
  const [categories, setCategories] = useState([]);
  const [categoryError, setCategoryError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingArt, setLoadingArt] = useState(false);

  const [artworkData, setArtworkData] = useState([]);

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
          "https://drawproject-production-012c.up.railway.app/api/v1/category"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    async function fetchArtworkData() {
      try {
        const response = await axios.get(
          `https://drawproject-production-012c.up.railway.app/api/v1/instructor/${id}/artworks?status=open&eachPage=10`
        );
        setArtworkData(response.data.data);
      } catch (error) {
        console.error("Error fetching artwork data:", error);
      }
    }

    fetchArtworkData();
    fetchCategories();
  }, [id]);
  const fetchArtworkDataOpen = async () => {
    try {
      setLoadingArt(true); // Set loading before fetching
      const response = await axios.get(
        `https://drawproject-production-012c.up.railway.app/api/v1/instructor/${id}/artworks?status=close&eachPage=10`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setArtworkData(response.data.data);
      setLoadingArt(false); // Unset loading after fetching
    } catch (error) {
      console.error("Error fetching open artwork data:", error);
      setLoadingArt(false); // Unset loading in case of error
    }
  };
  const fetchArtworkDataComplete = async () => {
    try {
      setLoadingArt(true);
      const response = await axios.get(
        `https://drawproject-production-012c.up.railway.app/api/v1/instructor/${id}/artworks?status=open&eachPage=10`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setArtworkData(response.data.data);
      setLoadingArt(false); // Unset loading after fetching
    } catch (error) {
      console.error("Error fetching open artwork data:", error);
      setLoadingArt(false); // Unset loading in case of error
    }
  };

  const submitPostData = async () => {
    setCategoryError('');

    // Check if a category has been selected (assuming the default '0' is not a valid category)
    if (artwork.categoryId === 0) {
      setCategoryError('Please select a category.');
      return; // Prevent submission if validation fails
    }
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
          "https://drawproject-production-012c.up.railway.app/api/v1/instructor/artworks&eachPage=10";
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
                src="https://as1.ftcdn.net/v2/jpg/01/94/55/90/1000_F_194559085_coSk1DYPdHWAYxI74GM9VjyAL4x7OjSq.jpg"
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
                  {categoryError && <div className="error-message">{categoryError}</div>}

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
              <button
                type="button"
                className="tp-btn"
                onClick={fetchArtworkDataOpen}
                disabled={loading} // Disable button while loading
              >
                {loadingArt ? "Loading..." : "Waiting Verify ArtWork"}
              </button>
              <h2></h2>
              <button
                type="button"
                className="tp-btn m-100 "
                onClick={fetchArtworkDataComplete}
                disabled={loading} // Disable button while loading
              >
                {loadingArt ? "Loading..." : " ArtWork"}
              </button>
            </div>
          </div>
          <h2>My Artwork</h2>
          <div className="row">
            {artworkData.map((artwork) => (
              <div key={artwork.artworkId} className="col-md-4 mb-4">
                <div className="card">
                  <img
                    src={artwork.image}
                    alt={`Artwork ${artwork.artworkId}`}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{artwork.categoryName}</h5>
                    <p className="card-text">{artwork.status}</p>
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
