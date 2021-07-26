/** @format */

import classes from "./SelectedType.module.css";
import React from "react";
import CurrencyFormat from "react-currency-format";

const SelectedType = (props) => {
  return (
    <div className={classes.SelectedType}>
      <div className={classes.imageContainer}>
        <img src={props.carPhoto} alt={props.name} />
      </div>
      <div className={classes.Car_card_Details}>
        <div className={classes.CarTitle_}>
          {props.carName} {props.carType}
        </div>
        <p className={classes.SelectedCarDescription}>
          {props.carDetails.slice(0, 150)}
        </p>
        <button onClick={props.clicked} className={classes.BuyCar}>
          Deal
        </button>
        <p className={classes.CarPrice}>
          Price:{" "}
          <CurrencyFormat
            value={props.price}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"RWF "}
          />
        </p>
      </div>
    </div>
  );
};

export default SelectedType;
