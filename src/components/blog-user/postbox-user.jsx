import React, {useState, useEffect} from "react";
import axios from "axios"; // Import axios
import Link from "next/link";
import Slider from "react-slick";
import {useRouter} from "next/router";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

const PostboxUser = () => {
    const router = useRouter();
    const [blogData, setBlogData] = useState(null);
    const [deletingPost, setDeletingPost] = useState(false);
    const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    const fetchUpdatedData = async () => {
        try {
            const response = await axios.get("https://drawproject-production.up.railway.app/api/v1/users/posts", {
                headers: {Authorization: `Bearer ${accessToken}`},
            });

            const decodedData = response.data.data.map((post) => ({
                ...post,
                image: post.image,
                created_at: new Date(post.created_at).toLocaleString(),
            }));

            setBlogData(decodedData); // Update state with the new data
        } catch (error) {
            console.error("Failed to fetch updated data:", error);
        }
    };

    const handlePostClose = async (postId) => {
        try {
            setDeletingPost(true);
            const response = await axios.put(`https://drawproject-production.up.railway.app/api/v1/post/${postId}`, null, {
                headers: {Authorization: `Bearer ${accessToken}`},
            });

            console.log("Post deleted successfully:", response.data);
            alert(response.data);
            setDeletingPost(false);
            fetchUpdatedData();

            // Optionally, you can update the UI or remove the deleted post from the list.
        } catch (error) {
            console.error("Failed to delete the post:", error);
            setDeletingPost(false);
        }
    };

    // Fetch initial data
    useEffect(() => {
        fetchUpdatedData();
    }, []);

    if (!blogData) {
        // You can render a loading message or spinner here while fetching data.
        return (
            <div className="d-flex flex-column justify-content-center align-items-center"
                 style={{paddingTop: "300px", paddingBottom: "300px"}}>
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

                                                <div className="postbox__thumb w-img mb-30"
                                                     href={`/blog-details?postId=${post.postId}`}>
                                                    {post.image && <img src={post.image} alt="image"/>}
                                                </div>

                                                {blogData.slider_img && (
                                                    <div
                                                        className="postbox__thumb postbox__slider w-img mb-30 p-relative">
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
                                                                        <img src={slide.img} alt=""/>
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
                                                        <Button className="tp-btn"
                                                                onClick={() => handlePostClose(post.postId)}
                                                                disabled={deletingPost}>
                                                            {deletingPost ? (
                                                                <Spinner animation="border" size="sm" role="status">
                                                                    <span className="sr-only">Closing...</span>
                                                                </Spinner>
                                                            ) : (
                                                                "Close Post"
                                                            )}
                                                        </Button>
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