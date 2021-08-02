import React from "react";
import classes from "./SearchResults.module.css";

export default function SearchResult(props) {
  return (
    <div className={classes.SearchResultContainer} onClick={props.clicked}>
      <div className={classes.SearchResultImage}>
        <img src={props.imageUrl} alt="Newpic" />
      </div>
      <div>
        <div>
          {props.nameTitle} {props.carType}
        </div>
        <div>{props.subtitle}</div>
      </div>
    </div>
  );
}
