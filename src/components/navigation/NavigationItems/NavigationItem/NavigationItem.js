import React from "react";
import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";

const navigationItem = (props) => (
  <li
    className={classes.NavItem}
    onMouseEnter={props.hovered}
    onMouseLeave={props.noHover}
    onClick={props.clicked}
  >
    <NavLink
      to={props.link}
      activeClassName={classes.active}
      exact={props.exact}
    >
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
