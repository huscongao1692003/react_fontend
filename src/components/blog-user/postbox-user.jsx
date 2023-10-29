import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import Link from "next/link";
import Slider from "react-slick";
import { useRouter } from "next/router";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { Pagination } from "@mui/material";
import PostNotFound from "../error/post-not-found";

const PostboxUser = () => {
  const router = useRouter();
  const [blogData, setBlogData] = useState(null);
  const [deletingPost, setDeletingPost] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [statu, setStatu] = useState(null);

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  function formatCreatedAt(createdAtArray) {
    if (!createdAtArray || createdAtArray.length !== 6) {
      return "Invalid Date";
    }

    const [year, month, day, hours, minutes, seconds] = createdAtArray;
    const date = new Date(year, month - 1, day, hours, minutes, seconds); // Month is 0-based, so we subtract 1
    return date.toLocaleString();
  }
  function handlePageChange(page) {
    setPage(page);
  }

  const fetchUpdatedData = async () => {
    try {
      const response = await axios.get(
        "https://drawproject-production.up.railway.app/api/v1/users/posts",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const decodedData = response.data.data.map((post) => ({
        ...post,
        image: post.image,
      }));
    setStatu(200);
      setBlogData(response.data.data); // Update state with the new data
    } catch (error) {
      console.error("Failed to fetch updated data:", error);
      setStatu(400)
    }
  };

  const handlePostClose = async (postId) => {
    try {
      setDeletingPost(true);
      const response = await axios.put(
        `https://drawproject-production.up.railway.app/api/v1/post/${postId}`,
        null,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      console.log("Post deleted successfully:", response.data);
      alert(response.data);
      setDeletingPost(false);
        setStatu(200);

      // Optionally, you can update the UI or remove the deleted post from the list.
    } catch (error) {
      console.error("Failed to delete the post:", error);
      setDeletingPost(false);
    }
    fetchUpdatedData();
  };

  // Fetch initial data
  useEffect(() => {
    fetchUpdatedData();
  }, [handlePostClose]);

  if (statu == null) {
    // You can render a loading message or spinner here while fetching data.
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ paddingTop: "300px", paddingBottom: "300px" }}
      >
        <Spinner animation="grow" variant="success" size="lg" />
      </div>
    );
  }

  return (
    <>
      <div>
        <div
          className="postbox__area pt-120 pb-120 wow fadeInUp"
          data-wow-duration=".8s"
          data-wow-delay=".2s"
        >
          <div className="container">
            <div className="row">
              <div className="col-xxl-8 col-xl-8 col-lg-7 col-md-12">
                <div className="postbox__wrapper pr-20">
                  {blogData == null ? (
                    <PostNotFound />
                  ) : (
                    blogData.map((post, index) => (
                      <article
                        key={index}
                        className="postbox__item format-image mb-60 transition-3"
                      >
                        <div
                          className="postbox__thumb w-img mb-30"
                          href={`/blog-details?postId=${post.postId}`}
                        >
                          {post.image && <img src={post.image} alt="image" />}
                        </div>

                        <div className="postbox__content">
                          <div className="postbox__meta">
                            <span>
                              <i className="fi fi-rr-calendar"></i>{" "}
                              {formatCreatedAt(post.createdAt)}
                            </span>
                            <span>
                              <Link href="#">
                                <i className="fi fi-rr-user"></i>{" "}
                                {post.userName}
                              </Link>
                            </span>
                          </div>
                          <Link href={`/blog-details?postId=${post.postId}`}>
                            <h3 className="postbox__title">{post.title}</h3>
                          </Link>
                          <div className="postbox__text">
                            <p>{post.description}</p>
                          </div>
                          <div className="postbox__read-more">
                            <Button
                              className="tp-btn"
                              onClick={() => handlePostClose(post.postId)}
                              disabled={deletingPost}
                            >
                              {deletingPost ? (
                                <Spinner
                                  animation="border"
                                  size="sm"
                                  role="status"
                                >
                                  <span className="sr-only">Closing...</span>
                                </Spinner>
                              ) : (
                                "Close Post"
                              )}
                            </Button>
                          </div>
                        </div>
                      </article>
                    ))
                  )}

                  <Pagination
                    count={totalPage}
                    page={page}
                    onChange={handlePageChange}
                    style={{ float: "right" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostboxUser;
