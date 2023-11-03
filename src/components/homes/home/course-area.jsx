import course_data from "@/src/data/course-data";
import Link from "next/link";
import React,{useState,useEffect} from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { randomColor } from "@/utils/utils";

const CourseArea = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const placeholderImage = "/assets/img/instructor.png";
  const router = useRouter();
  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios
      .get('https://drawproject-production-012c.up.railway.app/api/v1/courses/top-courses?limit=3')
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
      <section
        className="course-area pt-115 pb-110 wow fadeInUp"
        data-wow-duration=".8s"
        data-wow-delay=".4s"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title mb-65">
                <h2 className="tp-section-title mb-20">
                  Explore Popular Courses
                </h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {courses.map((course, i) => (
              <div key={i} className="col-xl-4 col-lg-6 col-md-6">
                <div className="tpcourse mb-40">
                  <div className="tpcourse__thumb p-relative w-img fix">
                    <Link href={`/course-details?id=${course.courseId}`}>
                      <img src={course.image} alt="course-thumb" />
                    </Link>
                    <div className="tpcourse__tag">
                      <Link href={`/course-details?id=${course.courseId}`}>
                        <i className="fi fi-rr-heart"></i>
                      </Link>
                    </div>
                  </div>
                  <div className="tpcourse__content">
                    <div className="tpcourse__avatar d-flex align-items-center mb-20">
                      <div className="circular-avatar resize-avatar-course">
                        <img src={course.avatar && course.avatar !== "null" ? course.avatar : placeholderImage} alt="course-avatar" onError={(e) => {
                          e.target.src = placeholderImage
                        }} />
                      </div>
                      <h4 className="tpcourse__title">
                        <Link href={`/course-details?id=${course.courseId}`}>{course.courseTitle}</Link>
                      </h4>
                    </div>
                    <div className="tpcourse__meta pb-15 mb-20">
                      <ul className="d-flex align-items-center">
                        <li>
                          <img
                            src="/assets/img/icon/c-meta-01.png"
                            alt="meta-icon"
                          />
                          <span>{course.numLesson} Lessons</span>
                        </li>
                        <li>
                          <img
                            src="/assets/img/icon/c-meta-02.png"
                            alt="meta-icon"
                          />
                          <span>{course.numStudent} Students</span>
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faStar} style={{color: "orangered", marginRight: "0.2rem"}}/>
                          <span>{course.averageStar.toFixed(1)}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="tpcourse__category d-flex align-items-center justify-content-between">
                      <ul className="tpcourse__price-list d-flex align-items-center">
                        <li className = {randomColor()} >
                          <Link href={`/course-details?id=${course.courseId}`}>{course.categoryName}</Link>
                        </li>
                        <li className = {randomColor()}>
                          <Link href={`/course-details?id=${course.courseId}`}>{course.drawingStyleName}</Link>
                        </li>
                        <li className="tpcourse__course-price">
                          ${course.price}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row text-center">
            <div className="col-lg-12">
              <div className="course-btn mt-20">
                <Link className="tp-btn" href="/course-details">
                  Browse All Courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseArea;
