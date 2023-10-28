import React from "react";

const BlogSearch = ({ setSearchValue, searchValue }) => {
  return (
    <>
      <div className="sidebar__widget mb-55">
        <div className="sidebar__widget-content">
          <h3 className="sidebar__widget-title mb-25">Search</h3>
          <div className="sidebar__search">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="sidebar__search-input-2">
                <input
                  type="text"
                  placeholder="Search Anything"
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                />
                <button type="submit">
                  <i className="far fa-search"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogSearch;
