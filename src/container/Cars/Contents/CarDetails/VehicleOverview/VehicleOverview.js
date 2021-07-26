import React from "react";
import classes from "./VehicleOverview.module.css";
import Overview from "./Overviews/Overview";
const VehicleOverview = (props) => {
  return (
    <div className={classes.VehicleOverviewContainer}>
      <p className={classes.VehicleOverview}>VehicleOverview</p>
      <div className={classes.Overviews}>
        <Overview name={props.interialColor} title="Interial Color"/>
        <Overview name={props.exterialColor} title="Exterial Color"/>
        <Overview name={props.engine} title="Engine"/>
        <Overview name={props.gas} title="Gas"/>
        <Overview name={props.transmission} title="Transmission" />
        <Overview name={props.price} title="Price" />
        <Overview name={props.mileAge} title="Mile Age" />
      </div>
    </div>
  );
};

export default VehicleOverview;
