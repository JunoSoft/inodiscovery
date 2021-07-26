/** @format */

import React, { Component } from "react";
import classes from "./CarDetails.module.css";
import Aux from "../../../../hoc/Auxilliary/Auxilliary";
import VehicleOverview from "./VehicleOverview/VehicleOverview";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../../hoc/Axios/Axios";
import parse from "html-react-parser";

class CarDetails extends Component {
  state = {
    loadedCar: null,
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      if (
        !this.state.loadedCar ||
        (this.state.loadedCar &&
          this.state.loadedCar.id !== +this.props.match.params.id)
      ) {
        axios.get("cars/" + this.props.match.params.id).then((response) => {
          console.log("aaaaa", response);
          this.setState({ loadedCar: response.data });
        });
      }
    }
  }
  render() {
    let postedCar = <p>Hello world</p>;
    if (this.props.match.params.id) {
      postedCar = <Spinner />;
    }
    if (this.state.loadedCar) {
      postedCar = (
        <Aux>
          <div className={classes.carDetails}>
            <div className={classes.ImageContainer}>
              <img
                src={this.state.loadedCar.images}
                alt={this.state.loadedCar.images}
              />
              <div className={classes.FeatherBanner} />
            </div>
            <div className={classes.FullCar}>
              <div className={classes.TitlePhoto}>
                <img
                  src={this.state.loadedCar.images}
                  alt={this.state.loadedCar.images}
                />
              </div>
              <div className={classes.CarDescription}>
                <p className={classes.ContentTitle}>
                  {this.state.loadedCar.carName}
                </p>
                <p className={classes.CarSubTitle}>
                  {this.state.loadedCar.carType}
                </p>
                <p className={classes.CarContent}>
                  {parse(this.state.loadedCar.carDetails)}
                </p>
                <button onClick={this.showContactHandler}>Let's Deal</button>
              </div>
            </div>
            <div className={classes.CarAllSides}>
              <div className={classes.SidesPhoto}>
                <img src={this.state.loadedCar.otherImages} alt="" />
              </div>
              <div className={classes.SidesPhoto}>
                <img src={this.state.loadedCar.otherImages} alt="" />
              </div>
              <div className={classes.SidesPhoto}>
                <img src={this.state.loadedCar.otherImages.image3} alt="" />
              </div>
              <div className={classes.SidesPhoto}>
                <img src={this.state.loadedCar.otherImages} alt="" />
              </div>
            </div>
            <VehicleOverview
              interialColor={this.state.loadedCar.interialColor}
              exterialColor={this.state.loadedCar.exterialColor}
              engine={this.state.loadedCar.engine}
              gas={this.state.loadedCar.gas}
              transmission={this.state.loadedCar.transmission}
              price={this.state.loadedCar.price}
              mileAge={this.state.loadedCar.mileAge}
            />
          </div>
        </Aux>
      );
    }
    return postedCar;
  }
}

export default CarDetails;
