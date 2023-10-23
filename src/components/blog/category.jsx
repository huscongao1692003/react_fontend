import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Category = () => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    axios
      .get("https://drawproject-production.up.railway.app/api/v1/category")
      .then((response) => {
        setCategoryData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="sidebar__widget mb-40">
        <div className="row">
          <h3 className="sidebar__widget-title mb-10 col-md-7">Category</h3>
        </div>
        <div className="sidebar__widget-content">
          <ul>
            {categoryData.map((item) => (
              <li key={item.categoryId}>
                <Link href={`/blog?categoryId=${item.categoryId}`}>
                  {item.categoryName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Category;

// import Link from "next/link";
// import React from "react";
// import { useState, useEffect } from "react";
// import axios from "axios";

// // category_data
// const category_data = [
//   {
//     category: "Business",
//     blog_item: "14",
//   },
//   {
//     category: "Cleaning",
//     blog_item: "19",
//   },
//   {
//     category: "Consultant",
//     blog_item: "21",
//   },
//   {
//     category: "Creative",
//     blog_item: "27",
//   },
//   {
//     category: "Technology",
//     blog_item: "35",
//   },
// ];

// const Category = () => {

//   return (
//     <>
//       <div className="sidebar__widget mb-40">
//         <h3 className="sidebar__widget-title mb-10">Category</h3>
//         <div className="sidebar__widget-content">
//           <ul>
//             {category_data.map((item, i) => (
//               <li key={i}>
//                 <Link href="/blog">
//                   {item.category} <span>({item.blog_item})</span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Category;
