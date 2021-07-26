/** @format */

import classes from "./SignUp.module.css";
import React, { Component } from "react";
import FormFields from "../UI/Input/Input";
import { Link } from "react-router-dom";

export default class SignUp extends Component {
  state = {
    registerError: "",
    loading: false,
    formData: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email",
          type: "email",
          placeholder: "Enter your email",
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password",
          type: "password",
          placeholder: "Enter your password",
        },
        validation: {
          required: true,
          password: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
    },
  };

  updateForm = (element) => {
    const newFormData = {
      ...this.state.formData,
    };
    const newElement = {
      ...newFormData[element.id],
    };
    newElement.value = element.event.target.value;

    if (element.blur) {
      let validData = this.validate(newElement);
      newElement.valid = validData[0];
      newElement.validationMessage = validData[1];
    }
    newElement.touched = element.blur;
    newFormData[element.id] = newElement;

    this.setState({ formData: newFormData });
  };

  loginHandler = (event, type) => {
    event.preventDefault();

    if (type !== null) {
      let dataToSubmit = {};
      let formIsValid = true;

      for (let key in this.state.formData) {
        dataToSubmit[key] = this.state.formData[key].value;
      }
      for (let key in this.state.formData) {
        formIsValid = this.state.formData[key].valid && formIsValid;
      }
    }
  };

  loginButton = () =>
    this.state.loading ? (
      "Loading..."
    ) : (
      <button
        disabled
        className={classes.LoginButton}
        onClick={(event) => this.loginHandler(event, true)}>
        Log In
      </button>
    );

  validate = (element) => {
    let error = [true, ""];

    if (element.validation.email) {
      const valid =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
          element.value
        );
      const message = `${!valid ? "Not Valid Email" : ""}`;
      error = !valid ? [valid, message] : error;
    }

    if (element.validation.password) {
      const valid = element.value.length >= 5;
      const message = `${!valid ? "Weak Password" : ""}`;
      error = !valid ? [valid, message] : error;
    }

    if (element.validation.required) {
      const valid = element.value.trim() !== "";
      const message = `${!valid ? "This field is required" : ""}`;
      error = !valid ? [valid, message] : error;
    }
    return error;
  };

  render() {
    return (
      <div className={classes.LogContainer}>
        <h2>Login / Register</h2>
        <p style={{ color: "red" }}>{this.state.registerError}</p>
        <form onSubmit={(event) => this.loginHandler(event, null)}>
          <FormFields
            id={"email"}
            formData={this.state.formData.email}
            change={(element) => this.updateForm(element)}
          />
          <FormFields
            id={"password"}
            formData={this.state.formData.password}
            change={(element) => this.updateForm(element)}
          />
          {this.loginButton()}
          <Link
            to="/sign-up"
            style={{
              color: "#0066FF",
              padding: "2px 10px",
              textDecoration: "underline",
            }}>
            Register
          </Link>
        </form>
      </div>
    );
  }
}
