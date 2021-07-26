/** @format */

import React, { Component } from "react";
import Aux from "../../../hoc/Auxilliary/Auxilliary";
import axios from "../../../hoc/Axios/Axios";
import Spinner from "../../UI/Spinner/Spinner2";
import Footer from "../../Footer/Footer";
import TravelCard from "./TravelCard/TravelCard";
import classes from "./index.module.css";
import bg from "../../../assets/Images/tourism/19525073863_5122b80463_c.jpg";
class tourism extends Component {
  state = {
    travels: [],
    isLoading: true,
  };
  componentDidMount() {
    axios
      .get("/travel-posts")
      .then((res) => {
        this.setState({ travels: res.data, isLoading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  }
  goToTrip = (id) => {
    this.props.history.push("/trip-view/" + id);
  };
  render() {
    const style = {
      height: "400px",
      bckgroundColor: "black",
      backgroundImage: `url(${bg})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backGroundPosition: "center",
      zIndex: -1,
    };
    let tripDisplay = null;
    if (this.state.isLoading) {
      tripDisplay = <Spinner />;
    } else {
      if (this.state.travels) {
        console.log(this.state.travels);
        tripDisplay = this.state.travels.map((trip, index) => {
          return (
            <TravelCard
              key={trip.index}
              image={trip.tripPoster.url}
              tripName={trip.tripName}
              location={trip.tripLocation}
              agency={trip.travel_comapy.companyName}
              cost={trip.tripCost}
              clicked={() => this.goToTrip(trip.id)}
            />
          );
        });
      } else {
        tripDisplay = "No network";
      }
    }
    return (
      <Aux>
        <div className={classes.Tourism}>
          <div style={style}>
            <div className={classes.Bg}></div>
          </div>
          <div className={classes.TopTourism}>
            <h1> Tourism / Traveling </h1>
            <p>
              Here you are ,Thank you for choosing Ino Discovery. You can choose
              the best Location to travel
            </p>
          </div>
          <div className={classes.TourismHolder}>{tripDisplay}</div>
        </div>
        <Footer />
      </Aux>
    );
  }
}
export default tourism;
