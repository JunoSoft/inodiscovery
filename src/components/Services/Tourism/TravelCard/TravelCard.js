import React from "react";
import classes from "./TravelCard.module.css";
const travelCard = (props) => {
  const styles = {
    backgroundImage: `url(${props.image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backGroundPosition: "center",
  };
  return (
    <div className={classes.TripCard} onClick={props.clicked}>
      <div className={classes.CardImageHolder} style={styles}>
        <img src={props.image} />
      </div>
      <div className={classes.CardContent} onClick={props.clicked}>
        <h3>{props.tripName}</h3>
        <span>With: {props.agency}</span>

        <p>COST: {props.cost}</p>
        <div className={classes.Mission}>
          <i className="fa fa-map-marker"></i>{` `}
          {props.location}
        </div>
      </div>
    </div>
  );
};

export default travelCard;
