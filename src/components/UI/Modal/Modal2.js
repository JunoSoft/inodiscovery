/** @format */

import React, { Component } from "react";
import classes from "./Modal.module.css";
import Aux from "../../../hoc/Auxilliary/Auxilliary";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }
  componentWillUpdate() {
    console.log("[modal] is updated");
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal2}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-700vh)",
          }}>
          {this.props.children}
        </div>
      </Aux>
    );
  }
}
export default Modal;
