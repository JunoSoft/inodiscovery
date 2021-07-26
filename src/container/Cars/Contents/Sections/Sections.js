import React, { Component } from "react";
import Home from "../../../../components/Services/Cars/Home/Home";
import Aux from "../../../../hoc/Auxilliary/Auxilliary";
import Categories from "../../../../components/Services/Cars/Categories/Categories";
import Deals from "../../../../components/Services/Cars/Deals/Deals";

export default class Sections extends Component {
  render() {
    return (
      <Aux>
        <Home />
        <Categories />
        <Deals />
      </Aux>
    );
  }
}
