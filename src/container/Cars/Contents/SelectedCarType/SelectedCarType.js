/** @format */

import React, { Component } from "react";
import classes from "./SelectedCarType.module.css";
import photo from "../../../../assets/Images/2017-Toyota-National-Clearance-Event-Lease-and-Finance-Offers-Bangor-ME_o.jpg";
import SelectedType from "./SelectedType/SelectedType";
import axios from "../../../../hoc/Axios/Axios";
import Spinner from "../../../../components/UI/Spinner/Spinner2";
import Footer from "../../../../components/Footer/Footer";
import Aux from "../../../../hoc/Auxilliary/Auxilliary";
import { isEmpty } from "lodash";
import parse from "html-react-parser";

class SelectedCarType extends Component {
  state = {
    cars: [],
    isModalOpen: false,
    isLoading: true,
  };
  componentDidMount() {
    console.log(this.props);
    const result = [];
    axios.get("/car-posts").then((response) => {
      this.setState({ cars: response.data, isLoading: false });
    });
    console.log(result);
  }
  goToDetailsHandler = (id) => {
    this.props.history.push("/carsDetails/" + id);
  };
  render() {
    let selectedCarTypeArr = null;
    if (this.state.isLoading || isEmpty(this.state.cars)) {
      selectedCarTypeArr = <Spinner />;
    } else {
      selectedCarTypeArr = this.state.cars
        .filter(
          (carClicked) =>
            carClicked.carName === this.props.match.params.selectedCarType
        )
        .map((car) => (
          <SelectedType
            key={car.id}
            carPhoto={car.postProfile.url}
            carName={car.carName}
            carDetails={parse(car.carType)}
            price={car.price}
            clicked={() => this.goToDetailsHandler(car.id)}
          />
        ));
    }

    return (
      <Aux>
        <div className={classes.SelectedCarType}>
          <div className={classes.ImageContainer}>
            <img src={photo} />
            <div className={classes.FeatherBanner} />
          </div>
          <div className={classes.Car_MainTypeTitle}>
            {this.props.match.params.selectedCarType}(s)
          </div>
          {selectedCarTypeArr}
        </div>
        <Footer />
      </Aux>
    );
  }
}
export default SelectedCarType;
