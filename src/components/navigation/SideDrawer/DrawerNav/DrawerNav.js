import React from "react";
import { Link } from "react-router-dom";
import classes from "./DrawerNav.module.css";
const drawerNav = (props) => (
  <div className={classes.DrawerNav} onClick={props.close}>
    <Link to={props.link}>
      <i className={props.icon}></i>
      {props.children}
    </Link>
  </div>
);
export default drawerNav;
