import our_course_data from "@/src/data/our-course-data";
import Link from "next/link";
import React, {useState,useEffect} from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import Spinner from 'react-bootstrap/Spinner';

const CourseArea = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axios
      .get('https://drawproject-production.up.railway.app/api/v1/courses?page=1&eachPage=4&star=0')
      .then((response) => {
        const data = response.data.data;
        setCourses(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
    }, []); // Empty dependency array means this effect runs once when the component mounts

  if (loading) {
    return  <div className="d-flex flex-column justify-content-center align-items-center" style={{ paddingTop: '300px', paddingBottom: '300px' }}>
      <Spinner animation="grow" variant="success" size="lg"/>
    </div>;
  }
  return (
    <>
      <section className="course-area mb-80">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title mb-65">
                <h2 className="tp-section-title mb-20">Related Courses</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {courses.slice(0, 3).map((item, i) => (
              <div key={i} className="col-xl-4 col-lg-6 col-md-6">
                <div
                  className="tpcourse mb-40 wow fadeInUp"
                  data-wow-duration=".8s"
                  data-wow-delay=".3s"
                >
                  <div className="tpcourse__thumb p-relative w-img fix">
                    <Link href={`/course-details?id=${item.courseId}`}>
                      <img src={item.image} alt="course-thumb" />
                    </Link>
                    <div className="tpcourse__tag">
                      <Link href={`/course-details?id=${item.courseId}`}>
                        <i className="fi fi-rr-heart"></i>
                      </Link>
                    </div>
                    {/*<div className="tpcourse__img-icon">*/}
                    {/*  <img src={item.icon} alt="course-avata" />*/}
                    {/*</div>*/}
                  </div>
                  <div className="tpcourse__content-2">
                    <div className="tpcourse__category mb-10">
                      <ul className="tpcourse__price-list d-flex align-items-center">
                        <li>
                          <Link
                            className={item.ct_color}
                            href={`/course-details?id=${item.courseId}`}
                          >

                            {item.category}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={item.cn_color}
                            href={`/course-details?id=${item.courseId}`}
                          >
                            {item.skill}
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="tpcourse__ava-title mb-15">
                      <h4 className="tpcourse__title tp-cours-title-color">
                        <Link href={`/course-details?id=${item.courseId}`}>{item.courseTitle}</Link>
                      </h4>
                    </div>
                    <div className="tpcourse__meta tpcourse__meta-gap pb-15 mb-15">
                      <ul className="d-flex align-items-center">
                        <li>
                          <img
                            src="/assets/img/icon/c-meta-01.png"
                            alt="meta-icon"
                          />{" "}
                          <span>{item.numLesson}</span>
                        </li>
                        <li>
                          <img
                            src="/assets/img/icon/c-meta-02.png"
                            alt="meta-icon"
                          />{" "}
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
      </section>
    </>
  );
};

export default CourseArea;
