import React from "react";

import { BsFillQuestionCircleFill } from "react-icons/bs";

import classes from "./Review.module.css";

const Review = ({ data }) => {
  return (
    <div className={classes["review"]}>
      <p className={classes["review-writeInfo"]}>
        {`${data.uId} | ${data.bWriteDate}`}
      </p>
      <p className={classes["review-title"]}>
        <BsFillQuestionCircleFill className={classes["review-title__icon"]} />
        <span>{data.bTitle}</span>
      </p>
      <p className={classes["review-content"]}>{data.bContent}</p>
    </div>
  );
};

export default Review;
