import React from "react";
import { randomColor } from "utils/utils"
import Link from "next/link";

const DisplayCourse = ( {courses} ) => {

    const placeholderImage = "/assets/img/instructor.png";
    const courseImage = "/assets/img/course/course.jpg";

    const renderStarIcons = (averageStar) => {
        const starIcons = [];
        const roundedAverageStar = Math.round(averageStar); // Round to the nearest whole number
    
        for (let i = 1; i <= 5; i++) {
          if (i <= roundedAverageStar) {
            // Full star
            starIcons.push(<i key={i} className="fi fi-ss-star"></i>);
          } else if (i - 1 < averageStar && i > averageStar) {
            // Half star
            starIcons.push(<i key={i} className="fi fi-ss-star-half"></i>);
          } else {
            // Empty star
            starIcons.push(<i key={i} className="fi fi-rs-star"></i>);
          }
        }
    
        return starIcons;
      };

  return <>{courses.map((course, i) => (
    <div key={i} className="tpcourse tp-list-course mb-40">
      <div className="row g-0">
        <div className="col-xl-4 course-thumb-width">
          <div className="tpcourse__thumb p-relative w-img fix">
            <Link href={`/course-details?id=${course.courseId}`}>
              <img
                src={
                  course.image && course.image !== "null"
                    ? course.image
                    : courseImage
                }
                alt="course-avatar"
                onError={(e) => {
                  e.target.src = courseImage;
                }}
              />
            </Link>
          </div>
        </div>
        <div className="col-xl-8  course-text-width">
          <div className="course-list-content">
            <div className="tpcourse__category mb-10">
              <ul className="tpcourse__price-list d-flex align-items-center">
                <li>
                  <Link className={randomColor()} href="/course-details">
                    {course.skillName}
                  </Link>
                </li>
                <li>
                  <Link className={randomColor()} href="/course-details">
                    {course.categoryName}
                  </Link>
                </li>
                <li>
                  <Link className={randomColor()} href="/course-details">
                    {course.drawingStyleName}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="tpcourse__ava-title mb-15">
              <h4 className="tpcourse__title tp-cours-title-color">
                <Link href={`/course-details?id=${course.courseId}`}>
                  {course.courseTitle}
                </Link>
              </h4>
            </div>
            <div className="tpcourse__meta tpcourse__meta-gap pb-15 mb-15">
              <ul className="d-flex align-items-center">
                <li>
                  <img src="/assets/img/icon/c-meta-01.png" alt="meta-icon" />
                  <span>{course.numLesson} Lessons</span>
                </li>
                <li>
                  <img src="/assets/img/icon/c-meta-02.png" alt="meta-icon" />
                  <span>{course.numStudent} Students</span>
                </li>
              </ul>
            </div>
            <div className="tpcourse__rating d-flex align-items-center justify-content-between">
              <div className="tpcourse__rating-icon">
              <span style={{marginRight: "0.3rem"}} >{course.averageStar.toFixed(1)}</span>
                {renderStarIcons(course.averageStar)}
                {/* <p>({course.numReviews})</p> */}
              </div>
              <div className="tpcourse__pricing">
                <h5 className="price-title">${course.price}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}</>;
};


export default DisplayCourse;