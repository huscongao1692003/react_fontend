
import instructor_info_data from "@/src/data/instructor-data";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import Spinner from 'react-bootstrap/Spinner';
import InstructorPortfolioArea from "../instructor-profile/instructor-portfolio-area";

const InstructorArea = () => {
  const [instructorData, setInstructorData] = useState([]);
  const [loading, setLoading] = useState(true);
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
      <section className="instructor-area pb-110">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title mb-65 text-center">
                <span className="tp-sub-title-box mb-15">Instructor</span>
                <h2 className="tp-section-title">Our Expert Instructor</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {instructorData.map((item, i) => (
              <div key={i} className="col-lg-4 col-md-6 col-12">
                <div
                  className="tp-instruc-item wow fadeInUp"
                  data-wow-duration=".8s"
                  data-wow-delay=".2s"
                >
                  <div className="tp-instructor text-center p-relative mb-40">
                    <div className="tp-instructor__thumb mb-25">
                      <img src={item.avatar} alt="instructor-profile" />
                    </div>
                    <div className="tp-instructor__content">
                      <span>{item.username}</span>
                      <h4 className="tp-instructor__title tp-instructor__title-info p-relative mb-35 mt-5">
                        <Link href={`/instructor-profile?userId=${item.userId}`}>
                          {item.username}
                        </Link>
                      </h4>
                      <div className="tp-instructor__stu-info">
                        <ul className="d-flex align-items-center justify-content-center">
                          <li>Number of Courses: {item.numberOfCourse}</li>
                        </ul>
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

export default InstructorArea;

