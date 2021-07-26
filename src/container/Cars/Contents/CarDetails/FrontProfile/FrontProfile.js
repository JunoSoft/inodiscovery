/** @format */

import React, { Component, Fragment } from "react";
import classes from "./FrontProfile.module.css";
import photo from "../../../../../assets/Images/Header Profile 2.png";
import MessageForm from "../../../../../components/Messages/Message";
class FrontProfile extends Component {
  render() {
    console.log(this.props.carProfile);
    const profile = this.props.carProfile.map((profiles) => {
      return (
        <div key={profiles.id}>
          <img className={classes.ProfileImage} src={photo} alt="" />
          <div className={classes.ProfileTitle}>
            {profiles.car_owner.companyName}
          </div>
          <div className={classes.ProfileSubTitle}>
            I am a car salesman; if you require additional vehicles, please see
            my full profile in the description
          </div>
          <ul>
            <li>{profiles.car_owner.email}</li>
            <li>{profiles.car_owner.phone}</li>
          </ul>
          <MessageForm blockerName={profiles.car_owner.companyName} />
        </div>
      );
    });
    return <Fragment>{profile}</Fragment>;
  }
}

export default FrontProfile;
