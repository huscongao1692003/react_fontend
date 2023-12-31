import Link from "next/link";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";



const RecentPost = () => {
  const [blogData, setBlogData] = useState({});

  useEffect(() => {
    axios
      .get("https://drawproject-production-012c.up.railway.app/api/v1/instructor/1")
      .then((response) => {
        setBlogData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      {Array.isArray(blogData) &&
        blogData.map((post, index) => (
          
          <div key={index}>
            <div className="sidebar__widget mb-55">
              <h3 className="sidebar__widget-title mb-25">Recent Post</h3>
              <div className="sidebar__widget-content">
                <div className="sidebar__post rc__post">
                  {blogData.map((post) => (
                    <div
                      key={post.postId}
                      className="rc__post mb-20 d-flex align-items-center"
                    >
                      <div className="rc__post-thumb">
                        <Link href="/blog-details">
                          <img src={post.image} alt="blog-sidebar" />
                        </Link>
                      </div>
                      <div className="rc__post-content">
                        <h3 className="rc__post-title">
                          <Link href="/blog-details">{post.title}</Link>
                        </h3>
                        <div className="rc__meta">
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

    </>
  );
};

export default RecentPost;
