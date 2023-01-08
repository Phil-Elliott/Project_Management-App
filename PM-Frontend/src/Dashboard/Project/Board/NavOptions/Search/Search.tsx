import React, { useState, useEffect } from "react";
import "./Search.scss";
import { FaSearch } from "react-icons/fa";
import { useDebounce } from "usehooks-ts";
import { useDispatch } from "react-redux";
import { changeSearchQuery } from "../../../ProjectSlice";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedValue = useDebounce<string>(searchQuery, 500);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(searchQuery);
    dispatch(changeSearchQuery(searchQuery));
  }, [debouncedValue]);

  // useEffect(() => {
  //   console.log("set searchQuery to blank");
  // }, []);

  return (
    <div className="search-container">
      <FaSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default Search;

/*

  Search through all of the tasks and just display the ones that match the search query

  

  

  3) Have the tasks that match the search query show up
      - could make a state in my slice that holds the search query
      - Grab it in the task component and filter through the tasks if the query has a value
      - Need to make sure that the search query is empty when the user leaves the page 

    Page changes and the search query state is set to empty



  1) Have search show what is being typed
      - Need to add a state to hold the value of the input
      - Need to add an onChange to the input
      - Need to add a value to the input

  2) Add debounce to search
      - I think there is a debounce from the same npm i used with outside click
*/
