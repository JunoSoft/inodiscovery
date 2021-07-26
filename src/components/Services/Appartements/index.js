/** @format */

import React, { Component } from "react";
import Aux from "../../../hoc/Auxilliary/Auxilliary";
import Footer from "../../Footer/Footer";
import Appartement from "./AppartementsCard/AppartementCard";
import classes from "./index.module.css";
import bg from "../../../assets/Images/hotels/sld6.jpg";
import Spinner from "../../UI/Spinner/Spinner2";
import axios from "../../../hoc/Axios/Axios";

class appartment extends Component {
  state = {
    appartments: [],
    isLoading: true,
  };
  componentDidMount() {
    axios
      .get("/apartment-posts")
      .then((res) => {
        this.setState({ appartments: res.data });
        if (res) {
          this.setState({ isLoading: false });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  }
  goToAppartment = (id) => {
    this.props.history.push("/appartment/view/" + id);
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
    let appartments = null;
    if (this.state.isLoading) {
      appartments = <Spinner />;
    } else {
      if (this.state.appartments) {
        appartments = this.state.appartments.map((appartment, index) => {
          return (
            <Appartement
              key={index}
              image={appartment.apartments_owner.profileImage.url}
              appartName={appartment.house}
              location={appartment.apartments_owner.location}
              miniCost={appartment.price}
              clicked={() => this.goToAppartment(appartment.id)}
            />
          );
        });
      } else {
        appartments = "No network";
      }
    }
    return (
      <Aux>
        <div className={classes.Hotels}>
          <div style={style}>
            <div className={classes.Bg}></div>
          </div>
          <div className={classes.TopAppartements}>
            <h1>Apartments </h1>
            <p>
              Here you are ,Thank you for choosing Ino Discovery. You can choose
              your affordable apartment here
            </p>
          </div>
          <div className={classes.HotelsHolder}>{appartments}</div>
        </div>
        <Footer />
      </Aux>
    );
  }
}
export default appartment;
