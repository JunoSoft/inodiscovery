import React from "react";
import classes from "./SearchSpinner.module.css";
const SearchSpinner = (props) => (
  <div className={classes.LoaderContainer}>
    <div className={classes.Loader}>Loading...</div>
  </div>
);
export default SearchSpinner;
