import React from "react";
import classes from "./SearchItems.module.css";

export default function SearchItems(props) {
  return (
    <div onClick={props.clicked} className={classes.SearchNavItem}>
      {props.name}
    </div>
  );
}
