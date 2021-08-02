/** @format */

import React, { useEffect, useState, useCallback } from "react";
import classes from "./Footer.module.css";
import axios from "../../hoc/Axios/Axios";

const Footer = (props) => {
  const [links, setLinks] = useState([]);
  const footerInformation = useCallback(async () => {
    const response = await axios.get("/x-social-medias");
    const data = (await response).data;
    setLinks(data);
  }, []);

  useEffect(() => {
    footerInformation();
  }, [footerInformation]);

  const UrlDatas = links.map((link, index) => (
    <li key={index}>
      <a href={`${link.link}`}>
        <i className={`fa fa-${link.mediaName}`}></i>{" "}
        <span style={{ color: "white", fontSize: "14px" }}>
          {link.mediaName}
        </span>
      </a>
    </li>
  ));

  return (
    <section className={classes.FooterWrap}>
      <div>
        <b>
          <font color="#eca400">ABOUT INO</font>{" "}
          <font color="#fff">Discovery</font>
        </b>
        <div>
          <br />
          As an innovative marketing service company, INO Discovery can provide
          you with marketing services and solutions tailored to your unique
          requirements. By combining multiple disciplines into one agency we
          deliver effective Digital Advertisement, Event Marketing, Real Estate
          Marketing, Market Research, Blogging, and Social Media Marketing.
          Ultimately saving your time in management and providing a greater
          return on your marketing budget. <br />
          INO Discovery is a handful of companies in the East African region
          with a platform with unique communication with local and international
          companies.
          <a href="/about">
            <font color="#eca400">...read more</font>
          </a>
          <a href="/contact">
            <div className={classes.AdvertBtn}>Advertise with us</div>
          </a>
        </div>
      </div>
      <div>
        <h3>
          <font color="#eca400">Address</font>{" "}
        </h3>
        <div className={classes.SocialMedias}>
          <ul>{UrlDatas}</ul>
        </div>
        <b>KIGALI-RWANDA</b>
        <ul style={{ marginLeft: "-18px" }}>
          <li>Email: info@inodiscovery.com</li>
          <li>Phone: +250 788 926 536</li>
        </ul>
        Kigali,Kicukiro
        <br /><br/>
        <div>
          Website Designed and Built by{" "}
          <font color="#eca400">Junosoft LTD</font>
        </div>
        <div>
          <br />
          &copy; Copyright By <span>INO</span> Discovery
        </div>
      </div>
    </section>
  );
};

export default Footer;
