import React from "react";
import "./partner.css";

const partner = (props) => (
  <div className="partnerItem">
    <a href={props.pLink} target="_blank">
      <img src={props.image} alt="partner" />
    </a>
  </div>
);

export default partner;
