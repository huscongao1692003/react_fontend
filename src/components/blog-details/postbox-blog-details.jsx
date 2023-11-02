import comments_data from "@/src/data/comments-data";
import Link from "next/link";
import { useRouter } from 'next/router';
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import BlogSearch from "../blog/blog-search";
import Category from "../blog/category";
import RecentPost from "../blog/recent-post";
import Tags from "../blog/tags";
import PostComment from "../form/post-comment";
import Spinner from 'react-bootstrap/Spinner';


const PostboxBlogDetails = () => {
  const router = useRouter();
  const { postId } = router.query;
  const [blogData, setBlogData] = useState(null);


  function formatCreatedAt(createdAtArray) {
    if (!createdAtArray || createdAtArray.length !== 6) {
      return "Invalid Date";
    }

    const [year, month, day, hours, minutes, seconds] = createdAtArray;
    const date = new Date(year, month - 1, day, hours, minutes, seconds);
    return date.toLocaleString();
  }

if(postId){
  axios
    .get(`https://drawproject-production-012c.up.railway.app/api/v1/post/${postId}`)
    .then((response) => {
      const post = response.data; // Assuming it returns a single post
      const decodedPost = {
        title: post.title,
        categoryId: post.categoryId,
        categoryName: post.categoryName,
        description: post.description,
        readingTime: post.readingTime,
        image: post.image,
        body: post.body,
        userId: post.userId,
        status: post.status,
        userName: post.userName,
        avatar: post.avatar,
        ...post
      };
      setBlogData([decodedPost]);
    })
    .catch((error) => {
      console.log(error);
    });
}
  if (!blogData) {
    // You can render a loading message or spinner here while fetching data.
  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ paddingTop: '200px', paddingBottom: '200px' }}>
      <Spinner animation="grow" variant="success" size="lg"/>
    </div>
    );
  }
  return (
    <>
      {Array.isArray(blogData) &&
        blogData.map((post, index) => (
          <div key={index}>
            <div
        className="postbox__area pt-120 pb-120 wow fadeInUp"
        data-wow-duration=".8s"
        data-wow-delay=".2s"
      >
        <div className="container">
          <div className="row">
              <div className="postbox__wrapper pr-20">


                <article className="postbox__item format-image mb-60 transition-3">
                  <div className="postbox__thumb w-img mb-30">

                      {post.image && <img src={post.image} alt="image" />}

                  </div>

                  <div className="postbox__content">
                    <div className="postbox__meta">
                      <span>
                        <i className="fi fi-rr-calendar"></i> {formatCreatedAt(post.createdAt)}
                      </span>
                      <span>
                        <a href="#">
                          <i className="fi fi-rr-user"></i> {post.userName}
                        </a>
                      </span>
                      {/* <span>
                        <a href="#">
                          <i className="fi fi-rr-comments"></i> 02 Comments
                        </a>
                      </span> */}
                    </div>
                    <h3 className="postbox__title">
                      {post.title}
                    </h3>
                    <div className="postbox__text">
                      
                      <p>
                        {post.body}
                      </p>
                    </div>

                    {/* <div className="postbox__tag tagcloud">
                      <span>Post Tags :</span>
                      <a href="#">Fresh</a>
                      <a href="#">Home</a>
                      <a href="#">Kitchen</a>
                    </div> */}
                  </div>
                </article>


                {/* <div className="postbox__comment mb-65">
                  <h3 className="postbox__comment-title">3 Comments</h3>
                  <ul>

                    {comments_data.map((item, i) =>                       
                      <li key={i} className={item?.children}>
                      <div className="postbox__comment-box grey-bg">
                        <div className="postbox__comment-info d-flex">
                          <div className="postbox__comment-avater mr-20">
                            <img
                              src={item.img}
                              alt=""
                            />
                          </div>
                          <div className="postbox__comment-name">
                            <h5>{item.name}</h5>
                            <span className="post-meta">{item.date}</span>
                          </div>
                        </div>
                        <div className="postbox__comment-text ml-65">
                          <p>
                            {item.comment}
                          </p>
                          <div className="postbox__comment-reply">
                            <a href="#">Reply</a>
                          </div>
                        </div>
                      </div>
                    </li>
                      ) 
                    }                    
                  </ul>
                </div> */}

                {/* <PostComment />
 */}

              </div>
            {/* <div className="col-xxl-4 col-xl-4 col-lg-5 col-md-12">
              <div className="sidebar__wrapper">
                <BlogSearch />
                <Category />
              </div>
            </div> */}
          </div>
        </div>
      </div>
          </div>
        ))}
      
    </>
  );
};

export default PostboxBlogDetails;
