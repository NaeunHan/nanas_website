import React from "react";

import logo from "../../../assets/icons/siba.png";
import classes from "./MyPageNullMsg.module.css";

const MyPageNullMsg = ({ className, text }) => {
  return (
    <React.Fragment>
      <div className={`${classes.myPageNullMsg} ${className}`}>
        <img src={logo} alt="logo" />
        <h2 className={classes.title}>{text}</h2>
      </div>
    </React.Fragment>
  );
};

export default MyPageNullMsg;
