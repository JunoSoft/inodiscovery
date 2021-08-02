import React, { useState, useRef, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import classes from "./Search.module.css";
import SearchItems from "../navigation/NavigationItems/SearchItems/SearchItems";
import SearchModal from "../UI/Modal/SearchModal";
import SearchResult from "../navigation/NavigationItems/SearchItems/SearchResults/SearchResult";
import axios from "../../hoc/Axios/Axios";
import Spinner from "../UI/Spinner/SearchSpinner";

let CAR = "car";
let HOTEL = "hotel";
let EVENT = "event";
let APPARTEMENT = "appartement";
let TRIP = "trip";

const searchNav = [
  { name: CAR, placeHolder: "Find car(s)" },
  { name: HOTEL, placeHolder: "Find hotel(s)" },
  { name: EVENT, placeHolder: "Find event(s)" },
  { name: APPARTEMENT, placeHolder: "Find appartement(s)" },
  { name: TRIP, placeHolder: "Find travel(s)" },
];

export default function Search() {
  const [selectedCategorie, setSelectedCategorie] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [cars, setCars] = useState([]);
  const [appartement, setAppartements] = useState([]);
  const [trips, setTrips] = useState([]);
  const [events, setEvents] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const history = useHistory();

  const searchInput = useRef();
  const searchInputValueUpper =
    searchValue.charAt(0).toUpperCase() + searchValue.slice(1);

  const onChangeHandler = (event) => {
    setSearchValue(event.target.value);
  };

  const showCategories = () => {
    setIsTouched(true);
  };
  const closeModal = () => {
    setIsModal(false);
  };

  const selectedCategorieHandler = (name) => {
    setSelectedCategorie(name);
    setIsTouched(false);
    setIsModal(true);
    searchInput.current.focus();
  };
  const searchElements = searchNav.map((nav, i) => {
    return (
      <SearchItems
        key={i}
        name={nav.placeHolder}
        clicked={() => selectedCategorieHandler(nav.name)}
      />
    );
  });

  // GET ALL HOTELS

  const hotelDatas = useCallback(() => {
    setIsLoading(true);
    axios
      .get("/hotels")
      .then((result) => {
        setHotels(result.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  // GET ALL CARS FROM DATABASE

  const carsData = useCallback(() => {
    setIsLoading(true);
    axios
      .get("/car-posts")
      .then((result) => {
        setCars(result.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  //GET ALL APPARTEMENTS
  const appartementsDatas = useCallback(() => {
    setIsLoading(true);
    axios
      .get("/apartment-posts")
      .then((result) => {
        setAppartements(result.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  //GET ALL TRIPS
  const visitsDatas = useCallback(() => {
    setIsLoading(true);
    axios
      .get("/travel-posts")
      .then((result) => {
        setTrips(result.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  //GET ALL Events
  const eventsDatas = useCallback(() => {
    setIsLoading(true);
    axios
      .get("/event-posts")
      .then((result) => {
        setEvents(result.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    hotelDatas();
    carsData();
    appartementsDatas();
    visitsDatas();
    eventsDatas();
  }, [hotelDatas, carsData, appartementsDatas, visitsDatas, eventsDatas]);

  const hotelsToTheDOM = hotels
    .filter((item) => item.hotelName.includes(searchInputValueUpper))
    .map((hotel) => {
      return (
        <SearchResult
          imageUrl={hotel.imageProfile.url}
          nameTitle={hotel.hotelName}
          subtitle={hotel.location}
          clicked={() => hotelDetailsCLickedHandler(hotel.id)}
        />
      );
    });

  const carstoTheDOM = cars
    .filter(
      (item) =>
        item.carName.includes(searchInputValueUpper) ||
        item.carType.includes(searchInputValueUpper)
    )
    .map((car) => {
      return (
        <SearchResult
          imageUrl={car.postProfile.url}
          nameTitle={car.carName}
          subName={car.carType}
          subtitle={car.exterialColor}
          clicked={() => carDetailsCLickedHandler(car.id)}
        />
      );
    });

  //appartements TO the DOM
  const appartementstoTheDOM = appartement
    .filter((item) => item.house.includes(searchInputValueUpper))
    .map((appartement) => {
      return (
        <SearchResult
          imageUrl={appartement.apartments_owner.profileImage.url}
          nameTitle={appartement.house}
          subtitle={appartement.apartments_owner.location}
          clicked={() => appartementsDetailsCLickedHandler(appartement.id)}
        />
      );
    });

  //travels to the DOM
  const travelToTheDOM = trips
    .filter((item) => item.tripName.includes(searchInputValueUpper))
    .map((trip) => {
      return (
        <SearchResult
          imageUrl={trip.travel_comapy.imageProfile.url}
          nameTitle={trip.tripName}
          subtitle={trip.tripLocation}
          clicked={() => visitsDetailsCLickedHandler(trip.id)}
        />
      );
    });

  //events to the DOM
  const eventToTheDOM = events
    .filter((item) => item.eventName.includes(searchInputValueUpper))
    .map((event) => {
      return (
        <SearchResult
          imageUrl={event.eventPoster.url}
          nameTitle={event.eventName}
          subtitle={event.location}
          clicked={() => eventsDetailsCLickedHandler(event.id)}
        />
      );
    });

  let DOMdataHandler;
  if (selectedCategorie === CAR) {
    DOMdataHandler = carstoTheDOM;
  }
  if (selectedCategorie === HOTEL) {
    DOMdataHandler = hotelsToTheDOM;
  }
  if (selectedCategorie === APPARTEMENT) {
    DOMdataHandler = appartementstoTheDOM;
  }
  if (selectedCategorie === EVENT) {
    DOMdataHandler = eventToTheDOM;
  }
  if (selectedCategorie === TRIP) {
    DOMdataHandler = travelToTheDOM;
  }

  let emptyData = null;
  if (DOMdataHandler !== undefined && DOMdataHandler.length === 0) {
    emptyData = (
      <p className={classes.EmptyData}>Ups! It look like no match data found</p>
    );
  }

  // Go to cars details
  const carDetailsCLickedHandler = (id) => {
    history.push({ pathname: "cars/" + id });
    setIsTouched(true);
  };
  const hotelDetailsCLickedHandler = (id) => {
    history.push({ pathname: "/hotel-view/" + id });
    setIsTouched(true);
  };
  const appartementsDetailsCLickedHandler = (id) => {
    history.push({ pathname: "/appartment/view/" + id });
    setIsTouched(true);
  };
  const eventsDetailsCLickedHandler = (id) => {
    history.push({ pathname: "/event-posts/" + id });
    setIsTouched(true);
  };
  const visitsDetailsCLickedHandler = (id) => {
    history.push({ pathname: "/trip-view/" + id });
    setIsTouched(true);
  };

  return (
    <div>
      <div className={classes.Search} onClick={showCategories}>
        <FontAwesomeIcon icon={faSearch} />
      </div>
      {isTouched && (
        <div className={classes.categoriesCss}> {searchElements}</div>
      )}
      <SearchModal show={isModal ? true : false} modalClosed={closeModal}>
        <div className={classes.SearchInput}>
          <input
            ref={searchInput}
            onChange={onChangeHandler}
            placeholder={!selectedCategorie ? "Search here" : selectedCategorie}
          />
        </div>
        {searchValue && (
          <div className={classes.SearchItemsResult}>{DOMdataHandler}</div>
        )}
        {!DOMdataHandler && <p>{error}</p>}
        {error && <p>{error}</p>}
        {isLoading ? <Spinner /> : emptyData}
      </SearchModal>
    </div>
  );
}
