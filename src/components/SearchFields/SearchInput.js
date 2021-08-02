import React, { useState } from "react";
import classes from "./Search.module.css";

export default function SearchInput(props) {
  const [searchValue, setSearchValue] = useState("");

  const onChangeHandler = (event) => {
    setSearchValue(event.target.value);
  };
  console.log(searchValue);
  return (
    <div className={classes.SearchInput}>
      <input type="text" placeholder="Search..." onChange={onChangeHandler} />
    </div>
  );
}
