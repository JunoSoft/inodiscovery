/** @format */

import React from "react";
import classes from "./CarCard.module.css";
const carCard = (props) => {
  const styles = {
    backgroundImage: `url(${props.image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backGroundPosition: "center",
  };
  return (
    <div className={classes.CarCard} onClick={props.clicked}>
      <div className={classes.CardImageHolder} style={styles}></div>
      <div className={classes.CardContent}>
        <h3>{props.carName}</h3>

        <div className={classes.Mission}><span style={{color:"var(--clr-yellow1)"}}>{props.carType}</span> 
          <div className={classes.Description}>{props.description}...</div>
        </div>
      </div>
      <div className={classes.Recommend}>let's Deal</div>
      <div className={classes.CostHold}> {props.price} RWF</div>
    
      <div className={classes.Hidex}></div>
    </div>
  );
};

export default carCard;
