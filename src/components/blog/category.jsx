import Link from "next/link";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Category = () => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    axios
      .get("https://drawproject-production.up.railway.app/api/v1/post?page=1&perPage=5")
      .then((response) => {
        setCategoryData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

return (
  <>
    <div className="sidebar__widget mb-40">
      <h3 className="sidebar__widget-title mb-10">Category</h3>
      <div className="sidebar__widget-content">
        {categoryData.length === 0 ? (
          <p>Loading categories...</p>
        ) : (
          <ul>
            {categoryData.map((categoryItem) => (
              <li key={categoryItem.categoryId}>
                <Link href={`/blog?categoryId=${categoryItem.categoryId}`}>
                  {categoryItem.categoryName}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </>
);
};

export default Category;