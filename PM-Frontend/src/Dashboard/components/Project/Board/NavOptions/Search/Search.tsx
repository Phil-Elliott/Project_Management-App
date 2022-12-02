import React from "react";
import "./Search.scss";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <div className="search-container">
      <FaSearch className="search-icon" />
      <input></input>
    </div>
  );
};

export default Search;
