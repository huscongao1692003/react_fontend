import blog_data from "@/src/data/blog-data";
import Link from "next/link";
import React,{ useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import Spinner from 'react-bootstrap/Spinner';


const BlogArea = () => {
  const router = useRouter();
  const [blogData, setBlogData] = useState(null);

  function formatCreatedAt(createdAtArray) {
    if (!createdAtArray || createdAtArray.length !== 6) {
      return "Invalid Date";
    }

    const [year, month, day, hours, minutes, seconds] = createdAtArray;
    const date = new Date(year, month - 1, day, hours, minutes, seconds); // Month is 0-based, so we subtract 1
    return date.toLocaleString();
  }


  useEffect(() => {
  axios
      .get('https://drawproject-production-012c.up.railway.app/api/v1/post?page=1&perPage=3')
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
  }, []);
  if (!blogData) {
    // You can render a loading message or spinner here while fetching data.
    return(
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ paddingTop: '300px', paddingBottom: '300px' }}>
        <Spinner animation="grow" variant="success" size="lg"/>
      </div>
      );
  }
  return (
    <>
      <section
        className="blog-area pt-110 pb-110 wow fadeInUp"
        data-wow-duration="1s"
        data-wow-delay=".4s"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title mb-65 text-center">
                <h2 className="tp-section-title mb-20">Latest Blogs</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {Array.isArray(blogData) &&
                     blogData.map((post, index) => (
              <div key={index} className="col-xl-4 col-md-6">
                <div className="tp-blog mb-60">
                  <div className="tp-blog__thumb p-relative">
                    <div className="tp-blog__timg fix">
                      <Link href={`/blog-details?postId=${post.postId}`}>
                        {post.image && <img src={post.image} alt="image" />}
                      </Link>
                    </div>
                    <div className="tp-blog__icon">
                      <Link href={`/blog-details?postId=${post.postId}`}>
                        <i className="fi fi-rs-angle-right"></i>
                      </Link>
                    </div>
                  </div>
                  <div className="tp-blog__content">
                    <div className="tp-blog__meta mb-10">
                      <div>Date</div>
                      <div>{formatCreatedAt(post.createdAt)}</div>
                    </div>
                    <h3 className="tp-blog__title mb-15">
                      <Link href={`/blog-details?postId=${post.postId}`}>{post.title}</Link>
                    </h3>

                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="blog-btn text-center">
                <Link href="/blog" className="tp-btn">
                  All Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogArea;
