import React, { useState, useEffect } from "react";
import axios from "axios";

const Sidebar = ({ setcategory }) => {
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
    <div className="sidebar__widget mb-40">
      <div className="row">
        <h3 className="sidebar__widget-title mb-10 col-md-7">Category</h3>
      </div>
      <div className="sidebar__widget-content">
        <ul>
          {categoryData.map((item) => (
            <li key={item.categoryId} style={{ cursor: "pointer" }}>
              <a onClick={() => setcategory(item.categoryId)}>
                {item.categoryName}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
