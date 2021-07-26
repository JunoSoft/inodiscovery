/** @format */

import classes from "./Categories.module.css";
import React from "react";
import Category from "../Categories/Category/Category";
import Aux from "../../../../hoc/Auxilliary/Auxilliary";
import { Link } from "react-router-dom";
import { Component } from "react";
import axios from "../../../../hoc/Axios/Axios";
import Empty from "../../../UI/Empty/Empty";
import Spinner from "../../../../components/UI/Spinner/Spinner2";
class Categories extends Component {
  state = {
    categories: [],
    error: false,
    isLoading: true,
  };
  componentDidMount() {
    axios
      .get("/car-posts")
      .then((response) => {
        let result = [];
        for (let i in response.data) {
          result.push(response.data[i].carName);
        }
        this.setState({ categories: result, isLoading: false });
      })
      .catch((error) => {
        this.setState({ error: error });
      });
  }

  render() {
    const category = [...new Set(this.state.categories)];
    let categories = null;
    if (this.state.isLoading) {
      categories = <Spinner />;
    } else {
      categories = category.map((category) => {
        return (
          <Link to={"/car/" + category} key={category}>
            <Category name={category} />
          </Link>
        );
      });
    }

    return (
      <Aux>
        <p
        // style={{ fontWeight: "bold", padding: "0.5rem" }}
        >
          Categorie
        </p>
        <div className={classes.Categories}>
          {categories && categories}
          {categories.length === 0 && <Empty />}
        </div>
      </Aux>
    );
  }
}

export default Categories;
