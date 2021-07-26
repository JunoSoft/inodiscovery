import React, { Component } from "react";
import Sections from "./Sections/Sections";
import { Route } from "react-router-dom";
import CarDetails from "./CarDetails/CarDetails";
import SelectedCarType from "./SelectedCarType/SelectedCarType";

export default class Contents extends Component {
  render() {
    return (
      <div>
        <Route path="/cars" exact component={Sections} />
        {/* <Route path="/car/:selectedCarType" component={SelectedCarType} /> */}
        <Route path="/cars/:id" component={CarDetails} />
        <Route path="/carsDetails/:id" component={CarDetails} />
      </div>
    );
  }
}
