import Link from "next/link";
import React from "react";

// category_data
const category_data = [
  {
    id: 1,
    img: "/assets/img/category/drawing.png",
    title: "Drawing",
    link: "/course-list",
  },
  {
    id: 2,
    img: "/assets/img/category/digital.png",
    title: "Digital",
    link: "/course-list",
  },
  {
    id: 3,
    img: "/assets/img/category/sketching.png",
    title: "Sketching",
    link: "/course-list",
  },
  {
    id: 4,
    img: "/assets/img/category/painting.png",
    title: "Painting",
    link: "/course-list",
  },
  {
    id: 5,
    img: "/assets/img/category/comic.png",
    title: "Comic",
    link: "/course-list",
  },
  {
    id: 6,
    img: "/assets/img/category/animal.png",
    title: "Animals",
    link: "/course-list",
  },
  {
    id: 7,
    img: "/assets/img/category/animation.png",
    title: "Animation",
    link: "/course-list",
  },
  {
    id: 8,
    img: "/assets/img/category/landscape.png",
    title: "Landscape",
    link: "/course-list",
  },
  
];


const CategoryArea = () => {
  return (
    <>
      <section
        className="tp-category-area bg-bottom grey-bg pt-110 pb-80 wow fadeInUp"
        data-wow-duration="1.5s"
        data-wow-delay=".4s"
        style={{ backgroundImage: `url(/assets/img/bg/shape-bg-1.png)` }}
      >
        <div className="container" style={{textAlign: "center"}}>
          <div className="row text-center">
            <div className="col-lg-12">
              <div className="section-title mb-65">
                <h2 className="tp-section-title">Top Categories</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {category_data.map((item) => (
              <div key={item.id} className="col-xl-3 col-lg-4 col-md-6">
                <div className="tp-cat-item mb-40 d-flex align-items-center">
                  <div className="tp-category-icon mr-15">
                    <img src={item.img} alt="category-img" />
                  </div>
                  <h4 className="tp-category-title">
                    <Link href={item.link}>{item.title}</Link>
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryArea;
