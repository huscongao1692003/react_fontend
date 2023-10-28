import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogSearch from "./blog-search";
import RecentPost from "./recent-post";
import Category from "./category";
import Tags from "./tags";
import Link from "next/link";
import Slider from "react-slick";
import { useRouter } from "next/router";
import Spinner from "react-bootstrap/Spinner";
import { useDebounce } from "@/hooks/debounce";

const Postbox = () => {
  const router = useRouter();
  const [blogData, setBlogData] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [category, setcategory] = useState("0");
  const [categoryData, setCategoryData] = useState([]);

  const searchValueDebounce = useDebounce(searchValue);

  function formatCreatedAt(createdAtArray) {
    if (!createdAtArray || createdAtArray.length !== 6) {
      return "Invalid Date";
    }

    const [year, month, day, hours, minutes, seconds] = createdAtArray;
    const date = new Date(year, month - 1, day, hours, minutes, seconds); // Month is 0-based, so we subtract 1
    return date.toLocaleString();
  }

  function handleCategoryClick(clickedCategoryId) {
    setcategory(clickedCategoryId);
  };

  useEffect(() => {
    axios
      .get("https://drawproject-production.up.railway.app/api/v1/category")
      .then((response) => {
        setCategoryData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://drawproject-production.up.railway.app/api/v1/post/search?page=1&perPage=5`,
        {
          params: {
            search: searchValueDebounce
          },
        }
      )
      .then((response) => {
        const decodedData = response.data.data.map((post) => ({
          ...post,
          image: post.image,
        }));
        setBlogData(decodedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchValueDebounce]);

  useEffect(() => {
    axios
      .get(
        `https://drawproject-production.up.railway.app/api/v1/post/search?page=1&perPage=5`,
        {
          params: {
            categoryId: category
          },
        }
      )
      .then((response) => {
        const decodedData = response.data.data.map((post) => ({
          ...post,
          image: post.image,
        }));
        setBlogData(decodedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [category]);

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
                  {Array.isArray(blogData) &&
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
                    ))}
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-5 col-md-12">
                <div className="sidebar__wrapper">
                  {/* render sidebar components here */}

                  <div className="sidebar__widget mb-55">
                    <div className="sidebar__widget-content">
                      <h3 className="sidebar__widget-title mb-25">Search</h3>
                      <div className="sidebar__search">
                        <form onSubmit={(e) => e.preventDefault()}>
                          <div className="sidebar__search-input-2">
                            <input
                              type="text"
                              placeholder="Search Anything"
                              onChange={(e) => setSearchValue(e.target.value)}
                              value={searchValue}
                            />
                            <button type="submit">
                              <i className="far fa-search"></i>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="sidebar__widget mb-40">
                    <div className="row">
                      <h3 className="sidebar__widget-title mb-10 col-md-7">
                        Category
                      </h3>
                    </div>
                    <div className="sidebar__widget-content">
                      <ul>
                        {categoryData.map((item) => (
                          <li key={item.categoryId} style={{cursor: "pointer"}}>
                            <a onClick={() =>
                                handleCategoryClick(item.categoryId)
                              }
                            >
                              {item.categoryName}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
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
