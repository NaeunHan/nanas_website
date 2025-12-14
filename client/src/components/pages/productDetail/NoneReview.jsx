import React from "react";
import Card from "../../UI/Card";

import classes from "./NoneReview.module.css";

const NoneReview = ({ title }) => {
  return (
    <Card className={classes.noneReview}>
      <p className={classes["noneReview-content"]}>
        등록된 {title}가 없습니다.
      </p>
    </Card>
  );
};

export default NoneReview;
