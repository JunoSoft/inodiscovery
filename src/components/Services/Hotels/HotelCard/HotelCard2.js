/** @format */

import React from "react";
import classes from "./HotelCard2.module.css";
import CurrencyFormat from "react-currency-format";

const CardTwo = (props) => {
  const starsDom = [];
  const starsNumber = new Array(props.stars);
  let i;
  for (i = 0; i < starsNumber.length; i++) {
    starsDom.push(<i key={i} className="fa fa-star fa-1x"></i>);
  }
  return (
    <div className={classes.HotelCard} onClick={props.clicked}>
      <div className={classes.CardImageHolder}>
        <img src={props.image} alt={props.hotelName} />
      </div>
      <div className={classes.CardContent}>
        <div className={classes.StarsConatiner}>

        {starsDom}
        </div>
        <h3>{props.name}</h3>

        <div className={classes.Location}>
          <p className={classes.Stricked}>
            <s>
              <CurrencyFormat
                value={props.minCost}
                thousandSeparator={true}
                displayType={"text"}
                suffix={"RWF "}
              />
            </s>
          </p>
          {props.location}
          <p className={classes.ReadMore}>Explore More</p>
        </div>
      </div>
      <div className={classes.Cost}>
        <CurrencyFormat
          value={props.discount}
          thousandSeparator={true}
          displayType={"text"}
          suffix={"  RWF  "}
        />
      </div>
    </div>
  );
};

export default CardTwo;
