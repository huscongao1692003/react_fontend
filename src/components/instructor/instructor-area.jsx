import instructor_info_data from "@/src/data/instructor-data";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";

const InstructorArea = () => {
  const [blogData, setBlogData] = useState({});

  useEffect(() => {
    axios
      .get("https://drawproject-production.up.railway.app/api/v1/post?page=1&perPage=5")
      .then((response) => {
        setBlogData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
    {Array.isArray(blogData) &&
        blogData.map((post, index) => (
          <div key={index}>
            <h2>{post.data}</h2>
            <p>{post.description}</p>
          </div>
        ))}
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
            {instructor_info_data.map((item, i) => (
              <div key={i} className="col-lg-4 col-md-6 col-12">
                <div
                  className="tp-instruc-item wow fadeInUp"
                  data-wow-duration=".8s"
                  data-wow-delay=".2s"
                >
                  <div className="tp-instructor text-center p-relative mb-40">
                    <div className="tp-instructor__thumb mb-25">
                      <img src={item.img} alt="instructor-profile" />
                    </div>
                    <div className="tp-instructor__content">
                      <span>{item.title}</span>
                      <h4 className="tp-instructor__title tp-instructor__title-info p-relative mb-35 mt-5">
                        <Link href="/instructor-profile">{item.name}</Link>
                      </h4>
                      <div className="tp-instructor__stu-info">
                        <ul className="d-flex align-items-center justify-content-center">
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
