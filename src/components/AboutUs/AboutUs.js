import React from "react";
import classes from "./Aboutus.module.css";
import Aux from "../../hoc/Auxilliary/Auxilliary";
import Footer from "../Footer/Footer";
const about = (props) => {
  const style = {
    backgroundColor: "rgba(0,0,0,0.7)",
    height: "300px",
  };
  return (
    <Aux>
      <div className={classes.AboutUs}>
        <div style={style}></div>
        <div className={classes.TopAbout}>
          <h1>ABOUT Ino Discovery </h1>
          <p>
            Want to get in touch? we'd love to hear from you,here's how you can
            reach us
          </p>
          <img
            alt="About us"
            src="https://www.hill-abbott.co.uk/wp-content/uploads/2019/02/Grey-contact-background.png"
          />
        </div>
        <div className={classes.VisionList}>
          <div className={classes.AboutUsHolder}>
            <div>
              As an innovative marketing service company, INO Discovery can
              provide you with marketing services and solutions tailored to your
              unique requirements. <br />
              By combining multiple disciplines into one agency we deliver
              effective Digital Advertisement, Event Marketing, Real Estate
              Marketing, Market Research, Blogging, and Social Media Marketing.
              <br /> Ultimately saving your time in management and providing a
              greater return on your marketing budget. INO Discovery is a
              handful of companies in the East African region with a platform
              with unique communication with local and international companies.
              <br /> With Great partnerships, we work with Individuals, Business
              organizations to reach their strategic Goals and Expectations By
              Applying Difference Marketing Strategies. Our customers order for
              service and go directly service provider.
              <br /> The connection makes it easy for customers to reduce the
              costs of going to a field. If you want to work with a trusted
              partner who is dedicated to your business success, and with the
              resources to deliver, then Ino Discovery is that partner.
            </div>
          </div>
          <div className={classes.MessagingContact}>
            <h1></h1>
          </div>
        </div>
      </div>
      <Footer />
    </Aux>
  );
};
export default about;
