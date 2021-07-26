/** @format */

import React, { Component } from "react";
import axios from "../../hoc/Axios/Axios";
import classes from "./Home.module.css";
import Header from "../../components/SectionHeader/SectionHeader";
import HomeTopSlider from "../../components/sliders/HomeTopSlider/HomeTopSlider";
import ServicesCards from "../../components/Cards/ServicesCards/ServicesCards";
import Hotel from "../../components/Services/Hotels/HotelCard/HotelCard";
import Car from "../../components/Cards/CarsCards/CarCard/CarCard";
import Appartment from "../../components/Services/Appartements/AppartementsCard/AppartementCard";
import Event from "../../components/Services/Evento/EventCard/EventCard2";
import Trip from "../../components/Services/Tourism/TravelCard/TravelCard";
import Sslider from "../../components/SlickSlider/SlickSlider";
import Spinner from "../../components/UI/Spinner/Spinner2";
import Footer from "../../components/Footer/Footer";
import Aux from "../../hoc/Auxilliary/Auxilliary";

/* Home components  */

class Home extends Component {
  state = {
    data: null,
    hotels: [],
    scrolled: false,
    isLoading: true,
  };

  updatedHotel = () => {
    axios
      .get("https://inodashboard-app.herokuapp.com/hotels")
      .then((response) => {
        console.log("Data from Ino", response.data);
      });
  };

  componentDidMount() {
    this.updatedHotel();
    axios
      .get("https://inodashboard-app.herokuapp.com/hotels")
      .then((res) => {
        console.log("DataFrom Firebase", res.data);
        let hotelArray = [];
        for (let index in res.data) {
          hotelArray.push(res.data[index]);
        }
        console.log(hotelArray);
        this.setState({
          data: {
            hotels: hotelArray,
          },
        });
        if (res) {
          this.setState({ isLoading: false });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  }
  clickedHotelHandler = (id) => {
    this.props.history.push("/hotel-view/" + id);
  };
  clickedCarHandler = (id) => {
    this.props.history.push("/cars/" + id);
  };
  clickedEventHandler = (id) => {
    this.props.history.push("/event/" + id);
  };
  clickedTripHandler = (id) => {
    this.props.history.push("/trip-view/" + id);
  };
  goToAppartment = (id) => {
    this.props.history.push("/appartment/view/" + id);
  };

  render() {
    let home = null;
    // let hotels = [];
    let hotelsDOM = this.state.hotels.map((hotel) => {
      return (
        <Hotel
          key={hotel.id}
          image={hotel.hotelProfile}
          name={hotel.hotelName}
          minCost={hotel.minCost}
          location={hotel.location}
          clicked={() => this.clickedHotelHandler(hotel.id)}
        />
      );
    });
    let cars = [];
    let appartments = [];
    let trips = [];
    let events = [];

    if (this.state.isLoading) {
      home = <Spinner />;
    } else {
      if (this.state.data) {
        //_____ Hotels ___----------------------
        // for (const key in this.state.data.hotels) {
        //   let htl = this.state.data.hotels;
        //   let hotelImg = null;
        //   for (const img in htl[key].images) {
        //     hotelImg = htl[key].images[img];
        //     break;
        //   }
        //   hotels.push(
        //     <Hotel
        //       key={key}
        //       image={htl[key].hotelProfile}
        //       name={htl[key].hotelName}
        //       minCost={htl[key].minCost}
        //       location={htl[key].address.location}
        //       clicked={() => this.clickedHotelHandler(key)}
        //     />
        //   );
        // }
        //_____ Cars ___----------------------
        for (const key in this.state.data.cars) {
          let crs = this.state.data.cars;
          cars.push(
            <Car
              key={key}
              image={crs[key].images}
              price={crs[key].price}
              carName={crs[key].carName}
              carType={crs[key].carType}
              clicked={() => this.clickedCarHandler(crs[key].id)}
            />
          );
        }
        //_____ Appartments ___----------------------
        for (const key in this.state.data.appartments) {
          let appart = this.state.data.appartments;
          appartments.push(
            <Appartment
              key={key}
              appartName={appart[key].appartmentName}
              image={appart[key].image}
              location={appart[key].address.location}
              miniCost={appart[key].minimumCost}
              clicked={() => this.goToAppartment(key)}
            />
          );
        }
        //_____ Events _____----------------------
        for (const key in this.state.data.events) {
          let evts = this.state.data.events;
          events.push(
            <Event
              key={key}
              image={evts[key].image}
              eventName={evts[key].eventName}
              date={evts[key].time}
              clicked={() => this.clickedEventHandler(key)}
            />
          );
        }
        //______ Trips _____----------------------
        for (const key in this.state.data.trips) {
          let trp = this.state.data.trips;
          trips.push(
            <Trip
              key={key}
              image={trp[key].image}
              agency={trp[key].companyName}
              tripName={trp[key].travelName}
              location={trp[key].location}
              cost={trp[key].cost}
              clicked={() => this.clickedTripHandler(key)}
            />
          );
        }
        home = (
          <Aux>
            <HomeTopSlider />
            <ServicesCards />
            <Header
              title="HOTELS"
              subtitle="This is the best opportunity for you to get your affordable great Hotel,get discount  "
            />
            <Sslider>{hotelsDOM}</Sslider>
            <Header
              title="CARS"
              subtitle="Here you are,on cheap price you can sell,rent your favolite dream Car .let's Deal  "
            />
            <Sslider>{cars}</Sslider>
            <Header
              title="APPARTMENTS"
              subtitle="We have for you the best appartment switable with your wishes.let's Deal  "
            />
            <Sslider>{appartments}</Sslider>
            <Header
              title="EVENTS"
              subtitle="Below you can find the event related to your career or business and apply    "
            />
            <Sslider>{events}</Sslider>
            <Header
              title="Tour/Travel"
              subtitle="If you want to travel,we have for you more than one best trips you can enjoy and appreciate "
            />
            <Sslider>{trips}</Sslider>
            <Footer />
          </Aux>
        );
      } else {
        home = (
          <div style={{ marginTop: "20vh", textAlign: "center " }}>
            No Network
          </div>
        );
      }
    }
    return <div className={classes.HomeSections}>{home}</div>;
  }
}
export default Home;
