import React from "react";
import classes from "./OwnerPage.module.css";
import Aux from "../../hoc/Auxilliary/Auxilliary";
import profile from "../../assets/Images/cars/digita marketing baner.jpg";
import Footer from "../Footer/Footer";
import Header from "../SectionHeader/SectionHeader";
const owner = (props) => {
  return (
    <Aux>
      <div className={classes.OwnerPage}>
        <div className={classes.CompanyHeader}>
          <h2> Ino Discovery digital Market Kigali rwanda</h2>

          <div className={classes.ProfilePic}>
            <img src={profile} />
          </div>
        </div>
      </div>
      <div className={classes.PageContent}>
        <Header
          title="PRODUCTS"
          subtitle="we are the best in all the others having this service"
        />
      </div>
      <Footer />
    </Aux>
  );
};
export default owner;
