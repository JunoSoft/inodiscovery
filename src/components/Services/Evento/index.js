/** @format */

import React, { Component } from "react";
import Aux from "../../../hoc/Auxilliary/Auxilliary";
import Footer from "../../Footer/Footer";
import Event from "./EventCard/EventCard2";
import classes from "./index.module.css";
import bg from "../../../assets/Images/tourism/19525073863_5122b80463_c.jpg";
import axios from "../../../hoc/Axios/Axios";
import Modal from "../../UI/Modal/Modal2";
import Spinner from "../../UI/Spinner/Spinner2";
import Empty from "../../UI/Empty/Empty";
import parse from "html-react-parser";
class tourism extends Component {
  state = {
    events: [],
    eventInfo: null,
    isLoading: true,
    isEventClicked: false,
  };
  componentDidMount() {
    axios
      .get("/event-posts")
      .then((res) => {
        console.log(res.data);

        this.setState({ events: res.data });
        if (res) {
          this.setState({ isLoading: false });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false });
      });
    this.eventView = (id) => {
      if (id) {
        if (
          !this.state.eventInfo ||
          (this.state.eventInfo && this.state.eventInfo.id !== id)
        ) {
          axios
            .get("/event-posts/" + id)
            .then((res) => {
              if (res) {
                this.setState({ eventInfo: res.data });
                console.log(res.data);
                this.setState({ isLoading: false });
              }
            })
            .catch((error) => {
              console.log(error);
              this.setState({ isLoading: false });
            });
        }
      }
    };
  }
  closeModal = () => {
    this.setState({ isEventClicked: false });
  };
  goToEvent = (id) => {
    this.eventView(id);

    this.setState({ isEventClicked: true });
  };
  render() {
    console.log(this.state.eventInfo);
    const style = {
      height: "400px",
      bckgroundColor: "black",
      backgroundImage: `url(${bg})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backGroundPosition: "center",
      zIndex: -1,
    };
    let modal = null;
    if (this.state.eventInfo) {
      {
        modal = (
          <Modal show={this.state.isEventClicked}>
            <div className={classes.Close} onClick={() => this.closeModal()}>
              Close <i className="fa fa-close"></i>
            </div>
            <div className={classes.EventModalContent}>
              <div className={classes.PosterHolder}>
                <img src={this.state.eventInfo.eventPoster.url} />
              </div>
              <div className={classes.PosterInfo}>
                <h2>{this.state.eventInfo.companyName}</h2>
                <h3>INFORMATIONS</h3>
                <p>{this.state.eventInfo.description}</p>
                <p>
                  <b>Apply ......</b>
                  <a href={this.state.eventInfo.link}>
                    {this.state.eventInfo.link}
                  </a>
                </p>
                <h3>LOCATION</h3>
                <p>KIgali Convention center,kigali-Gasabo ,street Kg 12</p>
              </div>
            </div>
          </Modal>
        );
      }
    }
    let events = null;
    if (this.state.isLoading) {
      events = <Spinner />;
    } else {
      if (this.state.events) {
        events = this.state.events.map((event, index) => {
          const date = new Date(event.date);
          const datas = new Date(date).toUTCString("en", {
            timeZone: "UTC cairo",
          });
          return (
            <Event
              key={index}
              image={event.eventPoster.url}
              eventName={event.eventName}
              date={datas}
              clicked={() => this.goToEvent(event.id)}
            />
          );
        });
      } else {
        events = "No network";
      }
    }

    return (
      <Aux>
        {modal}
        <div className={classes.Events}>
          <div style={style}>
            <div className={classes.Bg}></div>
          </div>
          <div className={classes.TopEvents}>
            <h1> Events </h1>
            <p>
              Here you are ,Thank you for choosing Ino Discovery. You can choose
              Event you can attend
            </p>
          </div>
          <div className={classes.EventsHolder}>
            {events && events}
            {events.length === 0 && (
              <Empty message="Ooops There are no events added yet !!" />
            )}
          </div>
        </div>
        <Footer />
      </Aux>
    );
  }
}
export default tourism;
