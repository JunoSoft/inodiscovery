import React, { Component } from "react";
import Aux from "../../hoc/Auxilliary/Auxilliary";
import axios from "../../hoc/Axios/Axios";
import Spinner from "../UI/Spinner/Spinner2";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Footer from "../Footer/Footer";
import classes from "./ContactUs.module.css";

class contact extends Component {
  state = {
    contactForm: {
      names: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Names",
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
          placeholder: "E-Mail",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      message: {
        elementType: "textarea",
        elementConfig: {
          rows: "4",
          placeholder: "Message",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    loading: false,
  };
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
      const pattern =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }
  sendMessageHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.contactForm) {
      formData[formElementIdentifier] =
        this.state.contactForm[formElementIdentifier].value;
    }
    const message = {
      message: formData,
    };
    axios
      .post("/messages.json", message)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
        alert("Your Message Was Send and received Safely ,Thank You!");
      })
      .catch((error) => {
        this.setState({ loading: false });
        alert("Hey,Something Went Wrong in Message Sending,Try again!!");
      });
  };
  inputChangedHandler = (event, inputIdentifier) => {
    const updatedContactForm = {
      ...this.state.contactForm,
    };
    const updatedFormElement = {
      ...updatedContactForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedContactForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedContactForm) {
      formIsValid = updatedContactForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({
      contactForm: updatedContactForm,
      formIsValid: formIsValid,
    });
  };
  render() {
    const style = {
      backgroundColor: "rgba(0,0,0,0.7)",
      height: "400px",
    };

    const formElementsArray = [];
    for (let key in this.state.contactForm) {
      formElementsArray.push({
        id: key,
        config: this.state.contactForm[key],
      });
    }

    let form = (
      <form onSubmit={this.sendMessageHandler}>
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
          <Button btnType="Success" disabled={!this.state.formIsValid}>
            Send <i className="fa fa-"></i>
          </Button>
        </div>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <Aux>
        <div className={classes.ContactUs}>
          <div style={style}></div>
          <div className={classes.TopContact}>
            <h1>Get in touch </h1>
            <p>
              Want to get in touch? we'd love to hear from you,here's how you
              can reach us
            </p>
            <img src="https://www.immigration.ca/wp-content/uploads/2020/04/contact_us_279387361-scaled.jpeg" />
          </div>
          <div className={classes.ContactBox}>
            <div className={classes.MessagingContact}>
              <h3>Send us a Message</h3>
              <div>{form}</div>
            </div>
            <div className={classes.InfoContact}>
              <h3>Address</h3>
              <p>
                <i className="fa fa-phone"></i>PHONE: +250 788 926 536
              </p>
              <p>
                <i className="fa fa-envelope "></i>Email: info@inodiscovery.com
              </p>
              <p>
                <i className="fa fa-map-marker "></i>Rwanda,Kigali,Kicukiro
              </p>
              <div className={classes.SocialMedias}>
                <a href="https://www.instagram.com/inodiscovery/">
                  <i className="fa fa-instagram"></i>
                </a>
                <a href="https://www.facebook.com/inodiscovery/">
                  <i className="fa fa-facebook"></i>
                </a>
                <a href="https://www.youtube.com/channel/UCFtamPGxAv4g2AjlBr8hMyw">
                  <i className="fa fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Aux>
    );
  }
}
export default contact;
