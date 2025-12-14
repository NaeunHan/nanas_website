import React from "react";
import loading from "../../../assets/icons/loading.gif";
import classes from "./Loading.module.css";
const Loading = () => {
  return (
    <div className={classes["loading-wrap"]}>
      <img src={loading} alt="loading" />
      <h1>Loading...</h1>
    </div>
  );
};

export default Loading;
