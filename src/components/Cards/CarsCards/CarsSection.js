import React from "react";
import classes from "./CarsSection.module.css";
import car from "../../../assets/Images/cars/car3355.jpg";
import car2 from "../../../assets/Images/cars/car45454.png";
import CarCard from "./CarCard/CarCard";
import SectionHeader from "../../SectionHeader/SectionHeader";
import Aux from "../../../hoc/Auxilliary/Auxilliary";
const carsCards = (props) => (
  <Aux>
    <SectionHeader
      title="Cars"
      subtitle="you can book any of the recommended Cars or navigate more.."
    />
    <section className={classes.CarsSection}>
      <div></div>
      <div className={classes.CarsCards}>
        <CarCard image={car} />
        <CarCard image={car2} />
        <CarCard image={car} />
      </div>
      <div></div>
    </section>
  </Aux>
);

export default carsCards;
