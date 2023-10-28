import React from "react";

const Pagination = ({ page, setPage, totalPage }) => {
  if(totalPage == 0)
  return (
    <>
      <div className="basic-pagination">
        <nav>
          <ul>
            <li>
              <i className="far fa-angle-left"></i>
            </li>
            {Array.from({ length: totalPage }, (_, index) => (
              <li key={index} >
                <span className={index == page ? "current": ""}>1</span>
              </li>
            ))}
            <li>
              <i className="far fa-angle-right"></i>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Pagination;