import React from "react";
import { ALL, DONE, TODO } from "../useFilter";
import { Link } from "react-router-dom";

function Filter({ setActiveFilter }) {
  return (
    <div className="filter_todo">
      <Link
        onClick={(e) => {
          setActiveFilter(ALL);
        }}
        to="/"
      >
        All
      </Link>
      |
      <Link onClick={(e) => setActiveFilter(DONE)} to="/done">
        Done
      </Link>
      |
      <Link onClick={(e) => setActiveFilter(TODO)} to="/todo">
        To do
      </Link>
    </div>
  );
}

export default Filter;
