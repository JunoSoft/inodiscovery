import React from "react";
import classes from "./Home.module.css";

const Home = () => (
  <section className={classes.Home}>
    <div className={classes.Bg}></div>
    <div className={classes.Contents}>
      <p className={classes.Main_Title}>
        ONLINE CAR BROKER AND SALES MANAGEMENT SYSTEM HELPS YOU TO SELL AND BUY
        YOUR CARS IN EASY WAY
      </p>
      <p className={classes.SUbtitle}>
        Lets give you what you need in efficient way
      </p>
      <button>View Products</button>
    </div>
  </section>
);

export default Home;
