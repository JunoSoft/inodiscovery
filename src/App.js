/** @format */

import React from "react";
import Layout from "./hoc/Layout/Layout";
import classes from "./App.module.css";
import { Route } from "react-router-dom";

import Home from "./container/home/Home"; //this Home container that call home components
import Contactus from "./components/ContactUs/ContactUs";
import AboutUs from "./components/AboutUs/AboutUs";
import HotelView from "./components/Services/Hotels/HotelView/HotelView";
import Appartements from "./components/Services/Appartements";
import AppartmentView from "./components/Services/Appartements/AppartView/AppartView";
import Travelling from "./components/Services/Tourism";
import Hotels from "./components/Services/Hotels/index";
import Events from "./components/Services/Evento";
import EventView from "./components/Services/Evento/EventView/EventView";
import Trip from "./components/Services/Tourism/TripView/TripView";
import OwnerPage from "./components/OwnerPage/OwnerPage";
import Reservation from "./components/Services/Hotels/ReservationPage/Reservation";
import Slider from "./components/sliders/HomeTopSlider/Slider";
import Cars from "./container/Cars/Contents/Contents";
import SelectedCarType from "./container/Cars/Contents/SelectedCarType/SelectedCarType";
import SlickSlider from "./components/SlickSlider/SlickSlider";
import Login from "./components/Login/Login";

function App() {
  return (
    <div className={classes.App}>
      <Layout>
        <Route path="/" exact component={Home} />
        <Route path="/services" component={Home} />
        <Route path="/contact" component={Contactus} />
        <Route path="/about" component={AboutUs} />
        <Route path="/hotels" component={Hotels} />
        <Route path="/hotel-view/:id" component={HotelView} />
        <Route path="/appartements" component={Appartements} />
        <Route path="/appartment/view/:id" component={AppartmentView} />
        <Route path="/travelling" component={Travelling} />
        <Route path="/events" component={Events} />
        <Route path="/event/:id" component={EventView} />
        <Route path="/trip-view/:id" component={Trip} />
        <Route path="/owner-page" component={OwnerPage} />
        <Route path="/reservation" component={Reservation} />
        <Route path="/slider" component={Slider} />
        <Route path="/cars" component={Cars} />
        <Route path="/car/:selectedCarType" component={SelectedCarType} />
        <Route path="/slick" component={SlickSlider} />
        <Route path="/login" component={Login} />
      </Layout>
    </div>
  );
}

export default App;
