import React, { Component } from "react";
import classes from "./Reservation.module.css";
import Aux from "../../../../hoc/Auxilliary/Auxilliary";
import Input from "../../../UI/Input/Input";
import Button from "../../../UI/Button/Button";
import Spinner from "../../../UI/Spinner/Spinner2";
import axios from "../../../../hoc/Axios/Axios";

class ReservationPage extends Component {
  state = {
    openCalendar: false,
    date: new Date(),
    orderForm: {
      fName: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "First Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      lastName: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Last Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      phone: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Phone",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      checkInDate: {
        elementType: "date",
        label: "Check In date",
        elementConfig: {
          type: "date",
          placeholder: "check in date",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      checkOutDate: {
        elementType: "date",
        label: "Check Out date",
        elementConfig: {
          type: "date",
          placeholder: "check in date",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "alone", displayValue: "Alone" },
            { value: "couple", displayValue: "Couple" },
            { value: "withkids", displayValue: "With Kids" },
            { value: "team", displayValue: "Team" },
            { value: "other", displayValue: "other" },
          ],
        },
        value: "",
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
    loading: false,
  };
  handleChange = (date) => this.setState({ setDate: date });
  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }
  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
    };
    axios
      .post("/reservation.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
        alert("Order is Send Correctly");
      })
      .catch((error) => {
        this.setState({ loading: false });
        alert("Something Went Wrong in Order Sending");
      });
  };
  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };
  render() {
    const style = {
      backgroundColor: "#030",
      height: "100%",
      width: "100%",
    };

    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            label={formElement.config.label}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <div className={classes.frmBtn}>
          <Button
            btnType="Success"
            disabled={!this.state.formIsValid}
            onSubmit={this.orderHandler}
          >
            Reservation
          </Button>
        </div>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <Aux>
        <div style={style} className={classes.ReservationPage}>
          <img src="https://thumbor.forbes.com/thumbor/2000x1009/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5cdb058a5218470008b0b00f%2F0x0.jpg%3Ffit%3Dscale" />
          <div className={classes.ReservationPlace}>
            <div className={classes.Restitle}>
              <h2>RESERVATION</h2>
              <p>
                Fill the form for reservation , we are here for you and your
                wishes
              </p>
            </div>
            {form}
          </div>
        </div>
      </Aux>
    );
  }
}
export default ReservationPage;
