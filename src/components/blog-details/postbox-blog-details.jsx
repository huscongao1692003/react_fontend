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


const PostboxBlogDetails = () => {
  const router = useRouter();
  const { postId } = router.query;
  const [blogData, setBlogData] = useState(null);
if(postId){
  axios
    .get(`https://drawproject-production.up.railway.app/api/v1/post/${postId}`)
    .then((response) => {
      const post = response.data; // Assuming it returns a single post
      const decodedPost = {
        title: post.title,
        categoryId: post.categoryId,
        categoryName: post.categoryName,
        description: post.description,
        readingTime: post.readingTime,
        //        image: post.image ? atob(post.image) : null,
        body: post.body,
        userId: post.userId,
        status: post.status,
        userName: post.userName,
        created_at: new Date(post.created_at).toLocaleString(),
        avatar: post.avatar,
      };
      setBlogData([decodedPost]);
    })
    .catch((error) => {
      console.log(error);
    });
}
  if (!blogData) {
    // You can render a loading message or spinner here while fetching data.
  return <div>Loading...</div>;
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
            <div className="col-xxl-8 col-xl-8 col-lg-7 col-md-12">
              <div className="postbox__wrapper pr-20">


                <article className="postbox__item format-image mb-60 transition-3">
                  <div className="postbox__thumb w-img mb-30">
                    <Link href="/blog-details">
                      {/*<img src={`data:image/png;base64,${post.image}`} alt="" />*/}
                    </Link>
                  </div>
                  <div className="postbox__content">
                    <div className="postbox__meta">
                      <span>
                        <i className="fi fi-rr-calendar"></i> {post.created_at}
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
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-5 col-md-12">
              <div className="sidebar__wrapper">
                <BlogSearch />
                <RecentPost />
                <Category />
                <Tags />
              </div>
            </div>
          </div>
        </div>
      </div>
          </div>
        ))}
      
    </>
  );
};

export default PostboxBlogDetails;
