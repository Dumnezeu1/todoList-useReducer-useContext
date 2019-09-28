import React from "react";
import { ALL, DONE, TODO } from "../useFilter";
import { Link } from "react-router-dom";

const style = {
  display: "flex",
  justifyContent: "space-between",
  margin: "20px auto 20px auto",
  textAlign: "center",
  maxWidth: "300px"
};

function Filter({ setActiveFilter }) {
  return (
    <div style={style}>
      <Link
        onClick={e => {
          setActiveFilter(ALL);
        }}
        to="/"
      >
        All
      </Link>
      |
      <Link onClick={e => setActiveFilter(DONE)} to="/done">
        Done
      </Link>
      |
      <Link onClick={e => setActiveFilter(TODO)} to="/todo">
        To do
      </Link>
    </div>
  );
}

export default Filter;
