import React from "react";
import image404 from "../../../assets/icons/siba.png";
import classes from "./Error404.module.css";
const Error404 = () => {
  return (
    <div className={classes["error404-wrap"]}>
      <div className={classes["error404"]}></div>
      <h1>존재하지 않는 페이지입니다..</h1>
    </div>
  );
};

export default Error404;
