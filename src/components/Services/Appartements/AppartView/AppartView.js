/** @format */

import React, { Component } from "react";
import axios from "../../../../hoc/Axios/Axios";
import classes from "./AppartView.module.css";
import { Carousel } from "react-responsive-carousel";
import Spinner from "../../../UI/Spinner/Spinner2";
import Aux from "../../../../hoc/Auxilliary/Auxilliary";
import Footer from "../../../Footer/Footer";
import Appartment from "../AppartementsCard/AppartementCard";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

import { withRouter } from "react-router-dom";

class AppartementView extends Component {
  state = {
    appartments: [],
    appartmentsList: null,
    isLoading: true,
  };
  appartmentsView = (paramsId) => {
    if (paramsId) {
      if (
        !this.state.appartments ||
        (this.state.appartments && this.state.appartments.id !== paramsId)
      ) {
        axios
          .get("/apartment-posts/" + paramsId)
          .then((res) => {
            this.setState({ appartments: res.data, isLoading: false });
          })
          .catch((error) => {
            this.setState({ isLoading: false });
          });
      }
    }
  };
  appartmentsRecommend = () => {
    if (!this.state.appartmentsList) {
      axios
        .get("/apartment-posts")
        .then((res) => {
          this.setState({ appartmentsList: res.data });
          if (res) {
            this.setState({ isLoading: false });
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({ isLoading: false });
        });
    }
  };
  goToAppartment = (id) => {
    this.props.history.push("/appartment/view/" + id);
    this.appartmentsView(id);
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    this.appartmentsView(id);
    this.appartmentsRecommend();
  }

  render() {
    let appartImages;
    let appartmentRecommenation = <Spinner />;

    let appartmentView = (
      <p
        style={{
          margin: "auto",
          width: "100%",
          textAlign: "center",
          marginTop: "80px",
        }}
      >
        Wait....!
      </p>
    );
    if (this.props.match.params.id) {
      appartmentView = <Spinner />;
    }
    if (this.state.appartments.length !== 0) {
      appartImages = this.state.appartments.apartmentGallery.map(
        (img, index) => <div key={index} data-src={img.url} />
      );
      if (this.state.appartmentsList) {
        appartmentRecommenation = this.state.appartmentsList.map(
          (apprt, index) => (
            <Appartment
              key={index}
              appartName={apprt.house}
              image={apprt.apartments_owner.profileImage.url}
              location={apprt.apartments_owner.location}
              miniCost={apprt.price}
              clicked={() => this.goToAppartment(apprt.id)}
            />
          )
        );
      }
      appartmentView = (
        <Aux>
          <div className={classes.Content}>
            <h2
              className={classes.appartHeader}
              style={{ color: "var(--clr-blue1)", textTransform: "uppercase" }}
            >
              {this.state.appartments.house}
            </h2>
            <div className={classes.ApartPrice}>
              {this.state.appartments.price}
            </div>
            <AwesomeSlider bullets={false}>{appartImages}</AwesomeSlider>

            <p className={classes.Address}>
              <h3>Address:</h3>
              <p>
                {" "}
                <span>Email:</span>
                {this.state.appartments.apartments_owner.email}
              </p>
              <p>
                <span className={classes.aa}>phone:</span>
                {this.state.appartments.apartments_owner.phone}
              </p>
              <p>
                <span className={classes.aa}>Website:</span>
                {this.state.appartments.apartments_owner.website}
              </p>
            </p>

            <h3>Location:</h3>
            <p>{this.state.appartments.apartments_owner.location}</p>
            <h3>More Details:</h3>
            <p>{this.state.appartments.apartments_owner.description}</p>
            <h2>Recommended Apartments</h2>
            <div className={classes.Recommendation}>
              {appartmentRecommenation}
            </div>
          </div>
        </Aux>
      );
    }
    return (
      <Aux>
        <div className={classes.AppartmentViewWrap}>
          <div className={classes.Section1}>
            <div className={classes.AdsLeft}></div>
            {appartmentView}
            <div className={classes.AdsRight}></div>
          </div>
        </div>

        <Footer />
      </Aux>
    );
  }
}

export default withRouter(AppartementView);
