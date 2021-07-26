import React, { Component } from "react";
import Logo from "../Logo/Logo";
import NavigatioItems from "../NavigationItems/NavigationItems";
import ToggleDrawer from "../SideDrawer/ToggleDrawer/ToggleDrawer";
import classes from "./Toolbar.module.css";
import { withRouter } from "react-router-dom";
class toolbar extends Component {
  goToIndex = () => {
    this.props.history.push("/");
  };

  render() {
    const clsActive = [classes.Header, classes.Active];
    const toolbarShow = this.props.scrolled
      ? clsActive.join(" ")
      : classes.Header;

    return (
      <header className={toolbarShow}>
        <Logo clicked={() => this.goToIndex()} />
        <NavigatioItems className={classes.DesktopOnly} />
        <ToggleDrawer clicked={this.props.open} />
      </header>
    );
  }
}
export default withRouter(toolbar);
