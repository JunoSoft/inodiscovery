import React from "react";
import classes from "./AppartementCard.module.css";

const Appartement = (props) => {
  return (
    <div className={classes.Card} onClick={props.clicked}>
      <div className={classes.CardImageHolder}>
        <img src={props.image} />
      </div>
        <h3>{props.appartName}</h3>
      <div className={classes.Cost}>
        {props.miniCost} 
      </div>
      <div className={classes.CardContent}>
        <div className={classes.Location}><i className="fa fa-map-marker"></i >{props.location}</div>
        <div>
        </div>
      </div>
    </div>
  );
};

export default Appartement;
