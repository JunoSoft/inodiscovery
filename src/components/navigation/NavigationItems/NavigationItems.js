/** @format */
import React, { Component } from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropNav from "../SideDrawer/DrawerNav/DrawerNav";
import { withRouter } from "react-router-dom";
import SearchItems from "./SearchItems/SearchItems";
import SearchResult from "./SearchItems/SearchResults/SearchResult";
import Spinner from "../../UI/Spinner/SearchSpinner";
import axios from "../../../hoc/Axios/Axios";

let CAR = "car";
let HOTEL = "hotel";
let EVENT = "event";
let APPARTEMENT = "appartement";
let TRIP = "trip";

const searchNav = [
  { name: CAR },
  { name: HOTEL },
  { name: EVENT },
  { name: APPARTEMENT },
  { name: TRIP },
];

class navigatioItems extends Component {
  state = {
    isHovered: false,
    isTouched: false,
    isHoveredSearch: true,
    selectedCategorie: "",
    searchValue: "",
    APIdatas: [],
    cars: [],
    events: [],
    appartements: [],
    travels: [],
    error: false,
    isLoading: false,
  };
  removeSearchHandler = () => {
    this.setState({ isHoveredSearch: false });
  };
  addSearchHandler = () => {
    this.setState({ isHoveredSearch: true });
  };
  hoverHandler = () => {
    this.setState({ isHovered: !this.state.isHovered });
  };
  removeMegaMenuHandler = () => {
    this.setState({ isHovered: false });
  };
  showMegaMenuHandler = () => {
    this.setState({ isHovered: true });
  };
  servicesClickHandler = () => {
    this.props.history.goBack();
    this.setState({ isHovered: true });
  };
  dropdownSearchHandler = () => {
    this.setState({ isTouched: true });
  };

  searchInput = React.createRef();
  selectedCategorieHandler = (name) => {
    this.setState({ selectedCategorie: name });
    this.setState({ isTouched: false });
    this.searchInput.current.focus();
  };

  searchElementValueHandler = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  hotelDatas = () => {
    this.setState({ isLoading: true });
    axios
      .get("/hotels")
      .then((result) => {
        this.setState({ APIdatas: result.data });

        this.setState({ isLoading: false });
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(error);
      });
  };

  carsData = () => {
    this.setState({ isLoading: true });
    axios
      .get("/car-posts")
      .then((result) => {
        this.setState({ cars: result.data });
        console.log(result.data);
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(error);
      });
  };
  appartementsDatas = () => {
    this.setState({ isLoading: true });
    axios
      .get("/apartment-posts")
      .then((result) => {
        this.setState({ appartements: result.data });

        this.setState({ isLoading: false });
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(error);
      });
  };
  visitsDatas = () => {
    this.setState({ isLoading: true });
    axios
      .get("/travel-posts")
      .then((result) => {
        this.setState({ travels: result.data });

        this.setState({ isLoading: false });
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(error);
      });
  };
  eventsDatas = () => {
    this.setState({ isLoading: true });
    axios
      .get("/event-posts")
      .then((result) => {
        this.setState({ events: result.data });

        this.setState({ isLoading: false });
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(error);
      });
  };

  componentDidMount() {
    this.hotelDatas();
    this.carsData();
    this.eventsDatas();
    this.visitsDatas();
    this.appartementsDatas();
  }

  // Go to cars details
  carDetailsCLickedHandler = (id) => {
    this.props.history.push({ pathname: "cars/" + id });
    this.setState({ isTouched: true });
  };
  hotelDetailsCLickedHandler = (id) => {
    this.props.history.push({ pathname: "/hotel-view/" + id });
    this.setState({ isTouched: true });
  };
  appartementsDetailsCLickedHandler = (id) => {
    this.props.history.push({ pathname: "/appartment/view/" + id });
    this.setState({ isTouched: true });
  };
  eventsDetailsCLickedHandler = (id) => {
    this.props.history.push({ pathname: "/event-posts/" + id });
    this.setState({ isTouched: true });
  };
  visitsDetailsCLickedHandler = (id) => {
    this.props.history.push({ pathname: "/trip-view/" + id });
    this.setState({ isTouched: true });
  };
  render() {
    const { searchValue } = this.state;
    const searchInputValue =
      searchValue.charAt(0).toUpperCase() + searchValue.slice(1);

    const searchElements = searchNav.map((nav, i) => {
      return (
        <SearchItems
          key={i}
          name={nav.name}
          clicked={() => this.selectedCategorieHandler(nav.name)}
        />
      );
    });

    // Search Results for hotels
    const searchResultDOM = this.state.APIdatas.filter((item) =>
      item.hotelName.includes(searchInputValue)
    ).map((hotel) => {
      return (
        <SearchResult
          imageUrl={hotel.imageProfile.url}
          nameTitle={hotel.hotelName}
          subtitle={hotel.location}
          clicked={() => this.hotelDetailsCLickedHandler(hotel.id)}
        />
      );
    });
    // results for cars
    const carstoTheDOM = this.state.cars
      .filter(
        (item) =>
          item.carName.includes(searchInputValue) ||
          item.carType.includes(searchInputValue)
      )
      .map((car) => {
        return (
          <SearchResult
            imageUrl={car.postProfile.url}
            nameTitle={car.carName}
            subName={car.carType}
            subtitle={car.exterialColor}
            clicked={() => this.carDetailsCLickedHandler(car.id)}
          />
        );
      });

    //appartements TO the DOM
    const appartementstoTheDOM = this.state.appartements
      .filter((item) => item.house.includes(searchInputValue))
      .map((appartement) => {
        return (
          <SearchResult
            imageUrl={appartement.apartments_owner.profileImage.url}
            nameTitle={appartement.house}
            subtitle={appartement.apartments_owner.location}
            clicked={() =>
              this.appartementsDetailsCLickedHandler(appartement.id)
            }
          />
        );
      });

    //events to the DOM
    const eventToTheDOM = this.state.events
      .filter((item) => item.eventName.includes(searchInputValue))
      .map((event) => {
        return (
          <SearchResult
            imageUrl={event.eventPoster.url}
            nameTitle={event.eventName}
            subtitle={event.location}
            clicked={() => this.eventsDetailsCLickedHandler(event.id)}
          />
        );
      });
    //travels to the DOM
    const travelToTheDOM = this.state.travels
      .filter((item) => item.tripName.includes(searchInputValue))
      .map((trip) => {
        return (
          <SearchResult
            imageUrl={trip.travel_comapy.imageProfile.url}
            nameTitle={trip.tripName}
            subtitle={trip.tripLocation}
            clicked={() => this.visitsDetailsCLickedHandler(trip.id)}
          />
        );
      });

    let DOMdataHandler;
    if (this.state.selectedCategorie === CAR) {
      DOMdataHandler = carstoTheDOM;
    }
    if (this.state.selectedCategorie === HOTEL) {
      DOMdataHandler = searchResultDOM;
    }
    if (this.state.selectedCategorie === APPARTEMENT) {
      DOMdataHandler = appartementstoTheDOM;
    }
    if (this.state.selectedCategorie === EVENT) {
      DOMdataHandler = eventToTheDOM;
    }
    if (this.state.selectedCategorie === TRIP) {
      DOMdataHandler = travelToTheDOM;
    }
    return (
      <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>
          Home
        </NavigationItem>
        <NavigationItem
          link="/services"
          hovered={this.hoverHandler}
          noHover={this.hoverHandler}
          clicked={this.servicesClickHandler}
        >
          Services
        </NavigationItem>
        <NavigationItem link="/contact">Contact</NavigationItem>
        <NavigationItem link="/about">About</NavigationItem>
        {/* <NavigationItem link="#">Login</NavigationItem> */}
        <input
          className={classes.searchBox}
          ref={this.searchInput}
          onChange={this.searchElementValueHandler}
          placeholder={
            !this.state.selectedCategorie
              ? "Search here"
              : this.state.selectedCategorie
          }
        />
        <div
          onClick={this.dropdownSearchHandler}
          onMouseEnter={this.addSearchHandler}
        ></div>

        {/* Search Dropdown */}
        {this.state.isTouched && (
          <div
            className={
              this.state.isHoveredSearch
                ? classes.SearchNavigations
                : classes.SearchNull
            }
            onMouseLeave={this.removeSearchHandler}
          >
            {searchElements}
          </div>
        )}
        {this.state.searchValue && (
          <div
            className={
              !this.state.isTouched ? classes.SearchResult : classes.SearchNull
            }
          >
            {DOMdataHandler && DOMdataHandler}
            {this.state.isLoading && <Spinner />}
            {!DOMdataHandler && (
              <p>Ups! looks like there is no match item found</p>
            )}
            {this.state.error && <Spinner />}
          </div>
        )}

        <FontAwesomeIcon
          icon={faSearch}
          style={{
            width: "12px",
            color: "#0A3E76",
            position: "relative",
            top: "0",
            left: "-22px",
            visibility: "revert",
          }}
        />
        {/* ______________ Dropdown Menu________ */}
        <div
          className={
            this.state.isHovered ? classes.MegaMenu : classes.Disactive
          }
          onMouseEnter={this.showMegaMenuHandler}
          onMouseLeave={this.removeMegaMenuHandler}
        >
          <DropNav icon="fa fa-bank" link="/hotels" close={this.props.close}>
            Hotels
          </DropNav>
          <DropNav
            icon="fa  fa-puzzle-piece "
            link="/appartements"
            close={this.props.close}
          >
            Apartments
          </DropNav>
          <DropNav icon="fa fa-car" link="/cars" close={this.props.close}>
            Cars
          </DropNav>
          <DropNav
            icon="fa fa-tree"
            link="/travelling"
            close={this.props.close}
          >
            Tourism / Travel
          </DropNav>
          <DropNav
            icon="fa fa-camera-retro"
            link="/events"
            close={this.props.close}
          >
            Events
          </DropNav>
        </div>
      </ul>
    );
  }
}

export default withRouter(navigatioItems);
