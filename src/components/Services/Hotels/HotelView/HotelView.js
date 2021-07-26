/** @format */

import React, { Component } from "react";
import axios from "../../../../hoc/Axios/Axios";
import classes from "./HotelView.module.css";
import Aux from "../../../../hoc/Auxilliary/Auxilliary";
import Hotel from "../HotelCard/HotelCard2";
import Footer from "../../../Footer/Footer";
import Spinner from "../../../UI/Spinner/Spinner2";
import { withRouter } from "react-router-dom";
import Garelly from "react-grid-gallery";
import Carousel from "re-carousel";
import SpecialOffers from "./SpecialOffers";
class HotelView extends Component {
  state = {
    hotels: null,
    hotelData: [],
    hotelServices: [],
    otherServicesArr: [],
    imageGallery: [],
    isLoading: false,
    isHovered: false,
    hoveredService: null,
  };
  hotelServices = (id) => {
    this.setState({ isLoading: true });
    axios
      .get("/hotel-services")
      .then((res) => {
        let hotelServiceFiltered = res.data.filter(
          (service) => service.hotel.id === id
        );

        this.setState({
          hotelServices: hotelServiceFiltered,
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        alert("There is no Services Yest Added for this Hotel!");
      });
  };
  recommendedHotels = () => {
    this.setState({ isLoading: true });
    axios
      .get("/hotels")
      .then((res) => {
        this.setState({ hotels: res.data, isLoading: false });
      })
      .catch((error) => {
        console.log(error.message);
        this.setState({ isLoading: false });
      });
  };
  toggleHover = (image, caption, cost) => {
    //this.setState((prevState) => ({ isHovered: !prevState.isHovered }));
    const hoveredData = { image: image, caption: caption, serviceCost: cost };

    this.setState({
      isHovered: true,
      hoveredService: hoveredData,
    });
  };

  viewHoteldetails = (paramId) => {
    this.setState({ isLoading: true });

    if (paramId) {
      if (
        this.state.hotelData.length === 0 ||
        (this.state.hotelData && this.state.hotelData.id !== paramId)
      ) {
        this.hotelServices(paramId);
        axios
          .get("/hotels/" + paramId)
          .then((res) => {
            this.setState({
              hotelData: res.data,
              imageGallery: res.data.hotelGalleryImages,
              otherServicesArr: res.data.x_services,
              isLoading: false,
            });
          })
          .catch((error) => {
            console.log(error.message);
            this.setState({ isLoading: false });
          });
      }
    }
  };
  clickedHotelHandler = (id) => {
    this.props.history.push("/hotel-view/" + id);
    this.viewHoteldetails(id);
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.hotelServices(id);
    this.recommendedHotels();
    this.viewHoteldetails(id);
  }

  render() {
    const bookingButton = !this.state.hotelData.website ? (
      " "
    ) : (
      <a
        target="blank"
        rel="noopener noreferrer"
        href={this.state.hotelData.website}
      >
        <div className={classes.BookButtonMini}>
          Book Now
          <i className="fa fa-long-arrow-right fa-2x"></i>
        </div>
      </a>
    );
    const bookingButtonBigScreen = !this.state.hotelData.website ? (
      " "
    ) : (
      <a
        target="blank"
        rel="noopener noreferrer"
        href={this.state.hotelData.website}
        style={{ textDecoration: "none" }}
      >
        <div className={classes.BookButton} style={{ height: "50px" }}>
          Book Now
          <i className="fa fa-long-arrow-right fa-2x"></i>
        </div>
      </a>
    );
    const otherService = this.state.otherServicesArr.map((service) => {
      return (
        <SpecialOffers key={service._id} offerName={service.addServiceName} />
      );
    });

    /**........Hotel view Code.......... */
    let hotelView = (
      <p
        style={{
          margin: "auto",
          width: "100%",
          textAlign: "center",
          marginTop: "80px",
        }}
      >
        No Data found!
      </p>
    );
    if (this.props.match.params.id) {
      hotelView = <Spinner />;
    }
    if (this.state.hotelServices.length !== 0) {
      let imageList = this.state.hotelServices.map((service, index) => (
        <Aux key={index}>
          <div
            className={classes.Costs}
            onMouseEnter={this.toggleHover.bind(
              this,
              service.Image.url,
              service.serviceName,
              service.serviceCost
            )}
            onClick={this.toggleHover.bind(
              this,
              service.Image.url,
              service.serviceName,
              service.serviceCost
            )}
          >
            <img src={service.Image.url} />
            <div className={classes.ServiceName}>{service.serviceName}</div>
            <div className={classes.ServiceCost}>{service.serviceCost}</div>
          </div>
        </Aux>
      ));
      //*********   ___________________************ */
      let serviceSlider = (
        <Carousel loop auto>
          {this.state.hotelServices.map((service, index) => (
            <div key={index}>
              <img src={service.Image.url} />
              <p>
                {service.serviceName} _____ {service.serviceCost}
              </p>
            </div>
          ))}
        </Carousel>
      );
      //where service clicked or hovered will be shown
      if (this.state.isHovered) {
        serviceSlider = (
          <Aux>
            <img src={this.state.hoveredService.image} />
            <p className={classes.MyP}>
              {this.state.hoveredService.caption} _____
              {this.state.hoveredService.serviceCost}
            </p>
          </Aux>
        );
      }

      const IMAGES = this.state.imageGallery.map((galleryImage) => {
        return {
          src: galleryImage.url,
          thumbnail: galleryImage.url,
          thumbnailWidth: 320,
          thumbnailHeight: 212,
          caption: galleryImage.caption,
        };
      });
      let galleryDisplay = (
        <Garelly images={IMAGES} backdropClosesModal={true} />
      );
      hotelView = (
        <Aux>
          <div className={classes.BgHeader}></div>
          <h1 className={classes.hotelTtitle}>
            {this.state.hotelData.hotelName}
          </h1>
          <div className={classes.HotelShow}>
            <div className={classes.HotelViews}>
              <div className={classes.HotelSlider}>{serviceSlider}</div>
              <div className={classes.HotelPhotosLine}>{imageList}</div>
              <div className={classes.HotelPresent}>
                <div className={classes.SpecialOffers}>
                  <h3>Special Offers</h3>
                  <div className={classes.Offers}> {otherService}</div>
                </div>
                <div className={classes.MapShow}>{otherService}</div>
                {bookingButtonBigScreen}
              </div>
            </div>
            <div className={classes.HotelPhotosLine}>{imageList}</div>

            <h2 className={classes.GarellyTitle}>Hotel Garelly</h2>
            <div className={classes.HotelDetails}>{galleryDisplay}</div>
            <h2 className={classes.GarellyTitle}>Description</h2>
            <div className={classes.Description}>
              <div className={classes.DescriptionRow}>
                {this.state.hotelData.descriptions}
              </div>
            </div>
            <div className={classes.HotelPresent}>{bookingButton}</div>
          </div>
        </Aux>
      );
    } else {
      hotelView = (
        <p
          style={{
            margin: "auto",
            width: "100%",
            textAlign: "center",
            marginTop: "80px",
          }}
        >
          No Services Added yet for this hotel!
        </p>
      );
    }
    /**........______________.......... */
    /**this is hotels recommended list */
    let hotelsList = "Loading...";
    if (this.state.hotels) {
      hotelsList = this.state.hotels.map((htl) => {
        const discount = (minPrice) => (minPrice * htl.discountPercent) / 100;
        return (
          <Hotel
            key={htl.id}
            image={htl.imageProfile.url}
            name={htl.hotelName}
            location={htl.location}
            minCost={htl.minimumPrice}
            discount={htl.minimumPrice - discount(htl.minimumPrice)}
            stars={htl.hotelStars}
            clicked={() => this.clickedHotelHandler(htl.id)}
          />
        );
      });
    }

    /**-------------------------- */
    return (
      <Aux>
        {hotelView}
        <h2 className={classes.RecommendationTitle}>RECOMMENDED DESTINATION</h2>
        <div className={classes.Hotels}>{hotelsList}</div>
        <Footer />
      </Aux>
    );
  }
}

export default withRouter(HotelView);
