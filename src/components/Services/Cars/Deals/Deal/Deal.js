/** @format */

import React from "react";
import classes from "./Deal.module.css";
import CurrencyFormat from "react-currency-format";

const Deal = (props) => {
  return (
    <div className={classes.Deal}>
      <div className={classes.DealPhoto}>
        <img src={props.images} alt={props.carName} />
      </div>
      <div className={classes.DealContents}>
        <div>
          <CurrencyFormat
            value={props.price}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"RWF "}
          />
        </div>
        <div className={classes.DealContent}>
          <p>
            <strong>{props.carName}</strong>
          </p>
          <p className={classes.MoreDealsDetails}>
            {props.carDetails} {/*.slice(0, 120)*/}
          </p>
          <button onClick={props.clicked}>More Details</button>
        </div>
      </div>
    </div>
  );
};

export default Deal;
