/** @format */

import React, { Component } from "react";
import classes from "./SideDrawer.module.css";
import Aux from "../../../hoc/Auxilliary/Auxilliary";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Logo from "../Logo/Logo";
import { withRouter, Link } from "react-router-dom";
import DrawerNav from "./DrawerNav/DrawerNav";
class SideDrawer extends Component {
  state = {
    closing: this.props.close,
  };

  render() {
    let attachedClass = [classes.SideDrawer, classes.Close];
    if (this.props.open) {
      attachedClass = [classes.SideDrawer, classes.Open, classes.DrawerContent];
    }

    return (
      <Aux>
        <Backdrop show={this.props.open} clicked={this.props.close} />
        <div className={attachedClass.join(" ")}>
          <div className={classes.TopDrawer} onClick={this.props.close}>
            <Link to="/">
              <i className="fa fa-home fa-2x"></i>
              <Logo />
            </Link>
          </div>
          <DrawerNav icon="fa fa-bank" link="/hotels" close={this.props.close}>
            Hotels
          </DrawerNav>
          <DrawerNav
            icon="fa fa-fort-awesome"
            link="/appartements"
            close={this.props.close}
          >
            Appartements
          </DrawerNav>
          <DrawerNav icon="fa fa-car" link="/cars" close={this.props.close}>
            Cars
          </DrawerNav>
          <DrawerNav
            icon="fa fa-ship"
            link="/travelling"
            close={this.props.close}
          >
            Tourism / Travel
          </DrawerNav>
          <DrawerNav
            icon="fa fa-language"
            link="/events"
            close={this.props.close}
          >
            Events
          </DrawerNav>
          <DrawerNav
            icon="fa fa-phone"
            link="/contact"
            close={this.props.close}
          >
            Contact us
          </DrawerNav>
          <DrawerNav
            icon="fa fa-book"
            link="/about"
            close={this.props.close}
          >
            About us
          </DrawerNav>

        </div>
      </Aux>
    );
  }
}

export default withRouter(SideDrawer);
