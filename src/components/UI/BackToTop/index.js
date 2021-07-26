import React, { Component } from "react";
import BackToTop from "react-back-to-top-button";

class Scroll extends Component {
  render() {
    return (
      <BackToTop
        showOnScrollUp
        showAt={100}
        speed={1500}
        easing="easeInOutQuint"
      >
        <span style={{ color: "blue" }}>
          <i className="fa fa-angle-double-up"></i>
        </span>
      </BackToTop>
    );
  }
}
export default Scroll;
