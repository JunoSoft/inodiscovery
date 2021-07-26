import React from "react";
import classes from "./Overview.module.css";
const Overview = (props) => {
  return (
    <div className={classes.OverviewsContainer}>
      <div className={classes.Icon}>
        <span>-</span>
      </div>
      <div>
        <div>
          <p className={classes.Overview}>{props.title}</p>
          <p className={classes.Overview2}>{props.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
