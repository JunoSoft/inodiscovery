
import React, { Component } from "react";
import Aux from "../../../hoc/Auxilliary/Auxilliary";
import axios from "../../../hoc/Axios/Axios";
import Footer from "../../Footer/Footer";
import Hotel from "./HotelCard/HotelCard2";
import classes from "./index.module.css";
import Spinner from "../../UI/Spinner/Spinner2";
class Hotels extends Component {
  state = {
    hotels: null,
    isLoading: false,
    error: null,
  };
  componentDidMount() {
    this.setState({ isLoading: true  });
    axios
      .get("/hotels")
      .then((res) => {
        this.setState({ hotels: res.data, isLoading: false  });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false, error: error.message });
      });
  }

  clickedHotelHandler = (id) => {
    this.props.history.push("/hotel-view/" + id);
  };
  render() {
    const style = {
      height: "400px",
      bckgroundColor: "black",
      backgroundImage: `url("https://www.hotelvillacimbrone.com/wp-content/uploads/2020/02/Hotel-Villa-Cimbrone-7-1800.jpg")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backGroundPosition: "center",
      zIndex: -1,
    };
    let hotels = null;
    if (this.state.isLoading) {
      hotels = <Spinner />;
    } else {
      if (this.state.hotels) {
        console.log(this.state.hotels);
        hotels = this.state.hotels.map((hotel) => {
          const discount = (minPrice) => (minPrice * hotel.discountPercent) / 100;
          return (
            <Hotel
            key={hotel.id}
            image={hotel.imageProfile.url}
            name={hotel.hotelName}
            minCost={hotel.minimumPrice}
            discount={hotel.minimumPrice - discount(hotel.minimumPrice)}
            location={hotel.location}
            stars = {hotel.hotelStars}
            clicked={() => this.clickedHotelHandler(hotel.id)}
          />
          );
        });
      } else {
        hotels = this.state.error;
      }
    }
    return (
      <Aux>
        <div className={classes.Hotels} >
          <div style={style}>
            <div className={classes.Bg}></div>
          </div>
          <div className={classes.TopHotels}>
            <h1> Hotels </h1>
            <p>
              Here you are ,Thank you for choosing Ino Discovery. You can choose
              the best Affordable Hotel and be the first of booking 
            </p>
          </div>
          <div className={classes.HotelsHolder}>
            {hotels}
          </div>
        </div>
        <Footer />
      </Aux>
    );
  }
}

export default Hotels;
