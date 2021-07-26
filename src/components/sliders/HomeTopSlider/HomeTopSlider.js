/** @format */

import React, { useEffect, useState } from "react";
import classes from "./HomeTopSlider.module.css";
import "react-animated-slider/build/horizontal.css";
import axios from "../../../hoc/Axios/Axios";
import Slider from "react-animated-slider";
import parse from "html-react-parser";

const HomeTopSlider = () => {
  const [sliderCar, setSlideCar] = useState([]);
  const [slideEvent, setEventElement] = useState([]);
  const [hotelValues, setHotelValues] = useState([[]]);
  const [appartmentsValues, setAppartmentsValues] = useState([[]]);
  const [travelsValues, setTravelsValues] = useState([[]]);
  // const [allArrays, setAllArrays] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  const arrays = [
    ...hotelValues,
    ...sliderCar,
    ...appartmentsValues,
    ...travelsValues,
    ...slideEvent,
  ];
  console.log(arrays);
  // setAllArrays(arrays);

  const carsElement = async () => {
    const response = await axios.get("/cars.json");
    const data = await response.data;
    let filteredCar = [];
    for (let i in data) {
      filteredCar.push(data[i]);
    }
    let carObj = [];
    filteredCar.filter((car) => {
      carObj.push({
        image: car.images,
        description: car.carDetails,
        button: car.carName,
        title: car.carDetails,
        userProfile: car.images,
      });
      return carObj;
    });
    // console.log(carObj);
    setSlideCar(carObj);
  };

  const hotelElement = async () => {
    const response = await axios.get("/Hotels.json");
    const data = await response.data;
    let filteredHotel = [];
    for (let i in data) {
      filteredHotel.push(data[i]);
    }
    let hotelObj = [];
    filteredHotel.filter((hotel) => {
      hotelObj.push({
        image: hotel.hotelProfile,
        description: hotel.descriptions,
        button: hotel.hotelName,
        title: hotel.hotelName,
        userProfile: hotel.hotelProfile,
      });
      return hotelObj;
    });
    // console.log(hotelObj);
    setHotelValues(hotelObj);
  };

  const eventElements = async () => {
    const response = await (await axios("/events.json")).data;

    let filteredEvent = [];
    for (let i in response) {
      filteredEvent.push(response[i]);
    }
    let eventObj = [];
    filteredEvent.filter((event) => {
      eventObj.push({
        image: event.image,
        description: event.details,
        button: event.eventName,
        title: event.eventName,
        userProfile: event.image,
      });
      return eventObj;
    });

    setEventElement(eventObj);
  };

  const appartementElements = async () => {
    const response = await (await axios.get("/appartments.json")).data;

    let filteredAppartments = [];
    for (let i in response) {
      filteredAppartments.push(response[i]);
    }

    let appartementsObj = [];
    filteredAppartments.filter((appartment) => {
      appartementsObj.push({
        image: appartment.image,
        description: appartment.details,
        button: appartment.appartmentName,
        title: appartment.appartmentName,
        userProfile: appartment.image,
      });
      return appartementsObj;
    });
    // console.log("appartementsObj", appartementsObj);
    setAppartmentsValues(appartementsObj);
  };

  const travellingElements = async () => {
    const response = await (await axios.get("/Travelling.json")).data;
    console.log(response);
    let filteredTravels = [];
    for (let i in response) {
      filteredTravels.push(response[i]);
    }

    let travelObj = [];
    filteredTravels.filter((travel) => {
      travelObj.push({
        image: travel.image,
        description: travel.details,
        button: travel.companyName,
        title: travel.companyName,
        userProfile: travel.image,
      });
      return travelObj;
    });
    // console.log("travelObj", travelObj);
    setTravelsValues(travelObj);
  };
  useEffect(() => {
    carsElement();
    hotelElement();
    eventElements();
    appartementElements();
    travellingElements();
  }, []);
  console.log(hotelValues);
  return (
    <Slider autoplay={3200}>
      {sliderCar.map((item, index) => (
        <div
          key={index}
          style={{
            background: `url('${item.image}') center/cover no-repeat  `,
            zIndex: "0",
          }}
          className={classes.HomeSlider}>
          <div className={classes.BackdroTop}></div>
          <div className={classes.SliderContent}>
            <h2>{item.title.slice(0, 30)}..</h2>
            <div style={{ fontWeight: "lighter" }}>
              {parse(item.description)}
            </div>
            <button>{item.button}</button>
          </div>
        </div>
      ))}
    </Slider>
  );
};
export default HomeTopSlider;
