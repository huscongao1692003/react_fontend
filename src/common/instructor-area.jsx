import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const InstructorArea = ({ style_2 }) => {
  const [instructorData, setInstructorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const placeholderImage = "/assets/img/zdJeuso-_400x400.jpg";

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
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ paddingTop: "300px", paddingBottom: "300px" }}
      >
        <Spinner animation="grow" variant="success" size="lg" />
      </div>
    );
  }

  // Limit the number of displayed instructors
  const displayedInstructors = instructorData.slice(0, 3);

  return (
    <>
      <section className="instructor-area pb-110">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title mb-65 text-center">
                <span className="tp-sub-title-box mb-15">Instructor</span>
                <h2 className="tp-section-title">Our Expert Instructors</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {displayedInstructors.map((instructor, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-12">
                <div className="tp-instruc-item wow fadeInUp" data-wow-duration=".8s" data-wow-delay=".2s">
                  <div className="tp-instructor text-center p-relative mb-40">
                    <div className="tp-instructor__thumb mb-25">
                      <img
                        src={instructor.avatar || placeholderImage}
                        alt="instructor-thumb"
                        onError={(e) => {
                          e.target.src = placeholderImage;
                        }}
                      />
                    </div>
                    <div className="tp-instructor__content">
                      <span>{instructor.username}</span>
                      <h4 className="tp-instructor__title tp-instructor__title-info p-relative mb-35 mt-5">
                        <Link href={`/instructor-profile?userId=${instructor.userId}`}>
                          {instructor.username}
                        </Link>
                      </h4>
                      <div className="tp-instructor__stu-info">
                        <ul className="d-flex align-items-center justify-content-center">
                          <li>Number of Courses: {instructor.numberOfCourse}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="instructor-btn text-center">
                <Link className="tp-btn" href="/instructor">
                  All Instructors
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
