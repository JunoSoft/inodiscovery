/** @format */

import React, { Component } from "react";
import axios from "../../hoc/Axios/Axios";
import classes from "./Home.module.css";
import Header from "../../components/SectionHeader/SectionHeader";
import ServicesCards from "../../components/Cards/ServicesCards/ServicesCards";
import Hotel from "../../components/Services/Hotels/HotelCard/HotelCard";
import Car from "../../components/Cards/CarsCards/CarCard/CarCard";
import Appartment from "../../components/Services/Appartements/AppartementsCard/AppartementCard";
import Event from "../../components/Services/Evento/EventCard/EventCard2";
import Trip from "../../components/Services/Tourism/TravelCard/TravelCard";
import Sslider from "../../components/SlickSlider/SlickSlider";
import Spinner from "../../components/UI/Spinner/Spinner2";
import Footer from "../../components/Footer/Footer";
import Empty from "../../components/UI/Empty/Empty";
import Aux from "../../hoc/Auxilliary/Auxilliary";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import Partner from "../../components/partners/pertner";
import BackToTop from "../../components/UI/BackToTop";
import Modal from "../../components/UI/Modal/Modal2";

/* Home components  */

class Home extends Component {
  state = {
    data: null,
    hotels: [],
    apartment: [],
    settedSlider: [],
    verticalAdverts: [],
    horizontalAdverts: [],
    partners: [],
    cars: [],
    events: [],
    travels: [],
    scrolled: false,
    isLoading: false,
    sliderData: [],
    showModal: false,
    modalData: null,
  };
  updatedHotel = () => {
    this.setState({ isLoading: true });
    axios
      .get("/hotels")
      .then((res) => {
        this.setState({ isLoading: false });
        this.setState({
          hotels: res.data.slice(0, 10),
        });
        this.sliderData(res.data.slice(0, 2));
      })
      .catch((error) => {
        this.setState({ isLoading: true });
        alert("Network Problem!");
      });
  };
  settedHomeSlider = () => {
    this.setState({ isLoading: true });
    axios
      .get("/create-home-sliders")
      .then((res) => {
        this.setState({ settedSlider: res.data, isLoading: false });
        this.mainSLiderSetting(res.data);
      })
      .catch((error) => {
        this.setState({ isLoading: true });
        alert("Network Problem!");
      });
  };

  updatedAppartements = () => {
    this.setState({ isLoading: true });
    axios
      .get("/apartment-posts")
      .then((res) => {
        this.setState({ isLoading: false });
        this.setState({
          apartment: res.data.slice(0, 12),
        });
        this.appartmentSLiderData(res.data.slice(0, 2));
      })
      .catch((error) => {
        this.setState({ isLoading: true });
        alert("Network Problem");
      });
  };
  updatedCars = () => {
    this.setState({ isLoading: true });
    axios
      .get("/car-posts")
      .then((res) => {
        this.setState({ isLoading: false });

        this.setState({
          cars: res.data.slice(0, 12),
        });
        this.carSLiderData(res.data.slice(0, 1));
      })
      .catch((error) => {
        this.setState({ isLoading: true });
        alert("Network Problem");
      });
  };

  updatedEvents = () => {
    axios
      .get("/event-posts")
      .then((res) => {
        this.setState({ isLoading: false });
        this.setState({
          events: res.data.slice(0, 10),
        });
      })
      .catch((error) => {
        this.setState({ isLoading: true });
      });
  };

  updatedTravel = () => {
    axios
      .get("/travel-posts")
      .then((res) => {
        this.setState({ isLoading: false });
        this.setState({
          travels: res.data.slice(0, 10),
        });
      })
      .catch((error) => {
        this.setState({ isLoading: true });
      });
  };
  partnersFetch = () => {
    axios.get("/partners").then((res) => {
      this.setState({
        partners: res.data,
      });
    });
  };
  sliderData = (receivedData) => {
    if (this.state.hotels.length !== 0) {
      receivedData.map((element) => {
        return this.state.sliderData.push({
          title: element.hotelName,
          description: element.descriptions,
          price: element.minimumPrice,
          image: element.imageProfile.url,
          id: element.id,
          button: "Great Services  >>",
        });
      });
    }
  };
  appartmentSLiderData = (receivedData) => {
    if (this.state.apartment.length !== 0) {
      receivedData.map((element) => {
        return this.state.sliderData.push({
          title: element.house,
          description: element.descriptions,
          price: element.Price,
          image: element.apartments_owner.profileImage.url,
          id: element.id,
          button: "Discount 10%",
        });
      });
    }
  };
  carSLiderData = (receivedData) => {
    if (this.state.cars.length !== 0) {
      receivedData.map((element) => {
        return this.state.sliderData.push({
          title: element.carName,
          description: element.description,
          price: element.Price,
          image: element.postProfile.url,
          id: element.id,
          button: "Let's  deal >> ",
        });
      });
    }
  };
  mainSLiderSetting = (receivedData) => {
    if (this.state.settedSlider.length !== 0) {
      receivedData.map((element) => {
        return this.state.sliderData.push({
          title: element.buttonName,
          description: element.descriptionInfo,
          price: element.Price,
          image: element.sliderImage.url,
          id: element.id,
          button: "here we go!",
        });
      });
    }
  };
  verticalAdverts = () => {
    axios
      .get("/vertical-adverts")
      .then((res) => {
        this.setState({
          verticalAdverts: res.data,
        });
      })
      .catch((error) => {});
  };
  horizontalAdverts = () => {
    axios
      .get("/horizontal-adverts")
      .then((res) => {
        this.setState({
          horizontalAdverts: res.data,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  stringBreak = (arrayString) => {
    if (arrayString) {
      if (window.screen.availWidth > 900) {
        return arrayString.split("", 180);
      }
      return arrayString.split("", 70);
    }
  };
  componentDidMount() {
    this.settedHomeSlider();
    this.updatedHotel();
    this.updatedAppartements();
    this.updatedCars();
    this.updatedEvents();
    this.updatedTravel();
    this.verticalAdverts();
    this.horizontalAdverts();
    this.partnersFetch();
  }
  clickedHotelHandler = (id) => {
    this.props.history.push("/hotel-view/" + id);
  };
  clickedCarHandler = (id) => {
    this.props.history.push("/cars/" + id);
  };
  clickedEventsHandler = (id) => {
    this.props.history.push("/event/" + id);
  };
  clickedTripHandler = (id) => {
    this.props.history.push("/trip-view/" + id);
  };
  goToAppartment = (id) => {
    this.props.history.push("/appartment/view/" + id);
  };
  clickedSliderBtn = (id) => {
    this.state.hotels.map((el) => {
      if (el.id === id) {
        this.props.history.push("/hotel-view/" + id);
      }
    });
    this.state.cars.map((el) => {
      if (el.id === id) {
        this.props.history.push("/cars/" + id);
      }
    });
    this.state.apartment.map((el) => {
      if (el.id === id) {
        this.props.history.push("/appartment/view/" + id);
      }
    });
    this.state.settedSlider.map((el) => {
      if (el.id === id) {
        this.setState({ showModal: true, modalData: el });
      }
    });
  };
  closeModalHandler = () => {
    this.setState({ showModal: false });
  };
  render() {
    let hotelsDOM;
    let leftAdverts = [];
    let rightAdverts = [];
    const modalDisplay =
      this.state.modalData && this.state.showModal ? (
        <Modal show={this.state.showModal} modalClosed={this.closeModalHandler}>
          <div className={classes.ModalContent}>
            <img src={this.state.modalData.sliderImage.url} />
            <p>{this.state.modalData.descriptionInfo}</p>
          </div>
        </Modal>
      ) : (
        ""
      );

    if (this.state.verticalAdverts.length !== 0) {
      let i = 0;
      this.state.verticalAdverts.map((ads, index) => {
        i++;
        if (i === 0 || i % 2 === 0) {
          return rightAdverts.push(
            <a target="_blank" key={index} href={ads.link ? ads.link : "#"}>
              <img alt="Ads" src={ads.Advert.url} width="100%" key={index} />
            </a>
          );
        }
        if (i % 2 !== 0) {
          return leftAdverts.push(
            <a target="_blank" key={index} href={ads.link ? ads.link : "#"}>
              <img alt="Ads" src={ads.Advert.url} width="100%" key={index} />
            </a>
          );
        }
      });
    }
    if (this.state.hotels.length === 0) {
      hotelsDOM = <Empty message=" Oooops! There is no hotel added yet" />;
    } else {
      hotelsDOM = this.state.hotels.map((hotel) => {
        const discount = (minPrice) => (minPrice * hotel.discountPercent) / 100;

        return (
          <Hotel
            key={hotel.id}
            image={hotel.imageProfile.url}
            name={hotel.hotelName}
            stars={hotel.hotelStars}
            minCost={hotel.minimumPrice}
            location={hotel.location}
            discount={hotel.minimumPrice - discount(hotel.minimumPrice)}
            clicked={() => this.clickedHotelHandler(hotel.id)}
          />
        );
      });
    }

    let apartementDOM;
    if (this.state.apartment.length === 0) {
      apartementDOM = (
        <Empty message=" Oooops! There is no apartment added yet" />
      );
    } else {
      apartementDOM = this.state.apartment.map((apartment) => {
        return (
          <Appartment
            key={apartment.id}
            appartName={apartment.house}
            image={
              apartment.apartments_owner.profileImage.url
                ? apartment.apartments_owner.profileImage.url
                : apartment.apartmentGallery[0].url
            }
            location={
              apartment.apartments_owner.location
                ? apartment.apartments_owner.location
                : ""
            }
            miniCost={apartment.price}
            clicked={() => this.goToAppartment(apartment.id)}
          />
        );
      });
    }

    let carToTheDOM;
    this.state.cars.length === 0
      ? (carToTheDOM = <Empty />)
      : (carToTheDOM = this.state.cars.map((car) => {
          const description = car.description.split("", 42);
          return (
            <Car
              key={car.id}
              image={
                car.garellyImages[0].url
                  ? car.garellyImages[0].url
                  : car.car_owner.profileImage.url
              }
              price={car.price}
              carName={car.carName}
              carType={car.carType}
              description={description}
              clicked={() => this.clickedCarHandler(car.id)}
            />
          );
        }));

    let eventsToTheDOM;
    if (this.state.events.length === 0) {
      eventsToTheDOM = <Empty message=" Oooops! There is no event added yet" />;
    } else {
      eventsToTheDOM = this.state.events.map((event) => {
        let date = new Date(event.date);
        const datas = new Date(date).toUTCString("en", {
          timeZone: "UTC cairo",
        });
        return (
          <Event
            key={event.id}
            image={event.eventPoster.url}
            price={event.price}
            eventName={event.eventName}
            date={datas}
            eventType={event.eventType}
            clicked={() => this.clickedEventsHandler(event.id)}
          />
        );
      });
    }

    let travelDOM;
    if (this.state.travels.length === 0) {
      travelDOM = <Empty message=" Oooops! There is no trip added yet" />;
    } else {
      travelDOM = this.state.travels.map((travel) => {
        return (
          <Trip
            key={travel.id}
            image={travel.travel_comapy.imageProfile.url}
            agency={travel.travel_comapy.companyName}
            tripName={travel.tripName}
            location={travel.tripLocation}
            cost={travel.tripCost}
            clicked={() => this.clickedTripHandler(travel.id)}
          />
        );
      });
    }

    const homePageliders =
      this.state.sliderData.length !== 0 ? (
        this.state.sliderData.map((item, index) => (
          <Carousel.Item key={index}>
            <div className={classes.SliderCover}></div>
            <img
              className="d-block w-100"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              src={item.image}
              alt={item.title}
            />
            <div className={classes.Caption}>
              <h3 style={{ marginTop: "150px" }}>{item.title}</h3>
              <p>{this.stringBreak(item.description)}...</p>
              <p>{item.cost}</p>
              <button
                className={classes.AdvertButton}
                onClick={() => this.clickedSliderBtn(item.id)}
              >
                {item.button}
              </button>
            </div>
          </Carousel.Item>
        ))
      ) : (
        <Aux>
          <br />
          <br />
          <Spinner />
        </Aux>
      );
    const partners =
      this.state.partners.length !== 0
        ? this.state.partners.map((partner, index) => (
            <Partner
              key={index}
              image={partner.Logo.url}
              pLink={partner.link ? partner.link : "#"}
            />
          ))
        : "";

    return (
      <Aux>
        {modalDisplay}
        <div className={classes.SliderHolder}>
          <Carousel fade>{homePageliders}</Carousel>
        </div>
        <ServicesCards />
        <div className={classes.LeftAdverts}>{leftAdverts}</div>
        <div className={classes.RightAdverts}>{rightAdverts}</div>
        <div className={classes.ContentBody}>
          <Header
            title="Hotels"
            subtitle="We get better with every customer we deal with, at Ino Discovery there a best opportunity for you to get great and affordable hotel in Rwanda with great discount."
          />
          {!this.state.isLoading && <Sslider>{hotelsDOM}</Sslider>}
          {this.state.isLoading && <Spinner />}
          <div className={classes.HorizontalAdvert}>
            {this.state.horizontalAdverts.length !== 0 &&
            this.state.horizontalAdverts[0].Advert.url !== undefined ? (
              <a
                target="_blank"
                href={
                  this.state.horizontalAdverts[0].link !== ""
                    ? this.state.horizontalAdverts[0].link
                    : "#"
                }
              >
                <img
                  alt="Advertisement"
                  src={this.state.horizontalAdverts[0].Advert.url}
                />
              </a>
            ) : (
              ""
            )}
          </div>
          <Header
            title="Apartments, Villas & Guest Houses"
            subtitle="We have for you the best apartments switable with your wishes.let's Deal  "
          />
          {!this.state.isLoading && <Sslider>{apartementDOM}</Sslider>}
          {this.state.isLoading && <Spinner />}
          <div className={classes.HorizontalAdvert}>
            {this.state.horizontalAdverts.length !== 0 &&
            this.state.horizontalAdverts[1] !== undefined ? (
              <a
                target="_blank"
                href={
                  this.state.horizontalAdverts[1].link !== undefined
                    ? this.state.horizontalAdverts[1].link
                    : "#"
                }
              >
                <img
                  alt="Advertisement"
                  src={this.state.horizontalAdverts[1].Advert.url}
                />
              </a>
            ) : (
              ""
            )}
          </div>
          <Header
            title="Cars, Trucks and Vans"
            subtitle="With large number of quality cars, trucks and vans  At cheap price, you can sell and rent at the best of your choice , let's deal! "
          />
          {!this.state.isLoading && <Sslider>{carToTheDOM}</Sslider>}
          {this.state.isLoading && <Spinner />}
          <div className={classes.HorizontalAdvert}>
            {this.state.horizontalAdverts.length !== 0 &&
            this.state.horizontalAdverts[2] !== undefined ? (
              <a
                target="_blank"
                href={
                  this.state.horizontalAdverts[2].link !== ""
                    ? this.state.horizontalAdverts[2].link
                    : "#"
                }
              >
                <img
                  alt="Advertisement"
                  src={this.state.horizontalAdverts[2].Advert.url}
                />
              </a>
            ) : (
              ""
            )}
          </div>
          <Header
            title="Events"
            subtitle="Here we go!  through our platform you can find and apply different event related to your career or business "
          />
          {!this.state.isLoading && <Sslider>{eventsToTheDOM}</Sslider>}
          {this.state.isLoading && <Spinner />}
          <div className={classes.HorizontalAdvert}>
            {this.state.horizontalAdverts.length !== 0 &&
            this.state.horizontalAdverts[3] !== undefined ? (
              <a
                target="_blank"
                href={
                  this.state.horizontalAdverts[3].link !== ""
                    ? this.state.horizontalAdverts[3].link
                    : "#"
                }
              >
                <img
                  alt="Advertisement"
                  src={this.state.horizontalAdverts[3].Advert.url}
                />
              </a>
            ) : (
              ""
            )}
          </div>
          <Header
            title="Tour/Travel"
            subtitle="Do you want to travel? at Ino Discovery there the  best trip that may fit your wishes,lets Deal."
          />
          {!this.state.isLoading && <Sslider>{travelDOM}</Sslider>}
          {this.state.isLoading && <Spinner />}
          <div className={classes.HorizontalAdvert}>
            {this.state.horizontalAdverts.length !== 0 &&
            this.state.horizontalAdverts[4] !== undefined ? (
              <a
                target="_blank"
                href={
                  this.state.horizontalAdverts[4].link !== ""
                    ? this.state.horizontalAdverts[4].link
                    : "#"
                }
              >
                <img
                  alt="Advertisement"
                  src={this.state.horizontalAdverts[4].Advert.url}
                />
              </a>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={classes.PartnerWrapper}>
          <h2 style={{ width: "100%" }}>Discover more with our Business Partners</h2>
          <br />
          {partners}
        </div>
        <BackToTop />
        <Footer />
      </Aux>
    );
  }
}

export default Home;
