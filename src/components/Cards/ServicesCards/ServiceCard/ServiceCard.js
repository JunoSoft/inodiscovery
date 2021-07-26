import React from "react";
import classes from "./ServiceCard.module.css";
import { Link } from "react-router-dom";

const serviceCard = (props) => {
  const style = {
    backgroundColor: props.background,
  };
  return (
    <div className={classes.ServiceCard} style={style}>
      <Link to={props.link}>
        <div className={classes.IconHolder}>
          <span>
            <i className={props.icon}></i>
          </span>
        </div>
        <div className={classes.CardMore}>
          <h4>{props.children}</h4>
        </div>
      </Link>
    </div>
  );
};
export default serviceCard;
