import React from "react";
import classes from "./SectionHeader.module.css";

const header = (props) => (
  <div className={classes.SectionHeader}>
    <h1>{props.title}</h1>
    <p>{props.subtitle}</p>
    <hr />
  </div>
);

export default header;
