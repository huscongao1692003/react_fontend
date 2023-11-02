import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogSearch from "./blog-search";
import Link from "next/link";
import { useRouter } from "next/router";
import Spinner from "react-bootstrap/Spinner";
import { useDebounce } from "@/hooks/debounce";
import Sidebar from "./category";
import BlogNotFound from "./blog-not-found";
import { Pagination } from "@mui/material";

const Postbox = () => {
  const [blogData, setBlogData] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [category, setcategory] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const searchValueDebounce = useDebounce(searchValue);

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

  useEffect(() => {
    const fetchPosts = async () => {

      try {
        const queryParams = {
          eachPage: 4,
          page: page,
          search: searchValueDebounce,
          categoryId: category
        };

        const url = `https://drawproject-production-012c.up.railway.app/api/v1/post/search?${new URLSearchParams(
          queryParams
        )}`;

        const response = await axios.get(url);
        const data = response.data.data;
        setBlogData(data);
        setTotalPage(response.data.totalPage);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [searchValueDebounce, category, page]);

  if (!blogData) {
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
                  {blogData.length == 0 ? (
                    <BlogNotFound />
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
                            <Link
                              href={`/blog-details?postId=${post.postId}`}
                              className="tp-btn"
                            >
                              read more
                            </Link>
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
              <div className="col-xxl-4 col-xl-4 col-lg-5 col-md-12">
                <div className="sidebar__wrapper">
                  {/* render sidebar components here */}

                  <BlogSearch
                    setSearchValue={setSearchValue}
                    searchValue={searchValue}
                  />
                  <Sidebar category={category} setcategory={setcategory} />
                  {/* <Tags /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Postbox;
