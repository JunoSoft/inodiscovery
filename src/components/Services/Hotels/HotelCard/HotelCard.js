/** @format */

import React from "react";
import classes from "./HotelCard.module.css";
import CurrencyFormat from "react-currency-format";

const hotelCard = (props) => {
  const styles = {
    backgroundImage: `url(${props.image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backGroundPosition: "center",
  };
  const starsDom = [];
  const starsNumber = new Array(props.stars);
  let i;
  for (i = 0; i < starsNumber.length; i++) {
    starsDom.push(<i key={i} className="fa fa-star fa-1x"></i>);
  }
  return (
    <div className={classes.HotelCard} onClick={props.clicked}>
      <div className={classes.HotelImageHolder} style={styles}></div>
      <div className={classes.CardContent}>
        <h3>{props.name}</h3>
        <div className={classes.StarsConatiner}>       
        {starsDom}
          </div>
        <div className={classes.Mission}>
          From __{" "}
          <span>
            <s> {props.minCost} RWf </s>
          </span>
          <span
            style={{
              color: "#DF7400",
              fontWeight: "bold",
              paddingLeft: "0.3rem",
              border: "none",
            }}
          >
            <CurrencyFormat
              value={props.discount}
              displayType={"text"}
              thousandSeparator={true}
              suffix={"RWF "}
            />
          </span>
          <div className={classes.Location}>
            <i className="fa fa-map-marker fa-1x"></i> {props.location}
          </div>
        </div>
      </div>
      <div className={classes.Recommend}>Recommended</div>
    </div>
  );
};

export default hotelCard;
