import Link from "next/link";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import Spinner from 'react-bootstrap/Spinner';
import axios from "axios";

// instructor_info
const instructor_info = [
  {
    id: 1,
    img: "/assets/img/bg/instructor-bg-01.jpg",
    name: "Devon Lane",
    title: "Instructor",
  },
  {
    id: 2,
    img: "/assets/img/bg/instructor-bg-02.jpg",
    name: "Jane Cooper",
    title: "Instructor",
  },
  {
    id: 3,
    img: "/assets/img/bg/instructor-bg-03.jpg",
    name: "Courtney Henry",
    title: "Instructor",
  },
  {
    id: 4,
    img: "/assets/img/bg/instructor-bg-04.jpg",
    name: "Devon Lane",
    title: "Instructor",
  },
];

// social_links
const social_links = [
  {
    link: "http://facebook.com",
    target: "_blank",
    icon: "fab fa-facebook-f",
    name: "Facebook",
  },
  {
    link: "http://twitter.com",
    target: "_blank",
    icon: "fab fa-twitter",
    name: "Twitter",
  },
  {
    link: "https://www.instagram.com/",
    target: "_blank",
    icon: "fab fa-instagram",
    name: "Instagram",
  },
  {
    link: "https://www.youtube.com/",
    target: "_blank",
    icon: "fab fa-youtube",
    name: "Youtube",
  },
];

// setting
const setting = {
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  // autoplay: true,
  arrows: false,
  dots: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const InstructorArea = ({ style_2 }) => {
  const [instructorData, setInstructorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const placeholderImage = "/assets/img/instructor.png";
  const sliderRef = useRef(null);

  useEffect(() => {
    axios
      .get("https://drawproject-production.up.railway.app/api/v1/instructor")
      .then((response) => {
        setInstructorData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []); // The empty dependency array ensures this effect runs only once
  if (loading) {
    return <div className="d-flex flex-column justify-content-center align-items-center" style={{ paddingTop: '300px', paddingBottom: '300px' }}>
      <Spinner animation="grow" variant="success" size="lg" />
    </div>;
  }
  
  return (
    <>
      <section
        className="instructor-area pt-110 pb-110 wow fadeInUp"
        data-wow-duration="1s"
        data-wow-delay=".4s"
      >
        <div className="container">
          <div className="row">
            {style_2 ? (
              <div className="col-lg-12">
                <div className="section-title mb-35 text-center">
                  <span className="tp-sub-title-box mb-15">Instructor</span>
                  <h2 className="tp-section-title">Our Expert Instructor</h2>
                </div>
              </div>
            ) : (
              <>
                <div className="col-xl-6 col-lg-8 col-md-7 col-12">
                  <div className="section-title mb-65">
                    <h2 className="tp-section-title mb-20">
                      Our Expert Instructor
                    </h2>
                  </div>
                </div>

                <div className="col-xl-6 col-lg-4 col-md-5 col-6">
                  <div className="tp-instruc-arrow d-flex justify-content-md-end">
                    <button
                      type="button"
                      onClick={() => sliderRef.current.slickPrev()}
                      className="slick-prev slick-arrow"
                    >
                      <i className="arrow_carrot-left"></i>
                    </button>
                    <button
                      type="button"
                      onClick={() => sliderRef.current.slickNext()}
                      className="slick-next slick-arrow"
                    >
                      <i className="arrow_carrot-right"></i>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="intruc-active mb-15 tp-slide-space">
            <Slider {...setting}  ref={sliderRef}>
              {instructorData.map((item, i) => (
                <div key={item.userId} className="tp-instruc-item">
                  <div className="tp-instructor text-center p-relative mb-30">
                    <div className="tp-instructor__thumb mb-25">
                      <img src={item.avatar && item.avatar !== "null" ? item.avatar : placeholderImage} alt="instructor-profile" onError={(e) => {
                        e.target.src = placeholderImage
                      }} />
                    </div>
                    <div className="tp-instructor__content">
                      <h4 className="tp-instructor__title mb-20">
                        <Link href={`/instructor-profile?userId=${item.userId}`}>{item.fullName}</Link>
                      </h4>
                      <span>Best instructor of week</span>
                      <div className="tp-instructor__social">
                        <ul>
                          {social_links.map((link, i) => (
                            <li key={i}>
                              <a target={link.target} href={link.link}>
                                <i className={link.icon}></i>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="instructor-btn text-center">
                <Link className="tp-btn" href="/instructor">
                  All Instructor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InstructorArea;
