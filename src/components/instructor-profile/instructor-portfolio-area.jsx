import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Spinner } from "react-bootstrap";
import { useRouter } from "next/router.js";

// Placeholder image URL
const placeholderImage = "/assets/img/instructor.png";

const InstructorPortfolioArea = () => {
  const [instructorData, setInstructorData] = useState(null);
  const [coursesData, setCoursesData] = useState([]);
  const [artworkData, setArtworkData] = useState([]);
  const [certificateData, setCertificateData] = useState([]);
  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    const fetchInstructorData = async () => {
      try {
        const response = await axios.get(
          `https://drawproject-production-012c.up.railway.app/api/v1/instructor/${userId}`
        );
        setInstructorData(response.data);
      } catch (error) {
        console.error("Error fetching instructor data:", error);
      }
    };

    const fetchCoursesData = async () => {
      try {
        const response = await axios.get(
          `https://drawproject-production-012c.up.railway.app/api/v1/instructor/${userId}/courses?page=1&eachPage=4`
        );
        setCoursesData(response.data.data);
      } catch (error) {
        console.error("Error fetching courses data:", error);
      }
    };

    const fetchArtworkData = async () => {
      try {
        const response = await axios.get(
          `https://drawproject-production.up.railway.app/api/v1/instructor/${userId}/artworks?page=1&eachPage=5&categoryId=0`
        );
        setArtworkData(response.data.data); // Set the artwork data in state
      } catch (error) {
        console.error("Error fetching artwork data:", error);
      }
    };
    const fetchCertificateData = async () => {
      try {
        const response = await axios.get(
          `https://drawproject-production.up.railway.app/api/v1/instructor/${userId}/certificates`
        );
        setCertificateData(response.data.data); // Set the certificate data in state
      } catch (error) {
        console.error("Error fetching certificate data:", error);
      }
    };

    fetchCertificateData();
    fetchInstructorData();
    fetchCoursesData();
    fetchArtworkData();
  }, [userId]);

  if (!instructorData || !coursesData || !artworkData) {
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
      <section
        className="instructor-portfolio pt-120 pb-80 wow fadeInUp"
        data-wow-duration=".8s"
        data-wow-delay=".2s"
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-5">
              <div className="instruc-sidebar mb-40">
                <div className="isntruc-side-thumb mb-30">
                  <img
                    src={instructorData.avatar ? instructorData.avatar : placeholderImage}
                    alt="instructor-thumb"
                    onError={(e) => {
                      e.target.src = placeholderImage;
                    }}
                  />
                </div>
                <div className="instructor-sidebar-widget">
                  <div className="isntruc-side-content text-center">
                    <h4 className="side-instructor-title mb-15">
                      {instructorData.userName}
                    </h4>
                  </div>
                  <div className="cd-information instruc-profile-info mb-35">
                    <ul>
                      <li>
                        <i className="fi fi-rr-phone-call"></i> <label>Phone</label>
                        <span>{instructorData.mobileNum}</span>
                      </li>
                      <li>
                        <i className="fi fi-rr-envelope"></i> <label>Email</label>
                        <span>{instructorData.email}</span>
                      </li>
                      <li>
                        <i className="fi fi-rs-time-check"></i>{" "}
                        <label>Skill Level</label>{" "}
                        <span>{instructorData.skillName}</span>
                      </li>
                      <li>
                        <i className="fi fi-rs-time-check"></i>{" "}
                        <label>Experience</label>{" "}
                        <span>12 years</span>
                      </li>
                      <li>
                        <i className="fi fi-rs-time-check"></i>{" "}
                        <label>Language</label>{" "}
                        <span>English</span>
                      </li>
                      <li>
                        <i className="fi fi-rs-time-check"></i>{" "}
                        <label>Artwork</label>{" "}
                        <Link href="/artwork">
                          <span>See more</span></Link>
                      </li>
                      <li>
                        <i className="fi fi-rs-time-check"></i>{" "}
                        <label>Education</label>{" "}
                        <span>{instructorData.education}</span>
                      </li>

                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-lg-7">
              <div className="instructor-main-content ml-30 mb-40">
                <div className="instruc-biography mb-50">
                  <h4 className="ins-bio-title mb-30">Biography</h4>
                  <p>{instructorData.bio}</p>
                </div>
                <div className="instructor-tp-artwork">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="instruc-biography">
                        <h2 className="ins-bio-title mb-35">Artworks</h2>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {artworkData.map((item, i) => (
                      <div key={i} className="col-xl-6 col-lg-12 col-md-6">
                        <div className="tpcourse mb-40">
                          <div className="tpcourse__thumb p-relative w-img fix">
                            <img src={item.image} alt="artwork-thumb" style={{ height: "200px", objectFit: "cover" }}/>
                          </div>
                          <div className="tpcourse__content-2">
                            <div className="tpcourse__category mb-10">
                              {item.categoryName}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="instructor-tp-Certificate">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="instruc-biography">
                        <h2 className="ins-bio-title mb-35">Certificate</h2>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {certificateData.map((item, i) => (
                      <div key={i} className="col-xl-6 col-lg-12 col-md-6">
                        <div className="tpcourse mb-40">
                          <div className="tpcourse__thumb p-relative w-img fix">
                            <img src={item.image} alt="certificate-thumb" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="instructor-tp-course">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="instruc-biography">
                        <h2 className="ins-bio-title mb-35">Courses</h2>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {coursesData.map((item, i) => (
                      <div key={i} className="col-xl-6 col-lg-12 col-md-6">
                        <div className="tpcourse mb-40">
                          <div className="tpcourse__thumb p-relative w-img fix">
                            <Link href="/course-details">
                              <img src={item.image} alt="course-thumb" style={{ height: "300px", objectFit: "cover" }}/>
                            </Link>
                            <div className="tpcourse__img-icon">
                              <img src={item.icon} alt="course-avata" />
                            </div>
                          </div>
                          <div className="tpcourse__content-2">
                            <div className="tpcourse__category mb-10">
                              <ul className="tpcourse__price-list d-flex align-items-center">
                                <li>
                                  <Link className={item.ct_color} href="/course-details">
                                    {item.category}
                                  </Link>
                                </li>
                                <li>
                                  <Link className={item.cn_color} href="/course-details">
                                    {item.skill}
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <div className="tpcourse__ava-title mb-15">
                              <h4 className="tpcourse__title">
                                <Link href="/course-details">{item.courseTitle}</Link>
                              </h4>
                            </div>
                            <div className="tpcourse__meta tpcourse__meta-gap pb-15 mb-15">
                              <ul className="d-flex align-items-center">
                                <li>
                                  <img src="/assets/img/icon/c-meta-01.png" alt="meta-icon" />
                                  <span>({item.numLesson})</span>
                                </li>
                                <li>
                                  <img src="/assets/img/icon/c-meta-02.png" alt="meta-icon" />
                                  <span>{item.st_text}</span>
                                </li>
                              </ul>
                            </div>
                            <div className="tpcourse__rating d-flex align-items-center justify-content-between">
                              <div className="tpcourse__rating-icon">
                                <span>{item.averageStar.toFixed(1)}</span>
                                <i className="fi fi-ss-star"></i>
                                <i className="fi fi-ss-star"></i>
                                <i className="fi fi-ss-star"></i>
                                <i className="fi fi-ss-star"></i>
                                <i className="fi fi-rs-star"></i>
                              </div>
                              <div className="tpcourse__pricing">
                                <h5 className="price-title">${item.price}</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InstructorPortfolioArea;
