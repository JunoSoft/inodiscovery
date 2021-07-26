import React, { Component } from "react";
import Aux from "../Auxilliary/Auxilliary";
import Toolbar from "../../components/navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/navigation/SideDrawer/SideDrawer";
import classes from "./Layout.module.css";

class Layout extends Component {
  state = {
    showSideDrawer: false,
    scrolled: false,
  };

  openSideDrawerHandler = () => {
    this.setState({ showSideDrawer: true });
  };
  closeSideDrawerHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  headerChangeBackground = () => {
    if (window.scrollY >= 150) {
      this.setState({ scrolled: true });
    } else {
      this.setState({ scrolled: false });
    }
  };
  render() {
    window.addEventListener("scroll", this.headerChangeBackground);
    return (
      <Aux>
        <Toolbar
          scrolled={this.state.scrolled}
          open={this.openSideDrawerHandler}
        />
        <SideDrawer
          open={this.state.showSideDrawer}
          close={this.closeSideDrawerHandler}
        />
        <main className={classes.MainContent}>{this.props.children}</main>
      </Aux>
    );
  }
}
export default Layout;
