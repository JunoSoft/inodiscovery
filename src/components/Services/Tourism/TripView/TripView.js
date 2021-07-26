/** @format */

import React, { Component } from "react";
import classes from "./TripView.module.css";
import Aux from "../../../../hoc/Auxilliary/Auxilliary";
import Spinner from "../../../UI/Spinner/Spinner2";
import Trip from "../TravelCard/TravelCard";
import Footer from "../../../Footer/Footer";
import axios from "../../../../hoc/Axios/Axios";
import Garelly from "react-grid-gallery";
import { withRouter } from "react-router-dom";
import parse from "html-react-parser";

class TripView extends Component {
  state = {
    travels: [],
    tripData: null,
    isLoading: true,
  };

  tripPresent = (paramsId) => {
    if (paramsId) {
      if (
        !this.state.tripData ||
        (this.state.tripData && this.state.tripData.id !== paramsId)
      ) {
        axios
          .get("/travel-posts/" + paramsId)
          .then((res) => {
            if (res) {
              this.setState({ tripData: res.data });
              this.setState({ isLoading: false });
            }
          })
          .catch((error) => {
            console.log(error);
            this.setState({ isLoading: false });
          });
      }
    }
  };
  recommendation = () => {
    axios
      .get("/travel-posts")
      .then((res) => {
        this.setState({ travels: res.data });
        if (res) {
          this.setState({ isLoading: false });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    this.tripPresent(id);
    this.recommendation();
  }
  goToTrip = (id) => {
    this.props.history.push("/trip-view/" + id);
    this.tripPresent(id);
  };
  render() {
    console.log(this.props);
    let tripDisplay = null;
    let tripData = null;
    let GarellyDisplay = null;
    const images = [];
    let poster = null;
    if (this.state.isLoading) {
      tripDisplay = <Spinner />;
      tripData = <Spinner />;
    } else {
      if (this.state.tripData) {
        //_______Garelly Codes
        if (this.state.tripData.tripGallery.length !== 0) {
          images = this.state.tripData.tripGallery.map((img) => {
            return {
              src: img.url,
              thumbnail: img.url,
              thumbnailWidth: 320,
              thumbnailHeight: 212,
            };
          });
          GarellyDisplay = <Garelly images={images} />;
        }
        poster = this.state.tripData.tripPoster.url;

        //_______End_______
        tripData = (
          <Aux>
            <h3>{this.state.tripData.tripName}</h3>
            ___Go With____
            <h5>{this.state.tripData.travel_comapy.companyName}</h5>
            <h3>About Trip</h3>
            <p>{parse(this.state.tripData.tripDescription)}</p>
            <h3>Exact Location</h3>
            <p>
              {this.state.tripData.tripLocation}
              <h4 className={classes.tripCost}>Cost: {this.state.tripData.tripCost}</h4>
            </p>
          </Aux>
        );
      }
      if (this.state.travels) {
        tripDisplay = this.state.travels.map((trip, index) => {
          return (
            <Trip
              key={index}
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
        <div className={classes.TripTopBg}></div>
        <div className={classes.TripView}>
          <div className={classes.TripSlider}>
            <img src={poster} />
          </div>
          <div className={classes.garellyLine}>{GarellyDisplay}</div>
          <div className={classes.TripDetails}>{tripData}</div>
        </div>
        <div className={classes.garellyLineDesktop}>{GarellyDisplay}</div>

        <div className={classes.Trips}>
          <h1 className={classes.H1}>MORE PLACE TO TRAVEL</h1>
          {tripDisplay}
        </div>
        <Footer />
      </Aux>
    );
  }
}

export default withRouter(TripView);
