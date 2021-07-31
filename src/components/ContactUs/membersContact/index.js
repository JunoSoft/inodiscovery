import React, { Component } from "react";
import classses from "./index.module.css";

class members extends Component {
  render() {
    return (
      <React.Fragment>
        <div className={classses.MemberWrapper}>
          <div className={classses.imageWrapper}>
            <img src={this.props.image} width="100px" />
          </div>
          <div className={classses.infoWrapper}>
            <ul>
              <li><h4>{this.props.name}</h4></li>
              <li>{this.props.position}</li>
              <li>{this.props.phone}</li>
              <li className={classses.Website}>{this.props.website}</li>
              <li className={classses.Email}>{this.props.email}</li>
              <li>{this.props.address}</li>
              <li className={classses.Btn}>CONTACT</li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default members;
