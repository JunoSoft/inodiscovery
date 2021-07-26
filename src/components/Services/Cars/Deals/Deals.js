/** @format */

import React from "react";
import { Component } from "react";
import Aux from "../../../../hoc/Auxilliary/Auxilliary";
import Deal from "./Deal/Deal";
import classes from "./Deals.module.css";
import { withRouter } from "react-router-dom";
import axios from "../../../../hoc/Axios/Axios";
import Spinner from "../../../UI/Spinner/Spinner2";
import Empty from "../../../UI/Empty/Empty";
import parse from "html-react-parser";
class Deals extends Component {
  state = {
    cars: [],
    error: false,
    isLoading: true,
  };
  dealSelectedHandler = (id) => {
    this.props.history.push({ pathname: "cars/" + id });
  };
  componentDidMount() {
    axios
      .get("/car-posts")
      .then((response) => {
        console.log(response.data);
        this.setState({ cars: response.data, isLoading: false });
      })

      .catch((error) => {
        this.setState({ error: error });
      });
  }

  render() {
    let carItems = null;
    if (this.state.isLoading) {
      carItems = <Spinner />;
    } else {
      carItems = this.state.cars.map((car) => (
        <Deal
          key={car.id}
          carName={car.carName}
          price={car.price}
          carDetails={car.description}
          images={car.postProfile.url}
          clicked={() => this.dealSelectedHandler(car.id)}
        />
      ));
    }

    return (
      <Aux>
        <p>Deals</p>
        <section className={classes.Deals}>
          {carItems && carItems}
          {carItems.length === 0 && <Empty />}
        </section>
      </Aux>
    );
  }
}

export default withRouter(Deals);
