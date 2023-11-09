import Link from "next/link";
import React from "react";

const choose_data = {
  bg_img: "https://d3rf6j5nx5r04a.cloudfront.net/bCxm8hiIChWhmYN2sqdnZBKzzac=/1120x0/product/c/9/4ec3c06691ec41eaacb1b8f2f6b4f928_opt.jpg",
  experiences_years: "23",
  title: "Why Choose Us",
  sub_title: (
    <>
      Why You Choose Our
      <br />
      E-Pora Online learning
    </>
  ),
  des: 'Choose E-Pora Online Learning for a transformative education experience. Our platform offers top-quality courses, expert instructors, and a flexible learning environment tailored to your needs. Elevate your skills and knowledge with us!',

  choose_list: [
    { title: "Increasing Your Learning Skills" },
    { title: "High Quality Video & Audio Classes" },
    { title: "Finish Your Course, Get Certificate" },
  ],
};

const { bg_img, experiences_years, title, sub_title, des, choose_list } =
  choose_data;
const ChooseArea = () => {
  return (
    <>
      <section
        className="choose-area pb-90 wow fadeInUp"
        data-wow-duration=".8s"
        data-wow-delay=".4s"
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-7 col-lg-6 col-md-6">
              <div className="tp-choose-img p-relative mb-30 ml-25">
                <img src={bg_img} style={{borderRadius:"10%"}} alt="choose-img" />
                <div className="tpchoose-img-text d-none d-md-block">
                  <ul>
                    <li>
                      <i>{experiences_years}+</i>
                      <p>Years Experiences</p>
                    </li>
                    <li>
                      <i className="fa-light fa-check"></i>
                      <p>Fully Safe & Secure</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-6 col-md-6">
              <div className="tp-choose-content mb-30">
                <div className="section-title mb-25">
                  <span className="tp-sub-title mb-25">{title}</span>
                  <h2 className="tp-section-title mb-20">
                   {sub_title}
                  </h2>
                  <p>
                    {des}
                  </p>
                </div>
                <div className="tp-choose-list mb-35">
                  <ul>
                    {choose_list.map((item, i) => (
                      <li key={i}>
                        <i className="fa-light fa-check"></i> {item.title}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="choose-btn">
                  <Link href="/about" className="tp-btn">
                    Explore Courses
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChooseArea;
