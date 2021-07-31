import React, { Component } from "react";
import emailjs from "emailjs-com";
import Aux from "../../hoc/Auxilliary/Auxilliary";
import axios from "../../hoc/Axios/Axios";
import Spinner from "../UI/Spinner/Spinner2";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Footer from "../Footer/Footer";
import classes from "./ContactUs.module.css";
import ContactingForm from "./contactForm";
import Member from "./membersContact";

class contact extends Component {
  render() {
    const style = {
      backgroundColor: "rgba(0,0,0,0.7)",
      height: "400px",
    };

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
              <div>{<ContactingForm />}</div>
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
          <div className={classes.MemberBox}>

          <h3>Meat with the Founder</h3>
          <div className={classes.MembersGroup}>
            <Member
              image="https://pbs.twimg.com/profile_images/1234377576371687425/BYAleSXi_400x400.jpg"
              name="Yves Thierry Usengumuremyi"
              position="Managing Director | Ino Discovery | Marketing Department"
              phone="+250 788 926 536"
              website="www.inodiscovery.com"
              email="yvesthierryusengumuremyi@gmail.com"
              address="Rwanda-Kigali"
            />
          </div>
          </div>
        </div>
        <Footer />
      </Aux>
    );
  }
}
export default contact;
