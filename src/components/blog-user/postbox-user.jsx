import React,{ useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Slider from "react-slick";
import { useRouter } from 'next/router';
import Spinner from 'react-bootstrap/Spinner';


const PostboxUser = () => {
  const router = useRouter();
  const [blogData, setBlogData] = useState(null);
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  

    axios
      .get('https://drawproject-production.up.railway.app/api/v1/users/posts',
           {headers: { Authorization: `Bearer ${accessToken}`},
           })
      .then((response) => {
        const decodedData = response.data.data.map((post) => ({
          ...post,
          image: post.image,
          created_at: new Date(post.created_at).toLocaleString(),

        }));
        setBlogData(decodedData);
      })
      .catch((error) => {
        console.log(error);
      });
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

          <div>
            <div className="postbox__area pt-120 pb-120 wow fadeInUp" data-wow-duration=".8s" data-wow-delay=".2s">
              <div className="container">
                <div className="row">
                  {Array.isArray(blogData) &&
                     blogData.map((post, index) => (
                       <div key={index} className="col-xxl-8 col-xl-8 col-lg-7 col-md-12">
                    <div className="postbox__wrapper pr-20">
                      <article className="postbox__item format-image mb-60 transition-3">

                        <div className="postbox__thumb w-img mb-30" href={`/blog-details?postId=${post.postId}`}>
                            {post.image && <img src={post.image} alt="image" />}
                          </div>

                        {blogData.slider_img && (
                          <div className="postbox__thumb postbox__slider w-img mb-30 p-relative">
                            <button
                              type="button"
                              onClick={() => sliderRef?.current?.slickPrev()}
                              className="slick-prev slick-arrow"
                            >
                              <i className="fi fi-rr-arrow-small-left"></i>
                            </button>
                            <button
                              type="button"
                              onClick={() => sliderRef?.current?.slickNext()}
                              className="slick-next slick-arrow"
                            >
                              <i className="fi fi-rr-arrow-small-right"></i>
                            </button>

                            <div className="blog-item-active">
                              <Slider {...setting} ref={sliderRef}>
                                {blogData.slider_img.map((slide, i) => (
                                  <div key={i} className="postbox__slider-item">
                                    <img src={slide.img} alt="" />
                                  </div>
                                ))}
                              </Slider>
                            </div>
                          </div>
                        )}

                        <div className="postbox__content">
                          <div className="postbox__meta">
                            <span>
                              <i className="fi fi-rr-calendar"></i> {post.created_at}
                            </span>
                            <span>
                              <Link href="#">
                                <i className="fi fi-rr-user"></i> {post.userName}
                              </Link>
                            </span>
                            
                          </div>
                          <Link href={`/blog-details?postId=${post.postId}`}>
                          <h3 className="postbox__title">
                              {post.title}
                          </h3>
                          </Link>
                          <div className="postbox__text">
                            <p>{post.description}</p>
                          </div>
                          <div className="postbox__read-more">
                            <Link href={`/blog-details?postId=${post.postId}`} className="tp-btn">
                              read more
                            </Link>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default PostboxUser;