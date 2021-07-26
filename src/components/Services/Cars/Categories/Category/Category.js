/** @format */

import React from "react";
import classes from "./Category.module.css";
const Category = (props) => {
  return (
    <div className={classes.Categorie_Card}>
      {/* <div className={classes.CarPhoto}>
        <img src={props.name} alt={props.title} />
      </div> */}
      <div className={classes.Content_Card}>
        <div className={classes.Content_Container}>
          <p>{props.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Category;
