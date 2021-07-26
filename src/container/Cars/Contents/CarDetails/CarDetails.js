/** @format */

import React, { Component } from "react";
import classes from "./CarDetails.module.css";
import Aux from "../../../../hoc/Auxilliary/Auxilliary";
import VehicleOverview from "./VehicleOverview/VehicleOverview";
import { withRouter } from "react-router-dom";
import Spinner from "../../../../components/UI/Spinner/Spinner2";
import axios from "../../../../hoc/Axios/Axios";
import FrontProfile from "../CarDetails/FrontProfile/FrontProfile";
import { SideBySideMagnifier } from "react-image-magnifiers";
import Modal from "../../../../components/UI/Modal/Modal2";
import Footer from "../../../../components/Footer/Footer";
class CarDetails extends Component {
  state = {
    loadedCar: null,
    isModalOpen: false,
  };

  showContactHandler = () => {
    this.setState({ isModalOpen: true, backdrop: false });
  };
  closeModalHandler = () => {
    this.setState({ isModalOpen: false });
    console.log("Hello");
  };
  componentDidMount() {
    if (this.props.match.params.id) {
      if (
        !this.state.loadedCar ||
        (this.state.loadedCar &&
          this.state.loadedCar.id !== +this.props.match.params.id)
      ) {
        axios.get("car-posts").then((response) => {
          const selectedCar = response.data.filter(
            (car) => car.id === this.props.match.params.id
          );
          console.log(selectedCar);
          this.setState({ loadedCar: selectedCar });
        });
      }
    }
  }
  render() {
    let postedCar = <p>Waiting...!</p>;
    let Images;
    if (this.props.match.params.id) {
      postedCar = <Spinner />;
    }
    if (this.state.loadedCar) {
      postedCar = (
        <Aux>
          <Modal
            show={this.state.isModalOpen}
            modalClosed={this.closeModalHandler}
          >
            <FrontProfile carProfile={this.state.loadedCar} />
          </Modal>
          {this.state.loadedCar.map((carDetail) => {
            Images = carDetail.garellyImages.map((image) => {
              return (
                <div className={classes.SidesPhoto}>
                  <SideBySideMagnifier
                    imageSrc={image.url}
                    imageAlt={carDetail.carName}
                  />
                </div>
              );
            });
            return (
              <div key={carDetail.id} className={classes.carDetails}>
                <div className={classes.ImageContainer}>
                  <img
                    src={carDetail.postProfile.url}
                    alt={carDetail.carName}
                  />
                  <div className={classes.FeatherBanner} />
                </div>
                <div className={classes.FullCar}>
                  <div className={classes.TitlePhoto}>
                    <img
                      src={carDetail.postProfile.url}
                      alt={carDetail.carName}
                    />
                  </div>
                  <div className={classes.CarDescription}>
                    <p className={classes.ContentTitle}>{carDetail.carName}</p>
                    <p className={classes.CarSubTitle}>{carDetail.carType}</p>
                    <p className={classes.CarContent}>
                      {carDetail.description}
                    </p>
                    <button onClick={this.showContactHandler}>
                      Let's Deal
                    </button>
                  </div>
                </div>

                <div className={classes.CarAllSides}>{Images}</div>
                <VehicleOverview
                  interialColor={carDetail.interialColor}
                  exterialColor={carDetail.exterialColor}
                  engine={carDetail.engine}
                  gas={carDetail.gas}
                  transmission={carDetail.transmission}
                  price={carDetail.price}
                  mileAge={carDetail.milesAge}
                />
              </div>
            );
          })}
          <Footer />
        </Aux>
      );
    }
    return postedCar;
  }
}

export default withRouter(CarDetails);
