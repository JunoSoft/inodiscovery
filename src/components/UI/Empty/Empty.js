/** @format */

import React from "react";
import "./Empty.css";
import EmptyImage from "../../../assets/illustrations/Group 93.png";
export default function Empty(props) {
  return (
    <div className="empty">
      <div className="empty-image">
        <img src={EmptyImage} alt="empty-Image" />
      </div>
      <p className="empty-message">{props.message}</p>
    </div>
  );
}
