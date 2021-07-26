import React from "react";
import classes from "./Logo.module.css";

const logo = (props) => (
  <div className={classes.Ino} onClick={props.clicked}>
    <span>INO</span> Discovery
  </div>
);
export default logo;
