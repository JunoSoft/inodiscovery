/** @format */

import React, { Component } from "react";
import classes from "./EventView.module.css";
import Aux from "../../../../hoc/Auxilliary/Auxilliary";
import Event from "../../../Services/Evento/EventCard/EventCard2";
import Spinner from "../../../UI/Spinner/Spinner2";
import parse from "html-react-parser";
import axios from "../../../../hoc/Axios/Axios";
import { withRouter } from "react-router-dom";

class eventView extends Component {
  state = {
    eventData: null,
    events: [],
    isLoading: true,
  };
  recommendedEvents = () => {
    axios
      .get("/event-posts")
      .then((res) => {
        console.log(res.data);
        this.setState({ events: res.data });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  };
  eventDetails = (paramaId) => {
    if (paramaId) {
      if (
        !this.state.eventData ||
        (this.state.eventData && this.state.eventData.id !== paramaId)
      ) {
        axios
          .get("/event-posts/" + paramaId)
          .then((res) => {
            this.setState({ eventData: res.data });
            if (res) {
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
  clickedEventHandler = (id) => {
    this.props.history.push("/event/" + id);
    this.eventDetails(id);
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.eventDetails(id);
    this.recommendedEvents();
  }
  render() {
    // let strippedString = this.state.eventData.details.replace(/['"]+/g, "");
    let eventView = (
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
    let events = this.state.events.map((event) => {
      return (
        <Event
          key={event.id}
          image={event.eventPoster.url}
          eventName={event.eventName}
          date={event.date}
          clicked={() => this.clickedEventHandler(event.id)}
        />
      );
    });

    if (this.props.match.params.id) {
      eventView = <Spinner />;
    }
    if (this.state.eventData) {
      let date = new Date(this.state.eventData.date);
      const datas = new Date(date).toUTCString("en", {
        timeZone: "UTC cairo",
      });
      eventView = (
        <Aux>
          <div className={classes.ImageHold}>
            <img
              src={this.state.eventData.eventPoster.url}
              alt={this.state.eventData.eventName}
            />
          </div>
          <div className={classes.InfoHold}>
            <h3>{this.state.eventData.eventName}</h3>
            <p>
              <b>BY ...</b>
              {this.state.eventData.event_owner.companyName}
            </p>
            <div className={classes.Location}>
              Location___
              <p>{this.state.eventData.location}</p>
            </div>
            <div className={classes.Date}>
              Date,Time___
              <p>{datas}</p>
            </div>
          </div>
          <div className={classes.AboutSection}>
            <div className={classes.Left}>
              <h3>About this Event</h3>
              <p>{this.state.eventData.description}</p>
              <p className={classes.Apply}>
                Apply Here...
                <br />
                <a href={this.state.eventData.link}>
                  {this.state.eventData.link}
                </a>
              </p>
            </div>
            <h2>Other Events You May Like</h2>
            <div className={classes.EventsRecommend}>{events}</div>
          </div>
        </Aux>
      );
    }

    return (
      <div className={classes.EventViewWrap}>
        <div className={classes.Bg}></div>
        <div className={classes.EventInfoSection}>{eventView}</div>
      </div>
    );
  }
}

export default withRouter(eventView);
